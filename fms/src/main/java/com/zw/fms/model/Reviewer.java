package com.zw.fms.model;

import java.util.Date;

public class Reviewer {

    private int id;
    private String applyId;
    private String userName;
    private String approvalRole;
    private String status;
    private String comments;
    private String conclusion;
    private Date timestamp;

    private String reviewerNickName;
    private String reviewerId;
    private String reviewerBusinessType;

    private String auth;
    private String needreview4;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getApplyId() {
        return applyId;
    }

    public void setApplyId(String applyId) {
        this.applyId = applyId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getApprovalRole() {
        return approvalRole;
    }

    public void setApprovalRole(String approvalRole) {
        this.approvalRole = approvalRole;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getConclusion() {
        return conclusion;
    }

    public void setConclusion(String conclusion) {
        this.conclusion = conclusion;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getReviewerNickName() {
        return reviewerNickName;
    }

    public void setReviewerNickName(String reviewerNickName) {
        this.reviewerNickName = reviewerNickName;
    }

    public String getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(String reviewerId) {
        this.reviewerId = reviewerId;
    }

    public String getReviewerBusinessType() {
        return reviewerBusinessType;
    }

    public void setReviewerBusinessType(String reviewerBusinessType) {
        this.reviewerBusinessType = reviewerBusinessType;
    }

    public String getAuth() {
        return auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public String getNeedreview4() {
        return needreview4;
    }

    public void setNeedreview4(String needreview4) {
        this.needreview4 = needreview4;
    }

}
