package controllers;

import play.mvc.Controller;

/**
 * Created by Ariel on 27/12/2015.
 */
public class script extends Controller {
    private String id;
    private String data;
    private String scriptName;
    private String scriptExplain;

    public script(String id,String data,String scriptName,String scriptExplain){
        this.id = id;
        this.data = data;
        this.scriptName = scriptName;
        this.scriptExplain = scriptExplain;
    }
    public String getId(){
        return this.id;
    }
    public String getData(){
        return this.data;
    }
    public void setData(String data){
        this.data = data;
    }
    public String getScriptName(){
        return this.scriptName;
    }
    public void setScriptName(String scriptName){
        this.scriptName = scriptName;
    }
    public String getScriptExplain(){
        return this.scriptExplain;
    }
    public void setScriptExplain(String scriptExplain){
        this.scriptExplain = scriptExplain;
    }
}
