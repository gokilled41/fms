package com.zw.fms.service;

import java.util.List;
import java.util.Map;

import com.zw.fms.model.Approval;

public interface ApprovalService {

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

    public int addApproval(Approval approval);

    public int addApprovalForFile(Approval approval);

    public Approval getApproval(int id);

    public Approval getApprovalForReview(int id);

    public Approval getApprovalForView(int id);

    public int updateApproval(Approval approval);

    public int updateApprovalStatus(int id, String status);

    public int updateApprovalViewStatus(String applyId, String viewStatus);

    public int deleteApprovalById(int id);

    public int deleteApprovalByApplyId(String applyId);

    public String nextApplyId();

}
