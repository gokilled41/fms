package com.zw.fms.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zw.fms.model.Approval;

public interface ApprovalMapper {

    public List<Approval> listApprovals();

    public List<Approval> listApprovalsByMap(Map<String, Object> map);

    public long countApprovalsByMap(Map<String, Object> map);

    public List<Approval> listApprovalsForReviewByMap(Map<String, Object> map);

    public long countApprovalsForReviewByMap(Map<String, Object> map);

    public List<Approval> listApprovalsForViewByMap(Map<String, Object> map);

    public long countApprovalsForViewByMap(Map<String, Object> map);

    public List<Approval> listApprovalsForFileByMap(Map<String, Object> map);

    public long countApprovalsForFileByMap(Map<String, Object> map);

    public List<Approval> listApprovalsForAuthManageByMap(Map<String, Object> map);

    public long countApprovalsForAuthManageByMap(Map<String, Object> map);

    public Approval getApproval(@Param("id") int id);

    public Approval getApprovalForReview(@Param("id") int id);

    public Approval getApprovalForView(@Param("id") int id);

    public Approval getApprovalByApplyId(@Param("applyId") String applyId);

    public int updateApproval(Approval approval);

    public int updateApprovalTimestamp(@Param("id") int id, @Param("timestamp") Date timestamp);

    public int updateApprovalStatus(@Param("id") int id, @Param("status") String status);

    public int updateApprovalViewStatus(@Param("applyId") String applyId, @Param("viewStatus") String viewStatus);

    public int insertApproval(Approval approval);

    public int deleteApprovalById(@Param("id") int id);

    public int deleteApprovalByApplyId(@Param("applyId") String applyId);

    public int deleteAllApprovals();

}
