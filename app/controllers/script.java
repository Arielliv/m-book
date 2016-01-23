package controllers;

import play.mvc.Controller;

/**
 * Created by Ariel on 27/12/2015.
 */
public class script extends Controller {
    private String id;
    private String content;
    private String scriptName;
    private String scriptExplain;

    public script(String id,String content,String scriptName,String scriptExplain){
        this.id = id;
        this.content = content;
        this.scriptName = scriptName;
        this.scriptExplain = scriptExplain;
    }
    public String getId(){
        return this.id;
    }
    public String getContent(){
        return this.content;
    }
    public void setContent(String content){
        this.content = content;
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
