package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.Logger;
import play.libs.EventSource;
import play.libs.Json;
import play.mvc.*;

import java.util.*;

/**
 * Created by Ariel on 27/12/2015.
 */
public class fileController extends Controller {
    private static ArrayList<file> files = new ArrayList()
    {{

        }};

    public static Result delFileR(String id){
        delFile(id);
        return ok("deleted");
    }
    public static void delFile(String id){
        for (int i = 0; i < files.size();i++) {
            if (files.get(i).getId().equals(id)) {
                files.remove(i);
                break;
            }
        }
    }
    public static play.mvc.Result upload() {
        play.mvc.Http.MultipartFormData body = request().body().asMultipartFormData();
        play.mvc.Http.MultipartFormData.FilePart picture = body.getFile("file");
        String[] fileName = body.asFormUrlEncoded().get("fileName");
        String[] fileExplain = body.asFormUrlEncoded().get("fileExplain");
        int count = files.size() + 1 ;
        String id = String.valueOf(count);
        if (picture != null) {
            String fileName2 = picture.getFilename();
            String contentType = picture.getContentType();
            java.io.File file = picture.getFile();
            files.add(new file(id,file,fileName[0],fileExplain[0]));
            sendEventCard(Json.toJson(new file(id,file,fileName[0],fileExplain[0])));
            return ok("File uploaded");
        } else {
            flash("error", "Missing file");
            return badRequest();
        }
    }


    public static Result getFiles()
    {
        return ok(Json.toJson(files));
    }
    /** Keeps track of all connected browsers per room **/
    private static Map<String, List<EventSource>> socketsPerRoom = new HashMap<String, List<EventSource>>();

    /**
     * Controller action serving AngularJS chat page
     */
    public static Result index() {
        return ok("Chat using Server Sent Events and AngularJS");
    }
    /**
     * Send event to all channels (browsers) which are connected to the room
     */
    public static void sendEventCard(JsonNode msg) {
        String room  = "3";
        if(socketsPerRoom.containsKey(room)) {
            socketsPerRoom.get(room).stream().forEach(es -> es.send(EventSource.Event.event(msg)));
        }
    }


    /**
     * Establish the SSE HTTP 1.1 connection.
     * The new EventSource socket is stored in the socketsPerRoom Map
     * to keep track of which browser is in which room.
     *
     * onDisconnected removes the browser from the socketsPerRoom Map if the
     * browser window has been exited.
     * @return
     */
    public static Result getRoom(String room) {
        String remoteAddress = request().remoteAddress();
        Logger.info(remoteAddress + " - SSE conntected");

        return ok(new EventSource() {
            @Override
            public void onConnected() {
                EventSource currentSocket = this;

                this.onDisconnected(() -> {
                    Logger.info(remoteAddress + " - SSE disconntected");
                    socketsPerRoom.compute(room, (key, value) -> {
                        if(value.contains(currentSocket))
                            value.remove(currentSocket);
                        return value;
                    });
                });

                // Add socket to room
                socketsPerRoom.compute(room, (key, value) -> {
                    if(value == null)
                        return new ArrayList<EventSource>() {{ add(currentSocket); }};
                    else
                        value.add(currentSocket); return value;
                });
            }
        });
    }
}
