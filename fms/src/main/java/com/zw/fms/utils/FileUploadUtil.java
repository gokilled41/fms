package com.zw.fms.utils;

import java.io.File;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class FileUploadUtil {

    public static FileInfo saveFile(String applyId, CommonsMultipartFile uploadFile) throws Exception {
        String filePath = getFileFolder();
        String uploadFileName = uploadFile.getOriginalFilename();
        int extPos = uploadFileName.lastIndexOf(".");
        String extension = uploadFileName.substring(extPos + 1).toLowerCase();

        String fileName = null;
        // fileName = MD5Utils.getMD5(UUID.randomUUID().toString()) + "." + extension;
        fileName = uploadFileName;
        String url = "/files/" + applyId + "/" + fileName;
        String savedFileFolder = filePath + applyId;
        Util.mkdirs(savedFileFolder);
        String savedFileName = savedFileFolder + "/" + fileName;
        File savedFile = new File(savedFileName);
        uploadFile.getFileItem().write(savedFile);
        FileInfo info = new FileInfo();
        info.url = url;
        info.type = Util.getFileType(extension);
        info.size = savedFile.length();
        info.timestamp = savedFile.lastModified();
        return info;
    }

    public static class FileInfo {
        public String url;
        public String type;
        public long size;
        public long timestamp;
    }

    public static void deleteFile(String url) {
        String n = url.substring("/files/".length());
        String filePath = getFileFolder();
        String file = filePath + n;
        String dir = Util.getParent(file);
        Util.deleteFile(file);
        Util.deleteFolderIfEmpty(dir);
    }

    private static String getFileFolder() {
        return ConfigUtil.getZWHome() + java.io.File.separator + "files" + java.io.File.separator;
    }
}
