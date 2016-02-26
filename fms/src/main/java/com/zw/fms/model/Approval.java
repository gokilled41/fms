package com.zw.fms.model;

import java.util.Date;

public class Approval {

    // approval
    private int id;
    private int userId;
    private String department;
    private Date timestamp;
    private String businessType;
    private String fileType;
    private String name;
    private String version;
    private String formId;
    private String description;
    private String status;
    private String viewStatus;
    private String reviewers;
    // submitter
    private String applyId;
    private String employeeNo;
    private String nickName;
    // reviewer
    private String reviewerUserName;
    private String reviewerApprovalRole;
    private String reviewerConclusion;
    private String reviewerStatus;
    private Date reviewerTimestamp;
    // viewer
    private String viewerUserName;
    private String viewerAuthRole;
    private Date viewerTimestamp;
    // auth
    private String auth;

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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getFormId() {
        return formId;
    }

    public void setFormId(String formId) {
        this.formId = formId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getViewStatus() {
        return viewStatus;
    }

    public void setViewStatus(String viewStatus) {
        this.viewStatus = viewStatus;
    }

    public String getReviewers() {
        return reviewers;
    }

    public void setReviewers(String reviewers) {
        this.reviewers = reviewers;
    }

    public String getEmployeeNo() {
        return employeeNo;
    }

    public void setEmployeeNo(String employeeNo) {
        this.employeeNo = employeeNo;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getReviewerUserName() {
        return reviewerUserName;
    }

    public void setReviewerUserName(String reviewerUserName) {
        this.reviewerUserName = reviewerUserName;
    }

    public String getReviewerApprovalRole() {
        return reviewerApprovalRole;
    }

    public void setReviewerApprovalRole(String reviewerApprovalRole) {
        this.reviewerApprovalRole = reviewerApprovalRole;
    }

    public String getReviewerConclusion() {
        return reviewerConclusion;
    }

    public void setReviewerConclusion(String reviewerConclusion) {
        this.reviewerConclusion = reviewerConclusion;
    }

    public String getReviewerStatus() {
        return reviewerStatus;
    }

    public void setReviewerStatus(String reviewerStatus) {
        this.reviewerStatus = reviewerStatus;
    }

    public Date getReviewerTimestamp() {
        return reviewerTimestamp;
    }

    public void setReviewerTimestamp(Date reviewerTimestamp) {
        this.reviewerTimestamp = reviewerTimestamp;
    }

    public String getViewerUserName() {
        return viewerUserName;
    }

    public void setViewerUserName(String viewerUserName) {
        this.viewerUserName = viewerUserName;
    }

    public String getViewerAuthRole() {
        return viewerAuthRole;
    }

    public void setViewerAuthRole(String viewerAuthRole) {
        this.viewerAuthRole = viewerAuthRole;
    }

    public Date getViewerTimestamp() {
        return viewerTimestamp;
    }

    public void setViewerTimestamp(Date viewerTimestamp) {
        this.viewerTimestamp = viewerTimestamp;
    }

    public String getAuth() {
        return auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

}
