package com.zw.fms.model;

import java.util.List;

public class Role {

    private int userId;
    private String userName;
    private String approvalRole;
    private String adminRole;
    private boolean showApproval;
    private boolean showFile;
    private boolean showAuth;
    private List<Item> approvalItems;
    private List<Item> fileItems;
    private List<Item> authItems;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

    public String getAdminRole() {
        return adminRole;
    }

    public void setAdminRole(String adminRole) {
        this.adminRole = adminRole;
    }

    public boolean isShowApproval() {
        return showApproval;
    }

    public void setShowApproval(boolean showApproval) {
        this.showApproval = showApproval;
    }

    public boolean isShowFile() {
        return showFile;
    }

    public void setShowFile(boolean showFile) {
        this.showFile = showFile;
    }

    public boolean isShowAuth() {
        return showAuth;
    }

    public void setShowAuth(boolean showAuth) {
        this.showAuth = showAuth;
    }

    public List<Item> getApprovalItems() {
        return approvalItems;
    }

    public void setApprovalItems(List<Item> approvalItems) {
        this.approvalItems = approvalItems;
    }

    public List<Item> getFileItems() {
        return fileItems;
    }

    public void setFileItems(List<Item> fileItems) {
        this.fileItems = fileItems;
    }

    public List<Item> getAuthItems() {
        return authItems;
    }

    public void setAuthItems(List<Item> authItems) {
        this.authItems = authItems;
    }

}
