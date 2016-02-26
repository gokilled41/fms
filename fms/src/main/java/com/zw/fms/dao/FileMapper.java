package com.zw.fms.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zw.fms.model.File;

public interface FileMapper {

    public List<File> listFiles();

    public List<File> listFilesByMap(Map<String, Object> map);

    public List<File> listFilesByApplyId(@Param("applyId") String applyId);

    public List<File> listFilesByApplyIdAndStatus(@Param("applyId") String applyId, @Param("status") String status);

    public List<File> listFilesByApplyIdAndNotStatus(@Param("applyId") String applyId, @Param("status") String status);

    public List<File> listFilesByApplyIdAndCategoryAndNotStatus(@Param("applyId") String applyId,
            @Param("category") String category, @Param("status") String status);

    public List<File> listFilesByApplyIdAndCategoryAndUploaderIdAndNotStatus(@Param("applyId") String applyId,
            @Param("category") String category, @Param("uploaderId") int uploaderId, @Param("status") String status);

    public long countFilesByMap(Map<String, Object> map);

    public File getFile(@Param("id") int id);

    public File getFileByApplyIdAndFileName(@Param("applyId") String applyId, @Param("fileName") String fileName);

    public int updateFile(File file);

    public int updateFileTimestamp(@Param("id") int id, @Param("timestamp") Date timestamp);

    public int updateFileStatusByApplyId(@Param("applyId") String applyId, @Param("status") String status);

    public int updateFileStatusByApplyIdAndFileName(@Param("applyId") String applyId,
            @Param("fileName") String fileName, @Param("status") String status);

    public int updateFileStatusByApplyIdFromTo(@Param("applyId") String applyId, @Param("fromStatus") String fromStatus,
            @Param("toStatus") String toStatus);

    public int insertFile(File file);

    public int deleteFileById(@Param("id") int id);

    public int deleteFileByApplyId(@Param("applyId") String applyId);

    public int deleteFileByApplyIdAndStatus(@Param("applyId") String applyId, @Param("status") String status);

    public int deleteAllFiles();

}
