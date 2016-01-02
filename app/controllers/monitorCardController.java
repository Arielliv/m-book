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

public class monitorCardController extends Controller {
    private static ArrayList<monitorCard> cards = new ArrayList()
    {{
            add(new monitorCard("1","04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" ,"sds", "service/process", "",  "",  "פתח",  1,  0));
            add(new monitorCard("2","04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process", "",  "",  "פתח",  3,  0));
            add(new monitorCard("3","04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process", "",  "",  "פתח",  3,  0));
            add(new monitorCard("4","04-12-2015", "/public/images/oracle.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process", "",  "",  "פתח",  2,  0));

        }};


    /** Keeps track of all connected browsers per room **/
    private static Map<String, List<EventSource>> socketsPerRoom = new HashMap<String, List<EventSource>>();

    /**
     * Controller action serving AngularJS chat page
     */
    public static Result index() {
        return ok("Chat using Server Sent Events and AngularJS");
    }

    /**
     * Controller action for POSTing chat messages
     */
    public static Result incCsrdView(){
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode dataTable = mapper.createObjectNode();
        ArrayNode aa = dataTable.putArray("aaData");
        JsonNode requestBody = request().body().asJson();
        String id = requestBody.get("id").asText();
        incMonitorCardView(id);
        sendEventCard(aa);
        return ok("view inc");
    }
    public static Result incCardStatus(){
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode dataTable = mapper.createObjectNode();
        ArrayNode aa = dataTable.putArray("aaData");
        JsonNode requestBody = request().body().asJson();
        String id = requestBody.get("id").asText();
        incMonitorCardStatus(id);
        sendEventCard(aa);
        return ok("status inc");
    }
    public static Result delCard(String id){
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode dataTable = mapper.createObjectNode();
        ArrayNode aa = dataTable.putArray("aaData");
        delMonitorCard(id);
        sendEventCard(aa);
        return ok("deleted");
    }
    public static Result editCard() {
        JsonNode requestBody = request().body().asJson();
        String id = requestBody.get("id").asText();
        String monitorName = requestBody.get("monitorName").asText();
        String monitorLevel = requestBody.get("monitorLevel").asText();
        String monitorProdact = requestBody.get("monitorProdact").asText();
        String monitorSystem = requestBody.get("monitorSystem").asText();
        String monitorExplain = requestBody.get("monitorExplain").asText();
        String monitorType = requestBody.get("monitorType").asText();
        editMonitorCard(id, monitorName, monitorLevel, monitorProdact, monitorSystem, monitorExplain, monitorType);
        sendEventCard(requestBody);
        return ok("edited");
    }
    public static Result addMonitorCard() {
        JsonNode requestBody = request().body().asJson();
        String id = requestBody.get("id").asText();
        String dateHeader = requestBody.get("dateHeader").asText();
        String img = requestBody.get("img").asText();
        String monitorName = requestBody.get("monitorName").asText();
        String monitorLevel = requestBody.get("monitorLevel").asText();
        String monitorProdact = requestBody.get("monitorProdact").asText();
        String monitorSystem = requestBody.get("monitorSystem").asText();
        String monitorExplain = requestBody.get("monitorExplain").asText();
        String monitorType = requestBody.get("monitorType").asText();
        String classText = requestBody.get("classText").asText();
        String classBtn = requestBody.get("classBtn").asText();
        String text = requestBody.get("text").asText();
        int status = requestBody.get("status").asInt();
        int views = requestBody.get("views").asInt();
        cards.add(new monitorCard(id,dateHeader,img,monitorName,monitorLevel,monitorProdact,monitorSystem,monitorExplain,monitorType,classText,classBtn,text,status,views));
        sendEventCard(requestBody);
        return ok("added");
    }

    /**
     * Send event to all channels (browsers) which are connected to the room
     */
    public static void sendEventCard(JsonNode msg) {
        String room  = "1";
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

    public static Result getCards()
    {
        return ok(Json.toJson(cards));
    }
    public static void editMonitorCard(String id,String monitorName,String monitorLevel,String monitorProdact,String monitorSystem,String monitorExplain,String monitorType){
        for (int i = 0; i < cards.size();i++) {
            if (cards.get(i).getId().equals(id)) {
                if(!cards.get(1).getMonitorName().equals(monitorName)){
                    cards.get(i).setMonitorName(monitorName);
                }
                if(!cards.get(1).getMonitorLevel().equals(monitorLevel)){
                    cards.get(i).setMonitorLevel(monitorLevel);
                }
                if(!cards.get(1).getMonitorProdact().equals(monitorProdact)){
                    cards.get(i).setMonitorProdact(monitorProdact);
                }
                if(!cards.get(1).getMonitorSystem().equals(monitorSystem)){
                    cards.get(i).setMonitorSystem(monitorSystem);
                }
                if(!cards.get(1).getMonitorExplain().equals(monitorExplain)){
                    cards.get(i).setMonitorExplain(monitorExplain);
                }
                if(!cards.get(1).getMonitorType().equals(monitorType)){
                    cards.get(i).setMonitorType(monitorType);
                }
                break;
            }
        }
    }

    public static void delMonitorCard(String id){
        for (int i = 0; i < cards.size();i++) {
            if (cards.get(i).getId().equals(id)) {
                cards.remove(i);
                break;
            }
        }
    }

    public static void incMonitorCardStatus(String id){
        for (int i = 0; i < cards.size();i++) {
            if (cards.get(i).getId().equals(id)) {
                cards.get(i).incStatus();
                break;
            }
        }

    }
    public static void incMonitorCardView(String id){
        for (int i = 0; i < cards.size();i++) {
            if (cards.get(i).getId().equals(id)) {
                cards.get(i).incViews();
                break;
            }
        }
    }
}