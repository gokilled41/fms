package com.zw.fms.model;

import java.util.ArrayList;
import java.util.List;

public class ReviewerGroup {

    private String businessType;
    private String reviewersNickNames = "";
    private List<ReviewerInfo> reviewers = new ArrayList<ReviewerInfo>();

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getReviewersNickNames() {
        return reviewersNickNames;
    }

    public void setReviewersNickNames(String reviewersNickNames) {
        this.reviewersNickNames = reviewersNickNames;
    }

    public List<ReviewerInfo> getReviewers() {
        return reviewers;
    }

    public void setReviewers(List<ReviewerInfo> reviewers) {
        this.reviewers = reviewers;
    }

}
