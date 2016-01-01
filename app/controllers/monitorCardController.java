package controllers;


import com.fasterxml.jackson.databind.JsonNode;
import play.libs.EventSource;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Ariel on 25/12/2015.
 */
public class monitorCardController extends Controller {
    private static ArrayList<monitorCard> cards = new ArrayList()
    {{
            add(new monitorCard("1","04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" ,"sds", "service/process", "",  "",  "פתח",  1,  0));
            add(new monitorCard("2","04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process", "",  "",  "פתח",  3,  0));
            add(new monitorCard("3","04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process", "",  "",  "פתח",  3,  0));
            add(new monitorCard("4","04-12-2015", "/public/images/oracle.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "dsdsds","service/process", "",  "",  "פתח",  2,  0));

        }};
    public ArrayList<monitorCard> getMonitorCards(){
        return cards;
    }

    public static void delMonitorCard(String id){
        for (int i = 0; i < cards.size();i++) {
            if (cards.get(i).getId().equals(id)) {
                cards.remove(i);
                break;
            }
        }
    }

    public static void addMonitorCard(String id,String dateHeader,String img,String monitorName,String monitorLevel,String monitorProdact,String monitorSystem,String monitorExplain,String monitorType,String classText,String classBtn,String text,int status,int views){
        cards.add(new monitorCard(id,dateHeader,img,monitorName,monitorLevel,monitorProdact,monitorSystem,monitorExplain,monitorType,classText,classBtn,text,status,views));
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
    public static Result incCsrdView(String id){
        incMonitorCardView(id);
        return ok("view inc");
    }
    public static Result incCardStatus(String id){
        incMonitorCardStatus(id);
        return ok("status inc");
    }
    public static  Result editCard(){
        JsonNode requestBody = request().body().asJson();
        String id = requestBody.get("id").asText();
        String monitorName = requestBody.get("monitorName").asText();
        String monitorLevel = requestBody.get("monitorLevel").asText();
        String monitorProdact = requestBody.get("monitorProdact").asText();
        String monitorSystem = requestBody.get("monitorSystem").asText();
        String monitorExplain = requestBody.get("monitorExplain").asText();
        String monitorType = requestBody.get("monitorType").asText();
        editMonitorCard(id, monitorName, monitorLevel, monitorProdact, monitorSystem, monitorExplain, monitorType);
        return ok("edited");
    }
    public static Result addCard(){
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
        addMonitorCard(id,dateHeader,img,monitorName,monitorLevel,monitorProdact,monitorSystem,monitorExplain,monitorType,classText,classBtn,text,status,views);
        SSE.sendSSEMassge();
        return ok("added");
    }
    public static Result delCard(String id){
        delMonitorCard(id);
        return ok("deleted");
    }
    public static Result getCards()
    {
        return ok(Json.toJson(cards));
    }

}

