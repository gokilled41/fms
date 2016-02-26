package com.zw.fms.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zw.fms.dao.ApprovalMapper;
import com.zw.fms.dao.ReviewerMapper;
import com.zw.fms.dao.UserMapper;
import com.zw.fms.model.Approval;
import com.zw.fms.model.Reviewer;
import com.zw.fms.model.ReviewerGroup;
import com.zw.fms.model.ReviewerGroups;
import com.zw.fms.model.ReviewerInfo;
import com.zw.fms.model.User;
import com.zw.fms.service.ReviewerService;
import com.zw.fms.utils.ConfigUtil;
import com.zw.fms.utils.Util;

@Service("reviewerService")
public class ReviewerServiceImpl implements ReviewerService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private ReviewerMapper reviewerMapper;
    @Autowired
    private ApprovalMapper approvalMapper;

    @Override
    public ReviewerGroups getAllReviewers() {
        return getReviewers(null);
    }

    @Override
    public ReviewerGroups getReviewers(String applyId) {
        List<String> types = ConfigUtil.getBusinessTypes();
        List<User> all = userMapper.listUsers();
        List<Reviewer> checked = new ArrayList<Reviewer>();
        Map<String, Reviewer> checkedMap = new HashMap<String, Reviewer>();
        if (applyId != null) {
            checked = reviewerMapper.listReviewersByApplyId(applyId);
            if (checked != null && !checked.isEmpty())
                checkedMap = toMap(checked);
        }
        ReviewerGroups reviewerGroups = new ReviewerGroups();
        // reviewer 1
        List<ReviewerGroup> reviewerGroups1 = new ArrayList<ReviewerGroup>();
        for (String type : types) {
            ReviewerGroup r = new ReviewerGroup();
            r.setBusinessType(type);
            r.setReviewers(getReviewers(applyId, all, checkedMap, "一级审批", type));
            if (!r.getReviewers().isEmpty()) {
                reviewerGroups1.add(r);
            }
        }
        reviewerGroups.setReviewerGroups1(reviewerGroups1);
        // reviewer 2
        List<ReviewerGroup> reviewerGroups2 = new ArrayList<ReviewerGroup>();
        for (String type : types) {
            ReviewerGroup r = new ReviewerGroup();
            r.setBusinessType(type);
            r.setReviewers(getReviewers(applyId, all, checkedMap, "二级审批", type));
            if (!r.getReviewers().isEmpty()) {
                reviewerGroups2.add(r);
            }
        }
        reviewerGroups.setReviewerGroups2(reviewerGroups2);
        // reviewer 3
        reviewerGroups.setReviewers3(getReviewers(applyId, all, checkedMap, "三级审批", null));
        return reviewerGroups;
    }

    private List<ReviewerInfo> getReviewers(String applyId, List<User> all, Map<String, Reviewer> checkedMap,
            String approvalRole, String businessType) {
        List<ReviewerInfo> list = new ArrayList<ReviewerInfo>();
        for (User u : all) {
            if (approvalRole != null) {
                if (!u.getApprovalRole().contains(approvalRole))
                    continue;
            }
            if (businessType != null) {
                if (!u.getBusinessType().contains(businessType))
                    continue;
            }
            ReviewerInfo r = new ReviewerInfo();
            r.setUserName(u.getUserName());
            r.setNickName(u.getNickName());
            if (applyId != null)
                r.setChecked(checkedMap.containsKey(Util.toReviewerString(applyId, approvalRole, u.getUserName())));
            list.add(r);
        }
        return list;
    }

    private Map<String, Reviewer> toMap(List<Reviewer> checked) {
        Map<String, Reviewer> map = new HashMap<String, Reviewer>();
        for (Reviewer r : checked) {
            map.put(Util.toReviewerString(r), r);
        }
        return map;
    }

    @Override
    public ReviewerGroups parseReviewers(String reviewers) {
        ReviewerGroups rgs = new ReviewerGroups();
        List<ReviewerGroup> rgs1 = rgs.getReviewerGroups1();
        List<ReviewerGroup> rgs2 = rgs.getReviewerGroups2();
        List<ReviewerInfo> rl3 = rgs.getReviewers3();
        List<String> reviewerStrings = Util.splitToList(reviewers, ",");
        Map<String, ReviewerGroup> rgmap1 = new HashMap<String, ReviewerGroup>();
        Map<String, ReviewerGroup> rgmap2 = new HashMap<String, ReviewerGroup>();
        for (String reviewerString : reviewerStrings) {
            List<String> l2 = Util.splitToList(reviewerString, ";");
            String approvalRole = l2.get(0);
            if (approvalRole.equals("一级审批人")) {
                String businessType = l2.get(1);
                String userName = l2.get(2);
                String nickName = l2.get(3);

                ReviewerGroup rg = rgmap1.get(businessType);
                if (rg == null) {
                    rg = new ReviewerGroup();
                    rg.setBusinessType(businessType);
                    rgmap1.put(businessType, rg);
                    rgs1.add(rg);
                }

                ReviewerInfo info = new ReviewerInfo();
                info.setUserName(userName);
                info.setNickName(nickName);
                rg.getReviewers().add(info);
                String reviewersNickNames = rg.getReviewersNickNames();
                if (reviewersNickNames.isEmpty()) {
                    reviewersNickNames += nickName;
                } else {
                    reviewersNickNames += ("," + nickName);
                }
                rg.setReviewersNickNames(reviewersNickNames);
            } else if (approvalRole.equals("二级审批人")) {
                String businessType = l2.get(1);
                String userName = l2.get(2);
                String nickName = l2.get(3);

                ReviewerGroup rg = rgmap2.get(businessType);
                if (rg == null) {
                    rg = new ReviewerGroup();
                    rg.setBusinessType(businessType);
                    rgmap2.put(businessType, rg);
                    rgs2.add(rg);
                }

                ReviewerInfo info = new ReviewerInfo();
                info.setUserName(userName);
                info.setNickName(nickName);
                rg.getReviewers().add(info);
                String reviewersNickNames = rg.getReviewersNickNames();
                if (reviewersNickNames.isEmpty()) {
                    reviewersNickNames += nickName;
                } else {
                    reviewersNickNames += ("," + nickName);
                }
                rg.setReviewersNickNames(reviewersNickNames);
            } else if (approvalRole.equals("三级审批人")) {
                String userName = l2.get(1);
                String nickName = l2.get(2);

                ReviewerInfo info = new ReviewerInfo();
                info.setUserName(userName);
                info.setNickName(nickName);
                rl3.add(info);
                String reviewersNickNames = rgs.getReviewers3NickNames();
                if (reviewersNickNames.isEmpty()) {
                    reviewersNickNames += nickName;
                } else {
                    reviewersNickNames += ("," + nickName);
                }
                rgs.setReviewers3NickNames(reviewersNickNames);
            }

        }
        return rgs;
    }

    @Override
    public List<Reviewer> listReviewersForView(String applyId) {
        return reviewerMapper.listReviewersForViewByApplyId(applyId);
    }

    @Override
    public Reviewer getReviewerByInfo(String applyId, String userName, String approvalRole) {
        return reviewerMapper.getReviewerByInfo(applyId, userName, approvalRole);
    }

    @Override
    public Reviewer getReviewerByBusinessType(String applyId, String businessType, String approvalRole) {
        return reviewerMapper.getReviewerByBusinessType(applyId, businessType, approvalRole);
    }

    @Override
    public void addReviewers(Approval approval) {
        String applyId = approval.getApplyId();
        String reviewers = approval.getReviewers();
        ReviewerGroups rgs = parseReviewers(reviewers);

        List<ReviewerGroup> rgs1 = rgs.getReviewerGroups1();
        List<ReviewerGroup> rgs2 = rgs.getReviewerGroups2();
        List<ReviewerInfo> rl3 = rgs.getReviewers3();
        for (ReviewerGroup rg : rgs1) {
            String approvalRole = "一级审批";
            List<ReviewerInfo> rl1 = rg.getReviewers();
            for (ReviewerInfo ri : rl1) {
                String userName = ri.getUserName();
                addReviewer(applyId, approvalRole, userName);
            }
        }
        for (ReviewerGroup rg : rgs2) {
            String approvalRole = "二级审批";
            List<ReviewerInfo> rl1 = rg.getReviewers();
            for (ReviewerInfo ri : rl1) {
                String userName = ri.getUserName();
                addReviewer(applyId, approvalRole, userName);
            }
        }
        for (ReviewerInfo ri : rl3) {
            String approvalRole = "三级审批";
            String userName = ri.getUserName();
            addReviewer(applyId, approvalRole, userName);
        }
    }

    private void addReviewer(String applyId, String approvalRole, String userName) {
        addReviewer(applyId, approvalRole, userName, "预备");
    }

    private void addReviewer(String applyId, String approvalRole, String userName, String status) {
        Reviewer r = new Reviewer();
        r.setApplyId(applyId);
        r.setApprovalRole(approvalRole);
        r.setUserName(userName);
        r.setStatus(status);
        r.setTimestamp(new Date());
        reviewerMapper.insertReviewer(r);
    }

    @Override
    public void updateReviewers(Approval approval) {
        removeReviewers(approval.getApplyId());
        addReviewers(approval);
    }

    @Override
    public int updateReviewer(Reviewer reviewer) {
        reviewer.setTimestamp(new Date());
        return reviewerMapper.updateReviewer(reviewer);
    }

    @Override
    public int updateReviewer2(String applyId, String businessType, String approvalRole, String reviewer2) {
        Reviewer r = getReviewerByBusinessType(applyId, businessType, approvalRole);
        String reviewerOld = r.getUserName();
        if (!reviewerOld.equals(reviewer2)) {
            r.setUserName(reviewer2);
            reviewerMapper.updateReviewer(r);
        }
        return 1;
    }

    @Override
    public int updateReviewerStatus(String applyId, String approvalRole, String status) {
        return reviewerMapper.updateReviewerStatus(applyId, approvalRole, status);
    }

    @Override
    public int updateOneReviewerStatus(String applyId, String approvalRole, String userName, String status) {
        return reviewerMapper.updateOneReviewerStatus(applyId, approvalRole, userName, status, new Date());
    }

    @Override
    public int updateReviewer3Status(String applyId, Reviewer reviewer) {
        List<Reviewer> reviewers = reviewerMapper.listReviewersByApplyIdAndApprovalRole(applyId, "二级审批");
        boolean allFinished = true;
        for (Reviewer r : reviewers) {
            if (!r.getStatus().equals("完成") && !r.getUserName().equals(reviewer.getUserName())) {
                allFinished = false;
                break;
            }
        }
        if (allFinished) {
            return reviewerMapper.updateReviewerStatus(applyId, "三级审批", "审批中");
        }
        return 1;
    }

    @Override
    public int updateReviewer4Status(String applyId, Reviewer reviewer) {
        String approvalRole = "四级审批";
        // find reviewer 4
        List<User> users = userMapper.listUsersByApprovalRole(approvalRole);
        if (users == null || users.size() != 1)
            throw new RuntimeException("There should be one and only one reviewer 4.");
        User reviewer4 = users.get(0);
        String reviewer4UserName = reviewer4.getUserName();
        // insert reviewer record
        addReviewer(applyId, approvalRole, reviewer4UserName, "审批中");
        return 1;
    }

    @Override
    public int reviewClose(String applyId, Reviewer reviewer, String result) {
        Approval approval = approvalMapper.getApprovalByApplyId(applyId);
        approvalMapper.updateApprovalStatus(approval.getId(), "已结案-" + result);
        reviewerMapper.updateReviewerStatusFromTo(applyId, "审批中", "结案");
        return 1;
    }

    @Override
    public void removeReviewers(String applyId) {
        reviewerMapper.deleteReviewerByApplyId(applyId);
    }

}
