package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.Logger;
import play.api.mvc.MultipartFormData;
import play.libs.EventSource;
import play.libs.Json;
import play.mvc.*;

import javax.servlet.annotation.MultipartConfig;
import java.io.File;
import java.util.*;

/**
 * Created by Ariel on 27/12/2015.
 */
public class scriptController extends Controller {
    private static ArrayList<script> scripts = new ArrayList();
    public static Result delScriptR(String id){
        delscript(id);
        return ok("deleted");
    }
    public static void delscript(String id){
        for (int i = 0; i < scripts.size();i++) {
            if (scripts.get(i).getId().equals(id)) {
                scripts.remove(i);
                break;
            }
        }
    }

    public static play.mvc.Result upload() {
        play.mvc.Http.MultipartFormData body = request().body().asMultipartFormData();
        play.mvc.Http.MultipartFormData.FilePart picture = body.getFile("file");
        String[] scriptName = body.asFormUrlEncoded().get("scriptName");
        String[] scriptExplain = body.asFormUrlEncoded().get("scriptExplain");
        int count = scripts.size() + 1 ;
        String id = String.valueOf(count);
        if (picture != null) {
            String fileName = picture.getFilename();
            String contentType = picture.getContentType();
            java.io.File file = picture.getFile();
            scripts.add(new script(id,file,scriptName[0],scriptExplain[0]));
            sendEventCard(Json.toJson(new script(id,file,scriptName[0],scriptExplain[0])));
            return ok("File uploaded");
        } else {
            flash("error", "Missing file");
            return badRequest();
        }
    }

    public static Result download() {
        return ok(new java.io.File("/tmp/fileToServe.pdf"));
    }

    public static Result getScripts()
    {
        return ok(Json.toJson(scripts));
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
        String room  = "2";
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
