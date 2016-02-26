package com.zw.fms.service;

import java.util.List;

import com.zw.fms.model.File;

public interface FileService {

    public int addFile(File file);

    public List<File> listFilesByApplyId(String applyId);

    public List<File> listFilesByApplyIdAndCategory(String applyId, String category);

    public List<File> listFilesByApplyIdAndCategoryAndUploaderId(String applyId, String category, int uploaderId);

    public int deleteFilesByApplyId(String applyId);

    public int deleteFilesByApplyIdAndStatus(String applyId, String status);

    public int deleteFileByApplyIdAndFileName(String applyId, String fileName);

    public File getFileByApplyIdAndFileName(String applyId, String fileName);

    public void confirmUploadedFiles(String applyId);

    public void cancelUploadedFiles(String applyId);

}
