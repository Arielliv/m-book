package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.Logger;
import play.Play;
import play.api.mvc.MultipartFormData;
import play.libs.EventSource;
import play.libs.Json;
import play.mvc.*;

import javax.servlet.annotation.MultipartConfig;
import java.io.*;
import java.util.*;

/**
 * Created by Ariel on 27/12/2015.
 */
public class scriptController extends Controller {
    private static ArrayList<script> scripts = new ArrayList();
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

    public static play.mvc.Result upload() throws IOException {
        String content = ".txt";
        play.mvc.Http.MultipartFormData body = request().body().asMultipartFormData();
        play.mvc.Http.MultipartFormData.FilePart fileU = body.getFile("file");
        String[] scriptName = body.asFormUrlEncoded().get("scriptName");
        String[] scriptExplain = body.asFormUrlEncoded().get("scriptExplain");
        int count = scripts.size() + 1 ;
        String id = String.valueOf(count);
        if (fileU != null) {
            String fileName = fileU.getFilename();
            String contentType = fileU.getContentType();
            java.io.File file = fileU.getFile();
            String path = "\\c:\\temp";
            String text = "text/plain";
            String word = "application/octet-stream";
            String xl = "application/vnd.ms-excel";
            if (contentType.equals(text)) {
                String imagem = id + "script.txt";
                //content = ".txt";
                file.renameTo(new File(path, imagem));
            }
            if (contentType.equals(word)) {
                String imagem = id + "script.docx";
                content = ".docx";
                file.renameTo(new File(path, imagem));
            }
            if (contentType.equals(xl)) {
                String imagem = id + "script.xls";
                content = ".xls";
                file.renameTo(new File(path, imagem));
            }
            scripts.add(new script(id,content,scriptName[0],scriptExplain[0]));
            SSE.sendEventCard(Json.toJson(new script(id,content,scriptName[0],scriptExplain[0])),"2");
            return ok("File uploaded");
        } else {
            flash("error", "Missing file");
            return badRequest();
        }
    }

    public static Result download(String id) {
        String content = null;
        for (controllers.script script : scripts) {
            if (script.getId().equals(id)){
                content = script.getContent();
            }
        }
        return ok(new java.io.File("/temp/" + id + "script" + content)).as("application/force-download");
    }

    public static Result getScripts()
    {
        return ok(Json.toJson(scripts));
    }

}
