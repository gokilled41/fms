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
  // prepare review
  prepareReviewUploadAttachments();
  
  // buttons
  $("#list-approval-btn").click(listApproval);
  // review
    // step 1: review
    $("#review-approval-review-btn").click(reviewApprovalReview);
    $("#review-approval-cancel-btn").click(reviewApprovalCancel);
    // step 2: review
    $("#review-approval-review-confirmreviewer-btn").click(reviewApprovalReviewConfirmReviewer);
    $("#review-approval-review-return-btn").click(reviewApprovalReviewReturn);
    $("#review-approval-review-cancel-btn").click(reviewApprovalReviewCancel);
    // step 3: confirmreviewer
    $("#review-approval-confirmreviewer-reselectreviewer-btn").click(reviewApprovalConfirmReviewerReselectReviewer);
    $("#review-approval-confirmreviewer-submit-btn").click(reviewApprovalConfirmReviewerSubmit);
    $("#review-approval-confirmreviewer-return-btn").click(reviewApprovalConfirmReviewerReturn);
    $("#review-approval-confirmreviewer-cancel-btn").click(reviewApprovalConfirmReviewerCancel);
    // step 4: reselectreviewer
    $("#review-approval-reselectreviewer-submit-btn").click(reviewApprovalReselectReviewerSubmit);
    $("#review-approval-reselectreviewer-return-btn").click(reviewApprovalReselectReviewerReturn);
    $("#review-approval-reselectreviewer-cancel-btn").click(reviewApprovalReselectReviewerCancel);
    // approval detail
    $("#view-approval-detail-cancel-btn").click(viewApprovalDetailCancel);
});

// list
function listApproval() {
  var name = $("#search-name").val();
  var status = "^(草稿and文件)";
  var reviewerStatus = $("#search-status").val();
  var reviewerUserName = getHeaderUserName();
  var approvalRole = "一级审批";
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
function reviewApprovalReview() {
  doSetReviewApprovalReview();
  refreshReviewUploadAttachmentList();
  $("#review-approval-modal").modal("hide");
  $("#review-approval-review-modal").modal("show");
}
function reviewApprovalCancel() {
  removeReviewUploadedAttachments();
  refreshReviewUploadAttachmentList();
}
function reviewApprovalReviewConfirmReviewer() {
  if (reviewApprovalReviewValidate()) {
    prepareReviewConfirmReviewer();
    prepareReviewReselectReviewer();
    $("#review-approval-review-modal").modal("hide");
    $("#review-approval-confirmreviewer-modal").modal("show");
  }
}
function reviewApprovalReviewValidate() {
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
function reviewApprovalReviewReturn() {
  $("#review-approval-review-modal").modal("hide");
  $("#review-approval-modal").modal("show");
}
function reviewApprovalReviewCancel() {
  reviewApprovalCancel();
}
function reviewApprovalConfirmReviewerReselectReviewer() {
  $("#review-approval-confirmreviewer-modal").modal("hide");
  $("#review-approval-reselectreviewer-modal").modal("show");
}
function reviewApprovalConfirmReviewerSubmit() {
  if (validateReviewApproval()) {
    // update reviewer 2
    updateReviewer2Status();
    // update reviewer
    $("#review-review-status").val("完成");
    ajaxSubmitRefresh("#review-approval-form");
    // hide review form
    $("#review-approval-confirmreviewer-modal").modal("hide");
  }
  // alert("审批：给二级评审人发邮件，写数据库。");
}
function reviewApprovalConfirmReviewerReturn() {
  $("#review-approval-review-modal").modal("show");
  $("#review-approval-confirmreviewer-modal").modal("hide");
}
function reviewApprovalConfirmReviewerCancel() {
  reviewApprovalCancel();
}
function reviewApprovalReselectReviewerValue() {
  var result = "";
  $(".reviewrtc").each(function(index) {
    var checked = $(this).prop('checked');
    if (checked) {
      result += $(this).val();
      result += ",";
    }
  });
  return result;
}
function reviewApprovalReselectReviewerSubmit() {
  if (validateReviewApproval()) {
    // update reviewer 2
    reviewApprovalReselectReviewerUpdateReviewer2();
    updateReviewer2Status();
    // update reviewer
    $("#review-review-status").val("完成");
    ajaxSubmitRefresh("#review-approval-form");
    // hide review form
    $("#review-approval-reselectreviewer-modal").modal("hide");
  }
  // alert("发起评审：给一级评审人发邮件，写数据库。");
}
function reviewApprovalReselectReviewerReturn() {
  $("#review-approval-reselectreviewer-modal").modal("hide");
  $("#review-approval-confirmreviewer-modal").modal("show");
}
function reviewApprovalReselectReviewerCancel() {
  reviewApprovalCancel();
}
function prepareReviewConfirmReviewer() {
  var applyId = $("#review-applyId").text();
  ajaxUtil({"applyId":applyId}, reviewerPath+"/getReviewer2ByReviewer1.shtml", function(r) {
      $("#review-confirmreviewer-businessType").text(r.businessType);
      $("#review-confirmreviewer-reviewerName").text(r.reviewerName);
    }
  );
}
function prepareReviewReselectReviewer() {
  var applyId = $("#review-applyId").text();
  var businessType = getHeaderBusinessType();
  var dataStr = "applyId="+applyId;
  printUtil("#review-reselectreviewer-table", dataStr, reviewerPath+"/getReviewers.shtml", function(rgs) {
    var theHtml = "";
    
    theHtml += "<tbody>";

    theHtml += "<tr class=\"rtt2 rttitle\">";
    theHtml += "    <td colspan=\"2\">二级审批人</td>";
    theHtml += "</tr>";

    var rgl2 = rgs.reviewerGroups2;
    for (var i in rgl2) {
      var rg = rgl2[i];
      if (rg.businessType == businessType) {
        var rgrl = rg.reviewers;
        theHtml += "<tr class=\"rtl2 rtline\">";
        theHtml += "    <td class=\"rtleft\">";
        theHtml += "      <label class=\"checkbox-inline\">";
        theHtml += "        <input class=\"rtcbleft\" type=\"checkbox\">"+rg.businessType+"";
        theHtml += "      </label>";
        theHtml += "    </td>";
        theHtml += "    <td class=\"rtright\">";
        for (var j in rgrl) {
          var rgr = rgrl[j];
          theHtml += "    <label class=\"checkbox-inline\">";
          theHtml += "      <input type=\"checkbox\" value=\""+rgr.userName+"\" class=\"reviewer2rtc\""+(rgr.checked?" checked=\"true\"":"")+">" + rgr.nickName;
          theHtml += "    </label>";
        }
        theHtml += "    </td>";
        theHtml += "</tr>";
      }
    }
    
    theHtml += "</tbody>";
    
    return theHtml;
  });
  
  // multiple tabs
  $(".rtt2").addClass("rtactive");
  $(".rtl1").hide();
  $(".rtl2").show();
  $(".rtl3").hide();
  $(".rtt1").click(function() {
    $(".rttitle").removeClass("rtactive");
    $(this).addClass("rtactive");
    $(".rtl1").show();
    $(".rtl2").hide();
    $(".rtl3").hide();
  });
  $(".rtt2").click(function() {
    $(".rttitle").removeClass("rtactive");
    $(this).addClass("rtactive");
    $(".rtl1").hide();
    $(".rtl2").show();
    $(".rtl3").hide();
  });
  $(".rtt3").click(function() {
    $(".rttitle").removeClass("rtactive");
    $(this).addClass("rtactive");
    $(".rtl1").hide();
    $(".rtl2").hide();
    $(".rtl3").show();
  });
  
  // click left, show or hide right
  $(".rtcbleft").change(function() {
    var cbl = $(this);
    var checked = cbl.prop('checked');
    var rtl = cbl.parent().parent();
    var rtr = rtl.next();
    if (checked) {
      rtr.children().show();
    } else {
      rtr.children().hide();
      rtr.find("input").prop("checked", false);
    }
  });
  
  // check all business types
  $(".rtcbleft").prop('checked', true);
  // cannot uncheck it
  $(".rtcbleft").prop('disabled', true);
  // can and only can check one reviewer 2
  radioCheckbox(".reviewer2rtc");
}
function prepareReviewUploadAttachments() {
  $("#review-up-submit").hover(function() {
    $(this).css("background-color", "darkgreen");
    $(this).css("color", "white");
    $(this).css("cursor", "pointer");
  }, function() {
    $(this).css("background-color", "white");
    $(this).css("color", "green");
  });
  
  $("#review-up-file").hover(function() {
    $("#review-up-browse").css("background-color", "darkgreen");
    $("#review-up-browse").css("color", "white");
    $("#review-up-browse").css("cursor", "pointer");
  }, function() {
    $("#review-up-browse").css("background-color", "white");
    $("#review-up-browse").css("color", "green");
  });
  
  $("#review-up-file").change(function() {
    $("#review-up-name").val(getUploadFileName($(this).val()));
    $("#review-up-note").text("");
    $("#review-up-note").hide();
  });
  $("#review-up-submit").click(function() {
    var file = $("#review-up-file").val();
    if (file == "") {
      $("#review-up-note").text("请先点击“浏览...”选择要上传的文件");
      $("#review-up-note").show();
    } else {
      $("#review-up-applyId").val($("#review-applyId").text());
      ajaxSubmitWithFunc("#review-upload-form", function(r) {
        if (r.success == "true") {
          resetUploadFileForReviewApproval();
          refreshReviewUploadAttachmentList();
        } else {
          $("#review-up-note").text(r.reason);
          $("#review-up-note").show();
        }
      });
    }
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
function refreshReviewUploadAttachmentList() {
  var applyId = $("#review-applyId").text();
  var category = "reviewer";
  var uploaderId = getHeaderUserId();
  var dataStr = "applyId="+applyId + "&category=" + category + "&uploaderId=" + uploaderId;
  printUtil("#review-upload-attachment-list", dataStr, filePath+"/listReviewerFiles.shtml", function(response) {
    var theHtml = "";
    var list = response.list;
    var floatside;
    for (var index in list) {
      var r = list[index];
      if (index % 2 == 0) {
        floatside = "fl";
      } else {
        floatside = "fr";
      }
      theHtml += "<div class=\"att "+floatside+"\">";
      theHtml += "  <img src=\""+getUploadFileIcon(r.type)+"\" />";
      theHtml += "  <span class=\"s1\">"+r.fileName+"</span>";
      theHtml += "  <div class=\"del\">删除</div>";
      theHtml += "  <br>";
      theHtml += "  <span class=\"s2\">"+r.size+"</span>";
      theHtml += "  <span class=\"s3\">上传完成</span>";
      theHtml += "</div>";
    }
    // set height
    var size = list.length;
    if (size % 2 == 1) size = size + 1;
    size = size / 2;
    var height = 65 * size + 40;
    $(".fatt").css("height", height);
    return theHtml;
  });
  
  // update del button css
  $(".del").hover(function() {
    $(this).css("background-color", "darkgreen");
    $(this).css("color", "white");
    $(this).css("cursor", "pointer");
  }, function() {
    $(this).css("background-color", "#F0F8F0");
    $(this).css("color", "green");
  });
  // update del button function
  $(".del").click(function() {
    var applyId = $("#review-applyId").text();
    var fileName = $(this).prev().text();
    ajaxUtil({"applyId":applyId,"fileName":fileName}, filePath+"/deleteFile.shtml", function(r) {
        refreshReviewUploadAttachmentList();
      }
    );
  });
}
function removeReviewUploadedAttachments() {
  var applyId = $("#review-applyId").text();
  ajaxUtil({"applyId":applyId}, filePath+"/cancelUploadedFiles.shtml", function(r) {
    }
  );
}
function validateReviewApproval() {
  /*
  var name = $("#review-name").val();
  var starts = $("#review-starts").val();
  var ends = $("#review-ends").val();
  var participants = $("#review-participants").val();
  var r;
  ajaxUtil({"name":name,"starts":starts,"ends":ends,"participants":participants,"type":"review"}, 
    approvalPath+"/validateApproval.shtml", function(response) { r = response;}
  );
  if (r.success == "false") {
    $("#review-approval-note").text(r.reason);
    $("#review-approval-note").show();
    return false;
  } else {
    $("#review-approval-note").hide();
    return true;
  }
  */
  return true;
}
function prepareReviewApproval(id, name) {
  $("#review-review-comments").val("这里是审批意见：\n    1. 第一条审批意见。\n    2. 第二条审批意见。\n    3. 第三条审批意见。");
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
function resetUploadFileForReviewApproval() {
  $("#review-up-applyId").val("");
  $("#review-up-name").val("");
  $("#review-up-file").val("");
  $("#review-up-note").hide();
}
function doSetReviewApprovalReview() {
  var applyId = $("#review-applyId").text();
  var userName = getHeaderUserName();
  var approvalRole = "一级审批";
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
        checkOnly("#review-review-conclusion", r.conclusion);
      }
    }
  );
  $("#review-approval-review-note").hide();
}
function prepareReviewApprovalConclusionCheckbox() {
  radioCheckbox(".racb");
  checkOnlyByClick("#review-review-conclusion", "通过");
}
function reviewApprovalReselectReviewerUpdateReviewer2() {
  var applyId = $("#review-applyId").text();
  var businessType = getHeaderBusinessType();
  var approvalRole = "二级审批";
  var reviewer2 = getCheckboxValueByClass(".reviewer2rtc");
  ajaxUtil({"applyId":applyId,"businessType":businessType,"approvalRole":approvalRole,"reviewer2":reviewer2}, reviewerPath+"/updateReviewer2ByReviewer1.shtml", function(r) {
    }
  );
}
function updateReviewer2Status() {
  var applyId = $("#review-applyId").text();
  var approvalRole = "二级审批";
  var userName = getCheckboxValueByClass(".reviewer2rtc");
  var status = "审批中";
  ajaxUtil({"applyId":applyId,"approvalRole":approvalRole,"userName":userName,"status":status}, reviewerPath+"/updateOneReviewerStatus.shtml", function(r) {
    }
  );
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