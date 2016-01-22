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
            add(new monitorCard("1","04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" ,"sds", "service/process",  1,  0));
            add(new monitorCard("2","04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process",  3,  0));
            add(new monitorCard("3","04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process",  3,  0));
            add(new monitorCard("4","04-12-2015", "/public/images/oracle.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process",  2,  0));
            add(new monitorCard("5","04-12-2015", "/public/images/oracle.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process",  2,  0));
            add(new monitorCard("6","04-12-2015", "/public/images/oracle.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process",  2,  0));
            add(new monitorCard("7","04-12-2015", "/public/images/oracle.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process", 2,  0));

        }};
    private static ArrayList<String> products = new ArrayList<String>()
    {{
            add("netApp");
            add("windows");
        }};
    private static ArrayList<String> systems = new ArrayList<String>()
    {{
            add("מערכת1");
            add("מערכת2");
        }};
    private static ArrayList<String> types = new ArrayList<String>(){{
        add("winlog");
        add("service");
    }};

    public static Result getTypes(){
        return ok(Json.toJson(types));
    }
    public static Result addTypes(){
        JsonNode requestBody = request().body().asJson();
        String type = requestBody.get("type").asText();
        types.add(type);
        SSE.sendEventCard(requestBody, "1");
        return ok("type has been added");
    }
    public static Result getSystems(){
        return ok(Json.toJson(systems));
    }
    public static Result addSystems(){
        JsonNode requestBody = request().body().asJson();
        String system = requestBody.get("system").asText();
        systems.add(system);
        SSE.sendEventCard(requestBody, "1");
        return ok("system has been added");
    }
    public static Result getProducts(){
        return ok(Json.toJson(products));
    }
    public static Result addProducts(){
        JsonNode requestBody = request().body().asJson();
        String product = requestBody.get("product").asText();
        products.add(product);
        SSE.sendEventCard(requestBody,"1");
        return ok("product has been added");
    }

    public static Result incCsrdView(){
        JsonNode requestBody = request().body().asJson();
        String id = requestBody.get("id").asText();
        incMonitorCardView(id);
        return ok("view inc");
    }
    public static Result incCardStatus(){
        JsonNode requestBody = request().body().asJson();
        String id = requestBody.get("id").asText();
        incMonitorCardStatus(id);
        return ok("status inc");
    }
    public static Result delCard(String id){
        delMonitorCard(id);
        return ok(Json.toJson(cards));
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
        SSE.sendEventCard(requestBody,"1");
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
        int status = requestBody.get("status").asInt();
        int views = requestBody.get("views").asInt();
        cards.add(new monitorCard(id,dateHeader,img,monitorName,monitorLevel,monitorProdact,monitorSystem,monitorExplain,monitorType,status,views));
        SSE.sendEventCard(requestBody,"1");
        return ok("added");
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