package controllers;

import play.mvc.Controller;

/**
 * Created by Ariel on 27/12/2015.
 */
public class file extends Controller {
    private String id;
    private java.io.File data;
    private String fileName;
    private String fileExplain;

    public file(String id,java.io.File data,String fileName,String fileExplain){
        this.id = id;
        this.data = data;
        this.fileName = fileName;
        this.fileExplain = fileExplain;
    }
    public String getId(){
        return this.id;
    }
    public java.io.File getData(){
        return this.data;
    }
    public void setData(java.io.File  data){
        this.data = data;
    }
    public String getFileName(){
        return this.fileName;
    }
    public void setFileName(String fileName){
        this.fileName = fileName;
    }
    public String getFileExplain(){
        return this.fileExplain;
    }
    public void setFileExplain(String fileExplain){
        this.fileExplain = fileExplain;
    }
}
