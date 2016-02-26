package com.zw.fms.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zw.fms.dao.ApprovalMapper;
import com.zw.fms.model.Approval;
import com.zw.fms.service.ApprovalService;
import com.zw.fms.utils.Util;

@Service("approvalService")
public class ApprovalServiceImpl implements ApprovalService {

    @Autowired
    private ApprovalMapper approvalMapper;

    @Override
    public List<Approval> listApprovalsByMap(Map<String, Object> map) {
        return approvalMapper.listApprovalsByMap(map);
    }

    @Override
    public long countApprovalsByMap(Map<String, Object> map) {
        return approvalMapper.countApprovalsByMap(map);
    }

    @Override
    public List<Approval> listApprovalsForReviewByMap(Map<String, Object> map) {
        return approvalMapper.listApprovalsForReviewByMap(map);
    }

    @Override
    public long countApprovalsForReviewByMap(Map<String, Object> map) {
        return approvalMapper.countApprovalsForReviewByMap(map);
    }

    @Override
    public List<Approval> listApprovalsForViewByMap(Map<String, Object> map) {
        return approvalMapper.listApprovalsForViewByMap(map);
    }

    @Override
    public long countApprovalsForViewByMap(Map<String, Object> map) {
        return approvalMapper.countApprovalsForViewByMap(map);
    }

    @Override
    public List<Approval> listApprovalsForFileByMap(Map<String, Object> map) {
        return approvalMapper.listApprovalsForFileByMap(map);
    }

    @Override
    public long countApprovalsForFileByMap(Map<String, Object> map) {
        return approvalMapper.countApprovalsForFileByMap(map);
    }

    @Override
    public List<Approval> listApprovalsForAuthManageByMap(Map<String, Object> map) {
        return approvalMapper.listApprovalsForAuthManageByMap(map);
    }

    @Override
    public long countApprovalsForAuthManageByMap(Map<String, Object> map) {
        return approvalMapper.countApprovalsForAuthManageByMap(map);
    }

    @Override
    public int addApproval(Approval approval) {
        approval.setTimestamp(new Date());
        approval.setStatus("草稿");
        approval.setViewStatus("正常");
        return approvalMapper.insertApproval(approval);
    }

    @Override
    public int addApprovalForFile(Approval approval) {
        approval.setTimestamp(new Date());
        approval.setStatus("文件");
        approval.setViewStatus("正常");
        return approvalMapper.insertApproval(approval);
    }

    @Override
    public Approval getApproval(int id) {
        return approvalMapper.getApproval(id);
    }

    @Override
    public Approval getApprovalForReview(int id) {
        return approvalMapper.getApprovalForReview(id);
    }

    @Override
    public Approval getApprovalForView(int id) {
        return approvalMapper.getApprovalForView(id);
    }

    @Override
    public int updateApproval(Approval approval) {
        String applyId = approval.getApplyId();
        Approval existing = approvalMapper.getApprovalByApplyId(applyId);
        approval.setTimestamp(new Date());
        approval.setStatus(existing.getStatus());
        approval.setViewStatus(existing.getViewStatus());
        return approvalMapper.updateApproval(approval);
    }

    @Override
    public int updateApprovalStatus(int id, String status) {
        return approvalMapper.updateApprovalStatus(id, status);
    }

    @Override
    public int updateApprovalViewStatus(String applyId, String viewStatus) {
        return approvalMapper.updateApprovalViewStatus(applyId, viewStatus);
    }

    @Override
    public int deleteApprovalById(int id) {
        return approvalMapper.deleteApprovalById(id);
    }

    @Override
    public int deleteApprovalByApplyId(String applyId) {
        return approvalMapper.deleteApprovalByApplyId(applyId);
    }

    @Override
    public String nextApplyId() {
        long count = approvalMapper.countApprovalsByMap(new HashMap<String, Object>());
        return Util.getApplyId(count);
    }

}
