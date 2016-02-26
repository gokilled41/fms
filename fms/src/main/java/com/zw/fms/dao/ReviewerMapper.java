package com.zw.fms.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zw.fms.model.Reviewer;

public interface ReviewerMapper {

    public List<Reviewer> listReviewers();

    public List<Reviewer> listReviewersByApplyId(@Param("applyId") String applyId);

    public List<Reviewer> listReviewersForViewByApplyId(@Param("applyId") String applyId);

    public List<Reviewer> listReviewersByApplyIdAndApprovalRole(@Param("applyId") String applyId,
            @Param("approvalRole") String approvalRole);

    public List<Reviewer> listReviewersByMap(Map<String, Object> map);

    public long countReviewersByMap(Map<String, Object> map);

    public Reviewer getReviewer(@Param("id") String id);

    public Reviewer getReviewerByInfo(@Param("applyId") String applyId, @Param("userName") String userName,
            @Param("approvalRole") String approvalRole);

    public Reviewer getReviewerByBusinessType(@Param("applyId") String applyId,
            @Param("businessType") String businessType, @Param("approvalRole") String approvalRole);

    public int updateReviewer(Reviewer reviewer);

    public int updateReviewerStatus(@Param("applyId") String applyId, @Param("approvalRole") String approvalRole,
            @Param("status") String status);

    public void updateReviewerStatusFromTo(@Param("applyId") String applyId, @Param("fromStatus") String fromStatus,
            @Param("toStatus") String toStatus);

    public int updateOneReviewerStatus(@Param("applyId") String applyId, @Param("approvalRole") String approvalRole,
            @Param("userName") String userName, @Param("status") String status, @Param("timestamp") Date timestamp);

    public int insertReviewer(Reviewer reviewer);

    public int deleteReviewer(@Param("id") String id);

    public int deleteReviewerByApplyId(@Param("applyId") String applyId);

    public int deleteReviewerByInfo(@Param("applyId") String applyId, @Param("userName") String userName,
            @Param("approvalRole") String approvalRole);

    public int deleteAllReviewers();

}
