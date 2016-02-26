package com.zw.fms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zw.fms.dao.FileMapper;
import com.zw.fms.model.File;
import com.zw.fms.service.FileService;
import com.zw.fms.utils.FileUploadUtil;

@Service("fileService")
public class FileServiceImpl implements FileService {

    @Autowired
    private FileMapper fileMapper;

    @Override
    public int addFile(File file) {
        return fileMapper.insertFile(file);
    }

    @Override
    public List<File> listFilesByApplyId(String applyId) {
        return fileMapper.listFilesByApplyIdAndNotStatus(applyId, "删除");
    }

    @Override
    public List<File> listFilesByApplyIdAndCategory(String applyId, String category) {
        return fileMapper.listFilesByApplyIdAndCategoryAndNotStatus(applyId, category, "删除");
    }

    @Override
    public List<File> listFilesByApplyIdAndCategoryAndUploaderId(String applyId, String category, int uploaderId) {
        return fileMapper.listFilesByApplyIdAndCategoryAndUploaderIdAndNotStatus(applyId, category, uploaderId, "删除");
    }

    @Override
    public int deleteFilesByApplyId(String applyId) {
        List<File> files = fileMapper.listFilesByApplyId(applyId);
        for (File file : files) {
            String url = file.getUrl();
            FileUploadUtil.deleteFile(url);
        }
        return fileMapper.deleteFileByApplyId(applyId);
    }

    @Override
    public int deleteFilesByApplyIdAndStatus(String applyId, String status) {
        List<File> files = fileMapper.listFilesByApplyIdAndStatus(applyId, status);
        for (File file : files) {
            String url = file.getUrl();
            FileUploadUtil.deleteFile(url);
        }
        return fileMapper.deleteFileByApplyIdAndStatus(applyId, status);
    }

    @Override
    public int deleteFileByApplyIdAndFileName(String applyId, String fileName) {
        File file = fileMapper.getFileByApplyIdAndFileName(applyId, fileName);
        if (file.getStatus().equals("临时")) {
            String url = file.getUrl();
            FileUploadUtil.deleteFile(url);
            return fileMapper.deleteFileById(file.getId());
        } else {
            return fileMapper.updateFileStatusByApplyIdAndFileName(applyId, fileName, "删除");
        }
    }

    @Override
    public File getFileByApplyIdAndFileName(String applyId, String fileName) {
        return fileMapper.getFileByApplyIdAndFileName(applyId, fileName);
    }

    @Override
    public void confirmUploadedFiles(String applyId) {
        fileMapper.updateFileStatusByApplyIdFromTo(applyId, "临时", "正常");
        deleteFilesByApplyIdAndStatus(applyId, "删除");
    }

    @Override
    public void cancelUploadedFiles(String applyId) {
        fileMapper.updateFileStatusByApplyIdFromTo(applyId, "删除", "正常");
        deleteFilesByApplyIdAndStatus(applyId, "临时");
    }
}
