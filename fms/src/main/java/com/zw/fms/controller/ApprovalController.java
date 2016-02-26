package com.zw.fms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.zw.fms.Constants;
import com.zw.fms.model.Approval;
import com.zw.fms.service.ApprovalService;
import com.zw.fms.service.AuthService;
import com.zw.fms.service.FileService;
import com.zw.fms.service.ReviewerService;
import com.zw.fms.utils.ConditionUtil;
import com.zw.fms.utils.ControllerUtil;

@Controller
@RequestMapping("/approval")
public class ApprovalController {

    protected static final Log logger_ = LogFactory.getLog(ApprovalController.class);

    @Autowired
    private ApprovalService approvalService;
    @Autowired
    private FileService fileService;
    @Autowired
    private ReviewerService reviewerService;
    @Autowired
    private AuthService authService;

    @RequestMapping("listApproval")
    public void listApproval(HttpServletRequest request, HttpServletResponse response, Integer start, Integer size,
            String name, String status, int userId, String callback) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("name", name);
        map.put("userId", userId);
        if (!status.equals(Constants.ApprovalStatusAll))
            map.put("statusCondition", ConditionUtil.toCondition(status));
        map.put("size", size);
        map.put("start", start);
        List<Approval> l = approvalService.listApprovalsByMap(map);
        long count = approvalService.countApprovalsByMap(map);
        ControllerUtil.responseList(response, callback, l, count, size);
    }

    @RequestMapping("listApprovalForReview")
    public void listApprovalForReview(HttpServletRequest request, HttpServletResponse response, Integer start,
            Integer size, String name, String status, String reviewerStatus, String reviewerUserName,
            String approvalRole, String callback) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("name", name);
        map.put("reviewerUserName", reviewerUserName);
        map.put("approvalRole", approvalRole);
        if (!status.equals(Constants.ApprovalStatusAll))
            map.put("statusCondition", ConditionUtil.toCondition(status));
        if (!reviewerStatus.equals(Constants.ApprovalStatusAll))
            map.put("reviewerStatusCondition", ConditionUtil.toCondition(reviewerStatus));
        map.put("size", size);
        map.put("start", start);
        List<Approval> l = approvalService.listApprovalsForReviewByMap(map);
        long count = approvalService.countApprovalsForReviewByMap(map);
        ControllerUtil.responseList(response, callback, l, count, size);
    }

    @RequestMapping("listApprovalForView")
    public void listApprovalForView(HttpServletRequest request, HttpServletResponse response, Integer start,
            Integer size, String name, String businessType, String status, String viewerUserName, String callback) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("name", name);
        map.put("viewerUserName", viewerUserName);
        map.put("viewStatus", "正常");
        if (!status.equals(Constants.ApprovalStatusAll))
            map.put("statusCondition", ConditionUtil.toCondition(status));
        if (!businessType.equals(Constants.ApprovalStatusAll))
            map.put("businessTypeCondition", ConditionUtil.toCondition(businessType));
        map.put("size", size);
        map.put("start", start);
        List<Approval> l = approvalService.listApprovalsForViewByMap(map);
        long count = approvalService.countApprovalsForViewByMap(map);
        ControllerUtil.responseList(response, callback, l, count, size);
    }

    @RequestMapping("listApprovalForFile")
    public void listApprovalForFile(HttpServletRequest request, HttpServletResponse response, Integer start,
            Integer size, String name, String status, int userId, String callback) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("name", name);
        map.put("userId", userId);
        if (!status.equals(Constants.ApprovalStatusAll))
            map.put("statusCondition", ConditionUtil.toCondition(status));
        map.put("size", size);
        map.put("start", start);
        List<Approval> l = approvalService.listApprovalsForFileByMap(map);
        long count = approvalService.countApprovalsForFileByMap(map);
        ControllerUtil.responseList(response, callback, l, count, size);
    }

    @RequestMapping("listApprovalForAuthManage")
    public void listApprovalForAuthManage(HttpServletRequest request, HttpServletResponse response, Integer start,
            Integer size, String name, String businessType, String status, String callback) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("name", name);
        if (!status.equals(Constants.ApprovalStatusAll))
            map.put("statusCondition", ConditionUtil.toCondition(status));
        if (!businessType.equals(Constants.ApprovalStatusAll))
            map.put("businessTypeCondition", ConditionUtil.toCondition(businessType));
        map.put("size", size);
        map.put("start", start);
        List<Approval> l = approvalService.listApprovalsForAuthManageByMap(map);
        long count = approvalService.countApprovalsForAuthManageByMap(map);
        ControllerUtil.responseList(response, callback, l, count, size);
    }

    @RequestMapping(value = "addApproval", method = RequestMethod.POST)
    public void addApproval(HttpServletRequest request, HttpServletResponse response, Approval approval, String callback)
            throws Exception {
        String applyId = approval.getApplyId();
        try {
            int r = approvalService.addApproval(approval);
            // add reviewers
            reviewerService.addReviewers(approval);
            // confirm files
            fileService.confirmUploadedFiles(approval.getApplyId());
            ControllerUtil.responseInt(response, callback, r);
        } catch (Exception e) {
            // clean up
            fileService.deleteFilesByApplyId(applyId);
            reviewerService.removeReviewers(applyId);
            approvalService.deleteApprovalByApplyId(applyId);
            throw e;
        }
    }

    @RequestMapping(value = "addApprovalForFile", method = RequestMethod.POST)
    public void addApprovalForFile(HttpServletRequest request, HttpServletResponse response, Approval approval,
            String callback) throws Exception {
        String applyId = approval.getApplyId();
        try {
            int r = approvalService.addApprovalForFile(approval);
            // add auth
            authService.deleteAuth(applyId);
            authService.addAuth(applyId, approval.getAuth());
            // confirm files
            fileService.confirmUploadedFiles(approval.getApplyId());
            ControllerUtil.responseInt(response, callback, r);
        } catch (Exception e) {
            // clean up
            fileService.deleteFilesByApplyId(applyId);
            reviewerService.removeReviewers(applyId);
            approvalService.deleteApprovalByApplyId(applyId);
            throw e;
        }
    }

    @RequestMapping(value = "getApproval", method = RequestMethod.POST)
    public void getApproval(HttpServletRequest request, HttpServletResponse response, int id, String callback) {
        Approval r = approvalService.getApproval(id);
        ControllerUtil.responseObject(response, callback, r);
    }

    @RequestMapping(value = "getApprovalForReview", method = RequestMethod.POST)
    public void getApprovalForReview(HttpServletRequest request, HttpServletResponse response, int id, String callback) {
        Approval r = approvalService.getApprovalForReview(id);
        ControllerUtil.responseObject(response, callback, r);
    }

    @RequestMapping(value = "getApprovalForView", method = RequestMethod.POST)
    public void getApprovalForView(HttpServletRequest request, HttpServletResponse response, int id, String callback) {
        Approval r = approvalService.getApprovalForView(id);
        ControllerUtil.responseObject(response, callback, r);
    }

    @RequestMapping(value = "updateApproval", method = RequestMethod.POST)
    public void updateApproval(HttpServletRequest request, HttpServletResponse response, Approval approval,
            String callback) {
        int r = approvalService.updateApproval(approval);
        // update reviewers
        reviewerService.updateReviewers(approval);
        // confirm files
        fileService.confirmUploadedFiles(approval.getApplyId());
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping(value = "updateApprovalViewStatus", method = RequestMethod.POST)
    public void updateApprovalViewStatus(HttpServletRequest request, HttpServletResponse response, String applyId,
            String viewStatus, String callback) {
        int r = approvalService.updateApprovalViewStatus(applyId, viewStatus);
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping("deleteApproval")
    public void deleteApproval(HttpServletRequest request, HttpServletResponse response, int id, String callback) {
        int r = 0;
        try {
            Approval approval = approvalService.getApproval(id);
            String applyId = approval.getApplyId();
            reviewerService.removeReviewers(applyId);
            fileService.deleteFilesByApplyId(applyId);
            r = approvalService.deleteApprovalById(id);
        } catch (Exception e) {
            if (logger_.isErrorEnabled()) {
                logger_.error("Cannot delete approval.", e);
            }
        }
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping("confirmApproval")
    public void confirmApproval(HttpServletRequest request, HttpServletResponse response, int id, String callback) {
        // update approval status
        approvalService.updateApprovalStatus(id, "审批中");
        // update reviewer status
        Approval approval = approvalService.getApproval(id);
        String applyId = approval.getApplyId();
        String approvalRole = "一级审批";
        String status = "审批中";
        reviewerService.updateReviewerStatus(applyId, approvalRole, status);
        ControllerUtil.responseBoolean(response, callback, true);
    }

    @RequestMapping("nextApplyId")
    public void nextApplyId(HttpServletRequest request, HttpServletResponse response, String applyId, String callback) {
        String next = approvalService.nextApplyId();
        ControllerUtil.responseJson(response, callback, "next", next);
    }

}
