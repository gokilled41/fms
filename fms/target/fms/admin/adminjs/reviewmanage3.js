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
    $("#review-approval-review-btn").click(reviewApprovalReview);
    $("#review-approval-cancel-btn").click(reviewApprovalCancel);
    // step 2: review
    $("#review-approval-review-auth-btn").click(reviewApprovalReviewAuth);
    $("#review-approval-review-submit-btn").click(reviewApprovalReviewSubmit);
    $("#review-approval-review-return-btn").click(reviewApprovalReviewReturn);
    $("#review-approval-review-cancel-btn").click(reviewApprovalReviewCancel);
    // step 3: auth
    $("#review-approval-auth-review-btn").click(reviewApprovalAuthReview);
    $("#review-approval-auth-return-btn").click(reviewApprovalAuthReturn);
    $("#review-approval-auth-cancel-btn").click(reviewApprovalAuthCancel);
    // step 4: review auth
    $("#review-approval-reviewauth-review4-btn").click(reviewApprovalReviewAuthReview4);
    $("#review-approval-reviewauth-return-btn").click(reviewApprovalReviewAuthReturn);
    $("#review-approval-reviewauth-cancel-btn").click(reviewApprovalReviewAuthCancel);
    // step 5: review4
    $("#review-approval-review4-submit-btn").click(reviewApprovalReview4Submit);
    $("#review-approval-review4-close-btn").click(reviewApprovalReview4Submit);
    $("#review-approval-review4-return-btn").click(reviewApprovalReview4Return);
    $("#review-approval-review4-cancel-btn").click(reviewApprovalReview4Cancel);
    // approval detail
    $("#view-approval-detail-cancel-btn").click(viewApprovalDetailCancel);
});

// list
function listApproval() {
  var name = $("#search-name").val();
  var status = "^(草稿and文件)";
  var reviewerStatus = $("#search-status").val();
  var reviewerUserName = getHeaderUserName();
  var approvalRole = "三级审批";
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
  doSetReviewApproval(id, name);
  refreshReviewAttachmentList();
  prepareReviewApprovalConclusionCheckbox();
  prepareReviewApprovalReview4Checkbox();
  $("#review-approval-modal").modal("show");
}
function reviewApprovalReview() {
  doSetReviewApprovalReview();
  $("#review-approval-modal").modal("hide");
  $("#review-approval-review-modal").modal("show");
}
function reviewApprovalCancel() {
}
function reviewApprovalReviewAuth() {
  prepareReviewAuth();
  $("#review-approval-review-modal").modal("hide");
  $("#review-approval-auth-modal").modal("show");
}
function reviewApprovalReviewSubmit() {
  if (validateReviewApproval()) {
    // update reviewer
    $("#review-review-status").val("完成");
    ajaxSubmitRefresh("#review-approval-form");
    // hide review form
    $("#review-approval-review-modal").modal("hide");
  }
  // alert("审批：给四级评审人发邮件，写数据库。");
}
function reviewApprovalReviewReturn() {
  $("#review-approval-modal").modal("show");
  $("#review-approval-review-modal").modal("hide");
}
function reviewApprovalReviewCancel() {
  reviewApprovalCancel();
}
function reviewApprovalAuthReview() {
  prepareReviewReviewAuth();
  $("#review-approval-auth-modal").modal("hide");
  $("#review-approval-reviewauth-modal").modal("show");
}
function reviewApprovalAuthReturn() {
  $("#review-approval-review-modal").modal("show");
  $("#review-approval-auth-modal").modal("hide");
}
function reviewApprovalAuthCancel() {
  reviewApprovalCancel();
}
function reviewApprovalReviewAuthReview4() {
  $("#review-approval-reviewauth-modal").modal("hide");
  $("#review-approval-review4-modal").modal("show");
}
function reviewApprovalReviewAuthReturn() {
  $("#review-approval-auth-modal").modal("show");
  $("#review-approval-reviewauth-modal").modal("hide");
}
function reviewApprovalReviewAuthCancel() {
  reviewApprovalCancel();
}
function reviewApprovalReview4Submit() {
  if (validateReviewApprovalReview4()) {
    // set need review4
    $("#review-review-needreview4").val(getCheckboxValueByClass(".r4cb"));
    // update reviewer
    $("#review-review-status").val("完成");
    ajaxSubmitRefresh("#review-approval-form");
    // hide review form
    $("#review-approval-review4-modal").modal("hide");
  }
  // alert("审批：给四级评审人发邮件，写数据库。");
}
function reviewApprovalReview4Return() {
  $("#review-approval-reviewauth-modal").modal("show");
  $("#review-approval-review4-modal").modal("hide");
}
function reviewApprovalReview4Cancel() {
  reviewApprovalCancel();
}
function prepareReviewApproval(id, name) {
  $("#review-review-comments").val("这里是审批意见：\n    1. 第一条审批意见。\n    2. 第二条审批意见。\n    3. 第三条审批意见。");
  $("#review-review-comments").change(function(r){
    $("#review-approval-review-note").hide();
  });
}
function doSetReviewApproval(id, name) {
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
      $("#review-approval-review-auth-btn").show();
      $("#review-approval-review-submit-btn").hide();
      $("#review-approval-review-note").hide();
    } else {
      $("#review-approval-review-auth-btn").hide();
      $("#review-approval-review-submit-btn").show();
      $("#review-approval-review-note").hide();
    }
  });
  checkOnlyByClick("#review-review-conclusion", "通过");
}
function prepareReviewApprovalReview4Checkbox() {
  radioCheckbox(".r4cb", function(r) {
    if (r == "需要") {
      $("#review-approval-review4-submit-btn").show();
      $("#review-approval-review4-close-btn").hide();
      $("#review-approval-review4-note").hide();
    } else {
      $("#review-approval-review4-submit-btn").hide();
      $("#review-approval-review4-close-btn").show();
      $("#review-approval-review4-note").hide();
    }
  });
  checkOnlyByClick("#review4-needreview4", "需要");
}
function doSetReviewApprovalReview() {
  var applyId = $("#review-applyId").text();
  var userName = getHeaderUserName();
  var approvalRole = "三级审批";
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
function prepareReviewAuth() {
  printUtil("#review-auth-table", "", authPath+"/getAllUsers.shtml", function(ugs) {
    var theHtml = "";
    
    theHtml += "<tbody>";
    theHtml += "<tr class=\"rtt1 rttitle\">";
    theHtml += "    <td colspan=\"2\">阅读权限</td>";
    theHtml += "</tr>";
    
    var ugl1 = ugs.userGroups1;
    for (var i in ugl1) {
      var ug = ugl1[i];
      var ugrl = ug.usersPieces;
      theHtml += "<tr class=\"rtl1 rtline\">";
      theHtml += "    <td class=\"rtleft\">";
      theHtml += "      <label class=\"checkbox-inline\">";
      theHtml += "        <input class=\"rtcbleft\" type=\"checkbox\">"+ug.businessType+"";
      theHtml += "      </label>";
      theHtml += "    </td>";
      theHtml += "    <td class=\"rtright\">";
      theHtml += "    <table class=\"addrtctable\"><tbody>";
      for (var j in ugrl) {
        var ugrsl = ugrl[j];
        
        theHtml += "<tr>";
        for (var k in ugrsl) {
          var ugr = ugrsl[k];
          theHtml += "<td>";
          theHtml += "    <label class=\"checkbox-inline addrtclabel\">";
          theHtml += "      <input type=\"checkbox\" value=\"阅读权限;"+ug.businessType+";"+ugr.userName+";"+ugr.nickName+"\" class=\"addrtc\">" + ugr.nickName;
          theHtml += "    </label>";
          theHtml += "</td>";
        }
        theHtml += "</tr>";

      }
      theHtml += "    </tbody></table>";
      theHtml += "    </td>";
      theHtml += "</tr>";
    }

    theHtml += "<tr class=\"rtt2 rttitle\">";
    theHtml += "    <td colspan=\"2\">下载权限</td>";
    theHtml += "</tr>";

    var ugl2 = ugs.userGroups2;
    for (var i in ugl2) {
      var ug = ugl2[i];
      var ugrl = ug.usersPieces;
      theHtml += "<tr class=\"rtl2 rtline\">";
      theHtml += "    <td class=\"rtleft\">";
      theHtml += "      <label class=\"checkbox-inline\">";
      theHtml += "        <input class=\"rtcbleft\" type=\"checkbox\">"+ug.businessType+"";
      theHtml += "      </label>";
      theHtml += "    </td>";
      theHtml += "    <td class=\"rtright\">";
      theHtml += "    <table class=\"addrtctable\"><tbody>";
      for (var j in ugrl) {
        var ugrsl = ugrl[j];
        
        theHtml += "<tr>";
        for (var k in ugrsl) {
          var ugr = ugrsl[k];
          theHtml += "<td>";
          theHtml += "    <label class=\"checkbox-inline addrtclabel\">";
          theHtml += "      <input type=\"checkbox\" value=\"下载权限;"+ug.businessType+";"+ugr.userName+";"+ugr.nickName+"\" class=\"addrtc\">" + ugr.nickName;
          theHtml += "    </label>";
          theHtml += "</td>";
        }
        theHtml += "</tr>";

      }
      theHtml += "    </tbody></table>";
      theHtml += "    </td>";
      theHtml += "</tr>";
    }
    
    theHtml += "</tbody>";
    
    return theHtml;
  });
  
  // multiple tabs
  $(".rtt1").addClass("rtactive");
  $(".rtl1").show();
  $(".rtl2").hide();
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
  
  // check default
  $(".rtright").each(function(index) {
    $(this).find("input").prop("checked", false);
    $(this).find("input").eq(0).prop("checked", true);
  });
  
  $(".rtl3").find("input").prop("checked", false);
  $(".rtl3").find("input").eq(1).prop("checked", true);
}
function prepareReviewReviewAuth() {
  var users = getReviewApprovalReviewAuthValue();
  var dataStr = "users=" + users;
  printUtil("#review-reviewauth-table", dataStr, authPath+"/parseUsers.shtml", function(ugs) {
    var theHtml = "";
    
    theHtml += "<tbody>";
    
    var ugl1 = ugs.userGroups1;
    for (var i in ugl1) {
      var ug = ugl1[i];
      theHtml += "<tr>";
      if (i == 0) {
        theHtml += "<td class=\"rtt1\" rowspan=\""+ugl1.length+"\">阅读权限</td>";
      }
      theHtml += "<td class=\"rtt2\">"+ug.businessType+"</td>";
      theHtml += "<td class=\"rtt3\">"+ug.usersNickNames+"</td>";
      theHtml += "</tr>";
    }

    var ugl2 = ugs.userGroups2;
    for (var i in ugl2) {
      var ug = ugl2[i];
      theHtml += "<tr>";
      if (i == 0) {
        theHtml += "<td class=\"rtt1\" rowspan=\""+ugl2.length+"\">下载权限</td>";
      }
      theHtml += "<td class=\"rtt2\">"+ug.businessType+"</td>";
      theHtml += "<td class=\"rtt3\">"+ug.usersNickNames+"</td>";
      theHtml += "</tr>";
    }
    
    theHtml += "</tbody>";
    
    return theHtml;
  });
  
  // set auth in form
  $("#review-review-auth").val(users);
}
function getReviewApprovalReviewAuthValue() {
  var result = "";
  $(".addrtc").each(function(index) {
    var checked = $(this).prop('checked');
    if (checked) {
      result += $(this).val();
      result += ",";
    }
  });
  return result;
}
function validateReviewApprovalReview4() {
  return true;
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