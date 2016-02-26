package com.zw.fms.service;

import java.util.List;

import com.zw.fms.model.Approval;
import com.zw.fms.model.Reviewer;
import com.zw.fms.model.ReviewerGroups;

public interface ReviewerService {

    public ReviewerGroups getAllReviewers();

    public ReviewerGroups getReviewers(String applyId);

    public ReviewerGroups parseReviewers(String reviewers);

    public List<Reviewer> listReviewersForView(String applyId);

    public Reviewer getReviewerByInfo(String applyId, String userName, String approvalRole);

    public Reviewer getReviewerByBusinessType(String applyId, String businessType, String approvalRole);

    public void addReviewers(Approval approval);

    public void updateReviewers(Approval approval);

    public int updateReviewer(Reviewer reviewer);

    public int updateReviewer2(String applyId, String businessType, String approvalRole, String reviewer2);

    public int updateReviewerStatus(String applyId, String approvalRole, String status);

    public int updateOneReviewerStatus(String applyId, String approvalRole, String userName, String status);

    public int updateReviewer3Status(String applyId, Reviewer reviewer);

    public int updateReviewer4Status(String applyId, Reviewer reviewer);

    public int reviewClose(String applyId, Reviewer reviewer, String result);

    public void removeReviewers(String applyId);

}
