package controllers;

/**
 * Created by Ariel on 25/12/2015.
 */
import play.*;
import play.mvc.*;

import views.html.*;

import javax.xml.transform.Result;
import java.lang.String;
import java.security.SecureRandom;
public class monitorCard extends Controller{
    private int id ;
    private String dateHeader;
    private String img;
    private String monitorName;
    private String monitorLevel;
    private String monitorProdact;
    private String monitorSystem;
    private String monitorType;
    private String classText;
    private String classBtn;
    private String text;
    private int status;
    private int views;
    public monitorCard (int id,String dateHeader,String img,String monitorName,String monitorLevel,String monitorProdact,String monitorSystem,String monitorType,String classText,String classBtn,String text,int status,int views){
        this.id = id;
        this.dateHeader = dateHeader;
        this.img = img;
        this.monitorName = monitorName;
        this.monitorLevel = monitorLevel;
        this.monitorProdact = monitorProdact;
        this.monitorSystem = monitorSystem;
        this.monitorType = monitorType;
        this.classText = classText;
        this.classBtn = classBtn;
        this.text = text;
        this.status = status;
        this.views = views;
    }

    public int getId(){
        return this.id;
    }

    public String getDateHeader(){
        return this.dateHeader;
    }

    public String getImg(){
        return this.img;
    }

    public String getMonitorName(){
        return this.monitorName;
    }

    public String getMonitorLevel(){
        return this.monitorLevel;
    }

    public String getMonitorProdact(){
        return this.monitorProdact;
    }

    public String getMonitorSystem(){
        return this.monitorSystem;
    }

    public String getMonitorType(){
        return this.monitorType;
    }

    public String getClassText(){
        return this.classText;
    }

    public String getClassBtn(){
        return this.classBtn;
    }

    public String getText(){
        return this.text;
    }

    public int getStatus(){
        return this.status;
    }

    public int getViews(){
        return this.views;
    }
}
