package com.zw.fms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.zw.fms.model.Reviewer;
import com.zw.fms.model.ReviewerGroups;
import com.zw.fms.model.User;
import com.zw.fms.service.AuthService;
import com.zw.fms.service.FileService;
import com.zw.fms.service.ReviewerService;
import com.zw.fms.service.UserService;
import com.zw.fms.utils.ControllerUtil;
import com.zw.fms.utils.SessionUtil;

@Controller
@RequestMapping("/reviewer")
public class ReviewerController {

    protected static final Log logger_ = LogFactory.getLog(ReviewerController.class);

    @Autowired
    private ReviewerService reviewerService;
    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;
    @Autowired
    private AuthService authService;

    @RequestMapping(value = "getAllReviewers", method = RequestMethod.POST)
    public void getAllReviewers(HttpServletRequest request, HttpServletResponse response, String callback) {
        ReviewerGroups r = reviewerService.getAllReviewers();
        ControllerUtil.responseObject(response, callback, r);
    }

    @RequestMapping(value = "getReviewers", method = RequestMethod.POST)
    public void getReviewers(HttpServletRequest request, HttpServletResponse response, String applyId,
            String callback) {
        ReviewerGroups r = reviewerService.getReviewers(applyId);
        ControllerUtil.responseObject(response, callback, r);
    }

    @RequestMapping(value = "listReviewersForView", method = RequestMethod.POST)
    public void listReviewersForView(HttpServletRequest request, HttpServletResponse response, String applyId,
            String callback) {
        List<Reviewer> l = reviewerService.listReviewersForView(applyId);
        ControllerUtil.responseList(response, callback, l);
    }

    @RequestMapping(value = "parseReviewers", method = RequestMethod.POST)
    public void parseReviewers(HttpServletRequest request, HttpServletResponse response, String reviewers,
            String callback) {
        ReviewerGroups r = reviewerService.parseReviewers(reviewers);
        ControllerUtil.responseObject(response, callback, r);
    }

    @RequestMapping(value = "updateReviewer", method = RequestMethod.POST)
    public void updateReviewer(HttpServletRequest request, HttpServletResponse response, Reviewer reviewer,
            String callback) {
        int r = reviewerService.updateReviewer(reviewer);
        // confirm files
        fileService.confirmUploadedFiles(reviewer.getApplyId());
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping(value = "reviewer2Submit", method = RequestMethod.POST)
    public void reviewer2Submit(HttpServletRequest request, HttpServletResponse response, Reviewer reviewer,
            String callback) {
        String applyId = reviewer.getApplyId();
        String conclusion = reviewer.getConclusion();
        if (conclusion.equals("通过")) {
            reviewerService.updateReviewer3Status(applyId, reviewer);
        } else {
            reviewerService.reviewClose(applyId, reviewer, "不通过");
        }
        // update reviewer
        int r = reviewerService.updateReviewer(reviewer);
        // confirm files
        fileService.confirmUploadedFiles(reviewer.getApplyId());
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping(value = "reviewer3Submit", method = RequestMethod.POST)
    public void reviewer3Submit(HttpServletRequest request, HttpServletResponse response, Reviewer reviewer,
            String callback) {
        String applyId = reviewer.getApplyId();
        String conclusion = reviewer.getConclusion();
        if (conclusion.equals("通过")) {
            authService.deleteAuth(applyId);
            authService.addAuth(applyId, reviewer.getAuth());

            String needreview4 = reviewer.getNeedreview4();
            if (needreview4.equals("需要")) {
                reviewerService.updateReviewer4Status(applyId, reviewer);
            } else {
                reviewerService.reviewClose(applyId, reviewer, "通过");
            }
        } else {
            reviewerService.reviewClose(applyId, reviewer, "不通过");
        }
        // update reviewer
        int r = reviewerService.updateReviewer(reviewer);
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping(value = "reviewer4Submit", method = RequestMethod.POST)
    public void reviewer4Submit(HttpServletRequest request, HttpServletResponse response, Reviewer reviewer,
            String callback) {
        String applyId = reviewer.getApplyId();
        String conclusion = reviewer.getConclusion();
        if (conclusion.equals("通过")) {
            reviewerService.reviewClose(applyId, reviewer, "通过");
        } else {
            reviewerService.reviewClose(applyId, reviewer, "不通过");
        }
        // update reviewer
        int r = reviewerService.updateReviewer(reviewer);
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping(value = "getReviewer2ByReviewer1", method = RequestMethod.POST)
    public void getReviewer2ByReviewer1(HttpServletRequest request, HttpServletResponse response, String applyId,
            String callback) {
        String businessType = SessionUtil.getLoginUser(request).getBusinessType();
        String approvalRole = "二级审批";
        Reviewer r = reviewerService.getReviewerByBusinessType(applyId, businessType, approvalRole);
        String userName = r.getUserName();
        User user = userService.getUserByUserName(userName);
        ControllerUtil.responseJson(response, callback, "businessType", businessType, "reviewerName",
                user.getNickName());
    }

    @RequestMapping(value = "getReviewer1ByReviewer2", method = RequestMethod.POST)
    public void getReviewer1ByReviewer2(HttpServletRequest request, HttpServletResponse response, String applyId,
            String businessType, String approvalRole, String callback) {
        Reviewer r = reviewerService.getReviewerByBusinessType(applyId, businessType, approvalRole);
        ControllerUtil.responseObject(response, callback, r);
    }

    @RequestMapping(value = "updateReviewer2ByReviewer1", method = RequestMethod.POST)
    public void updateReviewer2ByReviewer1(HttpServletRequest request, HttpServletResponse response, String applyId,
            String businessType, String approvalRole, String reviewer2, String callback) {
        int r = reviewerService.updateReviewer2(applyId, businessType, approvalRole, reviewer2);
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping(value = "updateOneReviewerStatus", method = RequestMethod.POST)
    public void updateOneReviewerStatus(HttpServletRequest request, HttpServletResponse response, String applyId,
            String approvalRole, String userName, String status, String callback) {
        int r = reviewerService.updateOneReviewerStatus(applyId, approvalRole, userName, status);
        ControllerUtil.responseInt(response, callback, r);
    }

    @RequestMapping(value = "getReviewerByInfo", method = RequestMethod.POST)
    public void getReviewerByInfo(HttpServletRequest request, HttpServletResponse response, String applyId,
            String userName, String approvalRole, String callback) {
        Reviewer r = reviewerService.getReviewerByInfo(applyId, userName, approvalRole);
        ControllerUtil.responseObject(response, callback, r);
    }

}
