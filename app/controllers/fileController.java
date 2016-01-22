package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.Logger;
import play.libs.EventSource;
import play.libs.Json;
import play.mvc.*;

import java.io.File;
import java.util.*;

/**
 * Created by Ariel on 27/12/2015.
 */
public class fileController extends Controller {
    private static ArrayList<file> files = new ArrayList()
    {{

        }};

    public static Result delFileR(String id){
        delFile(id);
        return ok("deleted");
    }
    public static void delFile(String id){
        for (int i = 0; i < files.size();i++) {
            if (files.get(i).getId().equals(id)) {
                files.remove(i);
                break;
            }
        }
    }
    public static play.mvc.Result upload() {
        String content = ".txt";
        play.mvc.Http.MultipartFormData body = request().body().asMultipartFormData();
        play.mvc.Http.MultipartFormData.FilePart fileU = body.getFile("file");
        String[] fileName = body.asFormUrlEncoded().get("fileName");
        String[] fileExplain = body.asFormUrlEncoded().get("fileExplain");
        int count = files.size() + 1 ;
        String id = String.valueOf(count);
        if (fileU != null) {
            String contentType = fileU.getContentType();
            java.io.File file = fileU.getFile();
            String path = "\\c:\\temp";
            String text = "text/plain";
            String word = "application/octet-stream";
            String xl = "application/vnd.ms-excel";
            if (contentType.equals(text)) {
                String imagem = id + "file.txt";
                file.renameTo(new File(path, imagem));
            }
            if (contentType.equals(word)) {
                String imagem = id + "file.docx";
                file.renameTo(new File(path, imagem));
                content = ".docx";
            }
            if (contentType.equals(xl)) {
                String imagem = id + "file.xls";
                file.renameTo(new File(path, imagem));
                content = ".xls";
            }
            files.add(new file(id,content,fileName[0],fileExplain[0]));
            SSE.sendEventCard(Json.toJson(new file(id,content,fileName[0],fileExplain[0])),"3");
            return ok("File uploaded");
        } else {
            flash("error", "Missing file");
            return badRequest();
        }
    }

    public static Result download(String id) {
        String content = null;
        for (controllers.file file : files) {
            if (file.getId().equals(id)){
                content = file.getContent();
            }
        }
        return ok(new java.io.File("/temp/" + id+ "file" + content)).as("application/force-download");
    }

    public static Result getFiles()
    {
        return ok(Json.toJson(files));
    }
}
