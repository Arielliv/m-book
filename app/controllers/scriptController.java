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
public class scriptController extends Controller {
    private static ArrayList<script> scripts = new ArrayList()
    {{
            add(new script("1","sadsadasdasdas", "scscscscscscsc", "sss"));
            add(new script("2","sadsadasdasdas", "scscscscscscsc", "sss"));
            add(new script("3","sadsadasdasdas", "scscscscscscsc", "sss"));
    }};

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
    public static Result addScript() {
        JsonNode requestBody = request().body().asJson();
        String id = requestBody.get("id").asText();
        String data = requestBody.get("data").asText();
        String scriptName = requestBody.get("scriptName").asText();
        String scriptExplain = requestBody.get("scriptExplain").asText();
        scripts.add(new script(id,data,scriptName,scriptExplain));
        sendEventCard(requestBody);
        return ok("added");
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
