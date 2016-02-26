package com.zw.fms.model;

import java.util.ArrayList;
import java.util.List;

public class ReviewerGroups {

    private List<ReviewerGroup> reviewerGroups1 = new ArrayList<ReviewerGroup>();
    private List<ReviewerGroup> reviewerGroups2 = new ArrayList<ReviewerGroup>();
    private List<ReviewerInfo> reviewers3 = new ArrayList<ReviewerInfo>();
    private String reviewers3NickNames = "";

    public List<ReviewerGroup> getReviewerGroups1() {
        return reviewerGroups1;
    }

    public void setReviewerGroups1(List<ReviewerGroup> reviewerGroups1) {
        this.reviewerGroups1 = reviewerGroups1;
    }

    public List<ReviewerGroup> getReviewerGroups2() {
        return reviewerGroups2;
    }

    public void setReviewerGroups2(List<ReviewerGroup> reviewerGroups2) {
        this.reviewerGroups2 = reviewerGroups2;
    }

    public List<ReviewerInfo> getReviewers3() {
        return reviewers3;
    }

    public void setReviewers3(List<ReviewerInfo> reviewers3) {
        this.reviewers3 = reviewers3;
    }

    public String getReviewers3NickNames() {
        return reviewers3NickNames;
    }

    public void setReviewers3NickNames(String reviewers3NickNames) {
        this.reviewers3NickNames = reviewers3NickNames;
    }

}
