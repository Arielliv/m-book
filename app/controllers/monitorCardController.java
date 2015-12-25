package controllers;


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
            add(new monitorCard(1,"04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "service/process", "",  "",  "פתח",  3,  0));
            add(new monitorCard(2,"04-12-2015", "/public/images/windows.jpg",  "scscscscscscscs",  "מתקדם","windows" ,"מערכת4" , "service/process", "",  "",  "פתח",  3,  0));
    }};
    public ArrayList<monitorCard> getMonitorCards(){
        return cards;
    }
    public static Result getCards()
    {
        return ok(Json.toJson(cards));
    }

}

