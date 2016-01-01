package controllers;


import play.Logger;
import play.libs.EventSource;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.ArrayList;


/**
 * Created by Ariel on 01/01/2016.
 */
public class SSE extends Controller {
    private static ArrayList<EventSource> sockets  = new ArrayList<>();
    public static Result cardFeed(){
        String remoteAdders = request().remoteAddress();
        return ok(new EventSource(){
            public void onConnected(){
                sockets.add(this);
                this.onDisconnected(()->{
                    Logger.info(remoteAdders + "sse disconected");
                    sockets.remove(this);
                });
            }
        });
    }

    public static void sendSSEMassge(){
        sendMessage("SSE","cardBack");
    }

    public static void sendMessage(String data, String type){
        sockets.stream().forEach(es -> es.send(new EventSource.Event(data,null,type)));
    }

}
