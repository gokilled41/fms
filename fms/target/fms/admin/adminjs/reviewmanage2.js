var approvalPageNo = 1;

$(document).ready(function() {

  // tabs
  $("#add-img-tab a:first").tab("show");
  $("#add-img-tab a").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });

  // prepare list
  listApproval();
  enterClickSearch("approval");
  changeClickSearchStatus("approval");
  
  // buttons
  $("#list-approval-btn").click(listApproval);
  // review
    // step 1: approval
    $("#review-approval-reviewdetail-btn").click(reviewApprovalReviewDetail);
    $("#review-approval-cancel-btn").click(reviewApprovalCancel);
    // step 2: reviewdetail
    $("#review-approval-reviewdetail-review-btn").click(reviewApprovalReviewDetailReview);
    $("#review-approval-reviewdetail-return-btn").click(reviewApprovalReviewDetailReturn);
    $("#review-approval-reviewdetail-cancel-btn").click(reviewApprovalReviewDetailCancel);
    // step 3: review
    $("#review-approval-review-submit-btn").click(reviewApprovalReviewSubmit);
    $("#review-approval-review-return-btn").click(reviewApprovalReviewReturn);
    $("#review-approval-review-cancel-btn").click(reviewApprovalReviewCancel);
    // approval detail
    $("#view-approval-detail-cancel-btn").click(viewApprovalDetailCancel);
});

// list
function listApproval() {
  var name = $("#search-name").val();
  var status = "^(草稿and文件)";
  var reviewerStatus = $("#search-status").val();
  var reviewerUserName = getHeaderUserName();
  var approvalRole = "二级审批";
  var searchPara = "name="+name+"&status="+status+"&reviewerStatus="+reviewerStatus+"&reviewerUserName="+reviewerUserName+"&approvalRole="+approvalRole;
  printApprovalList("#approval-table", approvalPath+"/listApprovalForReview.shtml", searchPara, approvalPageNo, pageSize);
}
function printApprovalList(panel, url, data, pageNo, pageSize) {
  approvalPageNo = pageNo;
  var start = (pageNo-1)*pageSize;
  var dataStr = data;
  if ("" == data) {
    dataStr = "start="+start+"&size="+pageSize;
  } else {
    dataStr += "&start="+start+"&size="+pageSize;
  }
  printUtil(panel, dataStr, url, function(response) {
    var theHtml = "";
    theHtml += "<thead>";
    theHtml += "<tr>";
    theHtml += "<th width='8%'>申请号</th>";
    theHtml += "<th width='8%'>申请人工号</th>";
    theHtml += "<th width='8%'>申请人姓名</th>";
    theHtml += "<th width='8%'>申请人部门</th>";
    theHtml += "<th width='8%'>业务类型</th>";
    theHtml += "<th width='8%'>文件类型</th>";
    theHtml += "<th width='10%'>名称</th>";
    theHtml += "<th width='5%'>版本号</th>";
    theHtml += "<th width='13%'>更新日期</th>";
    theHtml += "<th width='10%'>业务状态</th>";
    theHtml += "<th width='6%'>审批状态</th>";
    theHtml += "<th width='8%'>操作</th>";
    theHtml += "</tr>";
    theHtml += "</thead>";
    var list = response.list;
    theHtml += "<tbody>";
    for (var index in list) {
      var r = list[index];
      theHtml += "<tr>";
      theHtml += "<td>"+r.applyId+"</td>";
      theHtml += "<td>"+r.employeeNo+"</td>";
      theHtml += "<td>"+r.nickName+"</td>";
      theHtml += "<td>"+r.department+"</td>";
      theHtml += "<td>"+r.businessType+"</td>";
      theHtml += "<td>"+r.fileType+"</td>";
      theHtml += "<td>"+r.name+"</td>";
      theHtml += "<td>"+r.version+"</td>";
      theHtml += "<td>"+formatTimestamp(r.reviewerTimestamp)+"</td>";
      theHtml += "<td>"+r.status+"</td>";
      theHtml += "<td>"+r.reviewerStatus+"</td>";
      theHtml += "<td>";
      if (r.reviewerStatus == "审批中") {
        theHtml += "  <a class=\"btn btn-primary btn-sm\" href=\"javascript:reviewApproval('" + r.id + "', '" + htmlspecialchars(r.name) + "')\"> 审批 </a>";
      }
      if (r.reviewerStatus == "完成") {
        theHtml += "  <a class=\"btn btn-primary btn-sm\" href=\"javascript:viewApprovalDetail('" + r.id + "', '" + htmlspecialchars(r.name) + "')\"> 审批详情 </a>";
      }
      theHtml += "</td>";
      theHtml += "</tr>";
    }
    theHtml += "</tbody>";
    //print page
    var count = response.size;
    setPage(panel, document.getElementById("paging_btn"), count, url, data, pageNo, pageSize, "printApprovalList");
    return theHtml;
  });
}

// review
function reviewApproval(id, name) {
  prepareReviewApproval(id, name);
  doSetDefaultReviewApproval(id, name);
  refreshReviewAttachmentList();
  prepareReviewApprovalConclusionCheckbox();
  $("#review-approval-modal").modal("show");
}
function reviewApprovalReviewDetail() {
  doSetReviewApprovalReviewDetail();
  refreshReviewDetailAttachmentList();
  $("#review-approval-modal").modal("hide");
  $("#review-approval-reviewdetail-modal").modal("show");
}
function reviewApprovalCancel() {
}
function reviewApprovalReviewDetailReview() {
  doSetReviewApprovalReview();
  $("#review-approval-reviewdetail-modal").modal("hide");
  $("#review-approval-review-modal").modal("show");
}
function reviewApprovalReviewDetailReturn() {
  $("#review-approval-reviewdetail-modal").modal("hide");
  $("#review-approval-modal").modal("show");
}
function reviewApprovalReviewDetailCancel() {
  reviewApprovalCancel();
}
function reviewApprovalReviewSubmit() {
  if (validateReviewApproval()) {
    // update reviewer
    $("#review-review-status").val("完成");
    ajaxSubmitRefresh("#review-approval-form");
    // hide review form
    $("#review-approval-review-modal").modal("hide");
  }
  // alert("审批：给三级评审人发邮件，写数据库。");
}
function reviewApprovalReviewReturn() {
  $("#review-approval-reviewdetail-modal").modal("show");
  $("#review-approval-review-modal").modal("hide");
}
function reviewApprovalReviewCancel() {
  reviewApprovalCancel();
}
function prepareReviewApproval(id, name) {
  $("#review-review-comments").val("这里是审批意见：\n    1. 第一条审批意见。\n    2. 第二条审批意见。\n    3. 第三条审批意见。");
  $("#review-review-comments").change(function(r){
    $("#review-approval-review-note").hide();
  });
}
function doSetDefaultReviewApproval(id, name) {
  ajaxUtil({"id":id}, approvalPath+"/getApprovalForReview.shtml", function(r) {
    $("#review-applyId").text(r.applyId);
    $("#review-employeeNo").text(r.employeeNo);
    $("#review-nickName").text(r.nickName);
    $("#review-department").text(r.department);
    $("#review-businessType").text(r.businessType);
    $("#review-fileType").text(r.fileType);
    $("#review-name").text(r.name);
    $("#review-version").text(r.version);
    $("#review-formId").text(r.formId);
    $("#review-description").html(formatHtml(r.description));
    $("#review-userId").text(r.userId);
  });
}
function refreshReviewAttachmentList() {
  var applyId = $("#review-applyId").text();
  var category = "submitter";
  var dataStr = "applyId="+applyId + "&category=" + category;
  printUtil("#review-attachment-list", dataStr, filePath+"/listFiles.shtml", function(response) {
    var theHtml = "";
    var list = response.list;
    var floatside;
    for (var index in list) {
      var r = list[index];
      theHtml += "<div class=\"att\">";
      theHtml += "  <img src=\""+getUploadFileIcon(r.type)+"\" />";
      theHtml += "  <span class=\"s1\">"+r.fileName+"</span>";
      theHtml += "  <div class=\"dl\"><a href=\""+r.url+"\" target=\"_blank\">预览</a></div>";
      theHtml += "  <br>";
      theHtml += "  <span class=\"s2\">"+r.size+"</span>";
      theHtml += "</div>";
    }
    return theHtml;
  });
  
  // update dl button css
  $(".dl").hover(function() {
    $(this).css("background-color", "darkgreen");
    $(this).children().css("color", "white");
    $(this).css("cursor", "pointer");
  }, function() {
    $(this).css("background-color", "#F0F8F0");
    $(this).children().css("color", "green");
  });
}
function prepareReviewApprovalConclusionCheckbox() {
  radioCheckbox(".racb", function(r) {
    if (r == "通过") {
      $("#review-approval-review-submit-btn").html("提交三级审批人审批");
      $("#review-approval-review-note").hide();
    } else {
      $("#review-approval-review-submit-btn").html("结案");
      $("#review-approval-review-note").hide();
    }
  });
  checkOnlyByClick("#review-review-conclusion", "通过");
}
function doSetReviewApprovalReviewDetail() {
  var applyId = $("#review-applyId").text();
  var businessType = getHeaderBusinessType();
  var approvalRole = "一级审批";
  ajaxUtil({"applyId":applyId,"businessType":businessType,"approvalRole":approvalRole}, reviewerPath+"/getReviewer1ByReviewer2.shtml", function(r) {
    $("#reviewdetail-reviewerNickName").text(r.reviewerNickName);
    $("#reviewdetail-comments").html(formatHtml(r.comments));
    $("#reviewdetail-conclusion").text(r.conclusion);
    $("#reviewdetail-reviewerId").text(r.reviewerId);
    
    if (r.conclusion == "通过") {
      $("#reviewdetail-conclusion").removeClass("cr");
      $("#reviewdetail-conclusion").addClass("cg");
    } else {
      $("#reviewdetail-conclusion").removeClass("cg");
      $("#reviewdetail-conclusion").addClass("cr");
    }
  });
}
function refreshReviewDetailAttachmentList() {
  var applyId = $("#review-applyId").text();
  var category = "reviewer";
  var uploaderId = $("#reviewdetail-reviewerId").text();
  var dataStr = "applyId="+applyId + "&category=" + category + "&uploaderId=" + uploaderId;
  printUtil("#reviewdetail-attachment-list", dataStr, filePath+"/listReviewerFiles.shtml", function(response) {
    var theHtml = "";
    var list = response.list;
    var floatside;
    for (var index in list) {
      var r = list[index];
      theHtml += "<div class=\"att\">";
      theHtml += "  <img src=\""+getUploadFileIcon(r.type)+"\" />";
      theHtml += "  <span class=\"s1\">"+r.fileName+"</span>";
      theHtml += "  <div class=\"dl\"><a href=\""+r.url+"\" target=\"_blank\">预览</a></div>";
      theHtml += "  <br>";
      theHtml += "  <span class=\"s2\">"+r.size+"</span>";
      theHtml += "</div>";
    }
    return theHtml;
  });
  
  // update dl button css
  $(".dl").hover(function() {
    $(this).css("background-color", "darkgreen");
    $(this).children().css("color", "white");
    $(this).css("cursor", "pointer");
  }, function() {
    $(this).css("background-color", "#F0F8F0");
    $(this).children().css("color", "green");
  });
}
function doSetReviewApprovalReview() {
  var applyId = $("#review-applyId").text();
  var userName = getHeaderUserName();
  var approvalRole = "二级审批";
  ajaxUtil({"applyId":applyId,"userName":userName,"approvalRole":approvalRole}, reviewerPath+"/getReviewerByInfo.shtml", function(r) {
      $("#review-review-id").val(r.id);
      $("#review-review-applyId").val(r.applyId);
      $("#review-review-userName").val(r.userName);
      $("#review-review-approvalRole").val(r.approvalRole);
      if (r.status != null) {
        $("#review-review-status").val(r.status);
      }
      if (r.comments != null) {
        $("#review-review-comments").val(r.comments);
      }
      if (r.conclusion != null) {
        checkOnlyByClick("#review-review-conclusion", r.conclusion);
      } else {
        checkOnlyByClick("#review-review-conclusion", $("#reviewdetail-conclusion").text());
      }
    }
  );
}
function validateReviewApproval() {
  var pass = isPass();
  var empty = isEmpty($("#review-review-comments").val());
  if (!pass && empty) {
    $("#review-approval-review-note").html("审批结论为“不通过”时，审批意见不能为空。");
    $("#review-approval-review-note").show();
    return false;
  } else {
    $("#review-approval-review-note").html("");
    $("#review-approval-review-note").hide();
    return true;
  }
}

// view
function viewApprovalDetail(id, name) {
  doSetViewApprovalDetail(id, name);
  refreshViewAttachmentList();
  $("#view-approval-detail-modal").modal("show");
}
function viewApprovalDetailCancel() {
}
function doSetViewApprovalDetail(id, name) {
  ajaxUtil({"id":id}, approvalPath+"/getApprovalForView.shtml", function(r) {
    $("#view-applyId").text(r.applyId);
    $("#view-employeeNo").text(r.employeeNo);
    $("#view-nickName").text(r.nickName);
    $("#view-department").text(r.department);
    $("#view-businessType").text(r.businessType);
    $("#view-fileType").text(r.fileType);
    $("#view-name").text(r.name);
    $("#view-version").text(r.version);
    $("#view-formId").text(r.formId);
    $("#view-description").html(formatHtml(r.description));
    $("#view-userId").text(r.userId);
  });
}
function refreshViewAttachmentList() {
  var applyId = $("#view-applyId").text();
  var category = "submitter";
  var dataStr = "applyId="+applyId + "&category=" + category;
  printUtil("#view-attachment-list", dataStr, filePath+"/listFiles.shtml", function(response) {
    var theHtml = "";
    var list = response.list;
    var floatside;
    for (var index in list) {
      var r = list[index];
      theHtml += "<div class=\"att\">";
      theHtml += "  <img src=\""+getUploadFileIcon(r.type)+"\" />";
      theHtml += "  <span class=\"s1\">"+r.fileName+"</span>";
      theHtml += "  <div class=\"dl\"><a href=\""+r.url+"\" target=\"_blank\">预览</a></div>";
      theHtml += "  <br>";
      theHtml += "  <span class=\"s2\">"+r.size+"</span>";
      theHtml += "</div>";
    }
    return theHtml;
  });
  
  // update dl button css
  $(".dl").hover(function() {
    $(this).css("background-color", "darkgreen");
    $(this).children().css("color", "white");
    $(this).css("cursor", "pointer");
  }, function() {
    $(this).css("background-color", "#F0F8F0");
    $(this).children().css("color", "green");
  });
}