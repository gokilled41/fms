package com.zw.fms.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;

import com.zw.fms.model.File;
import com.zw.fms.service.FileService;
import com.zw.fms.utils.ControllerUtil;
import com.zw.fms.utils.FileUploadUtil;
import com.zw.fms.utils.FileUploadUtil.FileInfo;
import com.zw.fms.utils.SessionUtil;
import com.zw.fms.utils.Util;

@Controller
@RequestMapping("/file")
public class FileController {

    protected static final Log logger_ = LogFactory.getLog(FileController.class);

    @Autowired
    private FileService fileService;

    @RequestMapping("listFiles")
    public void listFiles(HttpServletRequest request, HttpServletResponse response, String applyId, String category,
            String callback) {
        List<File> l = fileService.listFilesByApplyIdAndCategory(applyId, category);
        ControllerUtil.responseList(response, callback, l);
    }

    @RequestMapping("listReviewerFiles")
    public void listReviewerFiles(HttpServletRequest request, HttpServletResponse response, String applyId,
            String category, int uploaderId, String callback) {
        List<File> l = fileService.listFilesByApplyIdAndCategoryAndUploaderId(applyId, category, uploaderId);
        ControllerUtil.responseList(response, callback, l);
    }

    @RequestMapping(value = "uploadFile", method = RequestMethod.POST)
    public void uploadFile(HttpServletRequest request, HttpServletResponse response, String applyId, String name,
            String category, String callback) throws Exception {
        boolean success;
        String reason = "";
        File existingFile = fileService.getFileByApplyIdAndFileName(applyId, name);
        if (existingFile != null) {
            success = false;
            reason = "文件已存在";
        } else {
            MultiValueMap<String, MultipartFile> multiFileMap = null;
            if (request instanceof DefaultMultipartHttpServletRequest) {
                // has file uploaded
                DefaultMultipartHttpServletRequest mulRequest = (DefaultMultipartHttpServletRequest) request;
                multiFileMap = mulRequest.getMultiFileMap();
            }

            File file = new File();
            file.setApplyId(applyId);
            file.setFileName(name);
            file.setStatus("临时");
            file.setTimestamp(new Date());
            file.setCategory(category);
            file.setUploaderId(SessionUtil.getLoginUser(request).getId());

            // attachment file
            List<MultipartFile> attachmentFile = null;
            if (multiFileMap != null)
                attachmentFile = multiFileMap.get("file");
            if (attachmentFile != null) {
                FileInfo info = FileUploadUtil.saveFile(applyId, (CommonsMultipartFile) attachmentFile.get(0));
                file.setUrl(info.url);
                file.setType(info.type);
                file.setSize(Util.formatSizeString(info.size));
            }

            fileService.addFile(file);
            success = true;
        }
        ControllerUtil.responseJson(response, callback, "success", success, "reason", reason);
    }

    @RequestMapping(value = "deleteFiles", method = RequestMethod.POST)
    public void deleteFiles(HttpServletRequest request, HttpServletResponse response, String applyId, String category,
            String status, String callback) throws Exception {
        int r = fileService.deleteFilesByApplyIdAndStatus(applyId, status);
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping(value = "deleteFile", method = RequestMethod.POST)
    public void deleteFile(HttpServletRequest request, HttpServletResponse response, String applyId, String fileName,
            String callback) throws Exception {
        int r = fileService.deleteFileByApplyIdAndFileName(applyId, fileName);
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping(value = "cancelUploadedFiles", method = RequestMethod.POST)
    public void cancelUploadedFiles(HttpServletRequest request, HttpServletResponse response, String applyId,
            String callback) throws Exception {
        fileService.cancelUploadedFiles(applyId);
        ControllerUtil.responseBoolean(response, callback, true);
    }
}
