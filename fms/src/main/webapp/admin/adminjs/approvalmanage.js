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
  // prepare add
  prepareAddDropdownList();
  prepareAddAttachments();
  doSetDefaultAddApproval();
  // prepare update
  prepareUpdateDropdownList();
  prepareUpdateAttachments();
  
  // buttons
  $("#list-approval-btn").click(listApproval);
  // add
  $("#add-approval-btn").click(addApproval);
    // step 1: add
    $("#add-approval-review-btn").click(addApprovalReview);
    $("#add-approval-cancel-btn").click(addApprovalCancel);
    // step 2: review
    $("#add-approval-review-selectreviewer-btn").click(addApprovalReviewSelectReviewer);
    $("#add-approval-review-return-btn").click(addApprovalReviewReturn);
    $("#add-approval-review-cancel-btn").click(addApprovalReviewCancel);
    // step 3: selectreviewer
    $("#add-approval-selectreviewer-review-btn").click(addApprovalSelectReviewerReview);
    $("#add-approval-selectreviewer-return-btn").click(addApprovalSelectReviewerReturn);
    $("#add-approval-selectreviewer-cancel-btn").click(addApprovalSelectReviewerCancel);
    // step 4: reviewreviewer
    $("#add-approval-reviewreviewer-submit-btn").click(addApprovalReviewReviewerSubmit);
    $("#add-approval-reviewreviewer-return-btn").click(addApprovalReviewReviewerReturn);
    $("#add-approval-reviewreviewer-cancel-btn").click(addApprovalReviewReviewerCancel);
  // update
    // step 1: update
    $("#update-approval-review-btn").click(updateApprovalReview);
    $("#update-approval-cancel-btn").click(updateApprovalCancel);
    // step 2: review
    $("#update-approval-review-selectreviewer-btn").click(updateApprovalReviewSelectReviewer);
    $("#update-approval-review-return-btn").click(updateApprovalReviewReturn);
    $("#update-approval-review-cancel-btn").click(updateApprovalReviewCancel);
    // step 3: selectreviewer
    $("#update-approval-selectreviewer-review-btn").click(updateApprovalSelectReviewerReview);
    $("#update-approval-selectreviewer-return-btn").click(updateApprovalSelectReviewerReturn);
    $("#update-approval-selectreviewer-cancel-btn").click(updateApprovalSelectReviewerCancel);
    // step 4: reviewreviewer
    $("#update-approval-reviewreviewer-submit-btn").click(updateApprovalReviewReviewerSubmit);
    $("#update-approval-reviewreviewer-return-btn").click(updateApprovalReviewReviewerReturn);
    $("#update-approval-reviewreviewer-cancel-btn").click(updateApprovalReviewReviewerCancel);
    
    // approval detail
    $("#view-approval-detail-status-btn").click(viewApprovalDetailStatus);
    $("#view-approval-detail-cancel-btn").click(viewApprovalDetailCancel);
    $("#view-approval-status-return-btn").click(viewApprovalStatusReturn);
    $("#view-approval-status-cancel-btn").click(viewApprovalStatusCancel);
});

// list
function listApproval() {
  var name = $("#search-name").val();
  var status = $("#search-status").val();
  var userId = getHeaderUserId();
  var searchPara = "name="+name+"&status="+status+"&userId="+userId;
  printApprovalList("#approval-table", approvalPath+"/listApproval.shtml", searchPara, approvalPageNo, pageSize);
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
    theHtml += "<th width='10%'>申请号</th>";
    theHtml += "<th width='10%'>部门</th>";
    theHtml += "<th width='15%'>日期</th>";
    theHtml += "<th width='10%'>业务类型</th>";
    theHtml += "<th width='10%'>文件类型</th>";
    theHtml += "<th width='10%'>名称</th>";
    theHtml += "<th width='10%'>版本号</th>";
    theHtml += "<th width='10%'>状态</th>";
    theHtml += "<th width='15%'>操作</th>";
    theHtml += "</tr>";
    theHtml += "</thead>";
    var list = response.list;
    theHtml += "<tbody>";
    for (var index in list) {
      var r = list[index];
      var needConfirm = (r.status == "草稿");
      theHtml += "<tr>";
      theHtml += "<td>"+r.applyId+"</td>";
      theHtml += "<td>"+r.department+"</td>";
      theHtml += "<td>"+formatTimestamp(r.timestamp)+"</td>";
      theHtml += "<td>"+r.businessType+"</td>";
      theHtml += "<td>"+r.fileType+"</td>";
      theHtml += "<td>"+r.name+"</td>";
      theHtml += "<td>"+r.version+"</td>";
      theHtml += "<td>"+r.status+"</td>";
      theHtml += "<td>";
      if (needConfirm) {
        theHtml += "  <a class=\"btn btn-primary btn-sm\" href=\"javascript:updateApproval('" + r.id + "', '" + htmlspecialchars(r.name) + "')\"> 编辑 </a>";
        theHtml += "  <a class=\"btn btn-danger btn-sm\"  href=\"javascript:deleteApproval('" + r.id + "', '" + htmlspecialchars(r.name) + "')\"> 删除 </a>";
        theHtml += "  <a class=\"btn btn-primary btn-sm\" href=\"javascript:confirmApproval('" + r.id + "', '" + htmlspecialchars(r.name) + "')\"> 提交 </a>";
      } else {
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

// add
function addApproval() {
  prepareAddApproval();
  doSetDefaultAddApproval();
  resetUploadFileForAddApproval();
  nextApplyIdForAddApproval();
  refreshAddAttachmentList();
  $("#add-approval-modal").modal("show");
}
function addApprovalReview() {
  doSetAddApprovalReview();
  refreshAddAttachmentListInReview();
  $("#add-approval-modal").modal("hide");
  $("#add-approval-review-modal").modal("show");
}
function addApprovalCancel() {
  removeAddUploadedAttachments();
  refreshAddAttachmentList();
}
function addApprovalReviewSelectReviewer() {
  prepareAddSelectReviewers();
  $("#add-approval-review-modal").modal("hide");
  $("#add-approval-selectreviewer-modal").modal("show");
}
function addApprovalReviewReturn() {
  $("#add-approval-review-modal").modal("hide");
  $("#add-approval-modal").modal("show");
}
function addApprovalReviewCancel() {
  addApprovalCancel();
}
function addApprovalSelectReviewerReview() {
  prepareAddReviewReviewers();
  $("#add-approval-selectreviewer-modal").modal("hide");
  $("#add-approval-reviewreviewer-modal").modal("show");
}
function addApprovalSelectReviewerReturn() {
  $("#add-approval-review-modal").modal("show");
  $("#add-approval-selectreviewer-modal").modal("hide");
}
function addApprovalSelectReviewerCancel() {
  addApprovalCancel();
}
function addApprovalReviewReviewerValue() {
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
function addApprovalReviewReviewerSubmit() {
  if (validateAddApproval()) {
    ajaxSubmitRefresh("#add-approval-form");
    $("#add-approval-reviewreviewer-modal").modal("hide");
  }
  // alert("发起评审：给一级评审人发邮件，写数据库。");
}
function addApprovalReviewReviewerReturn() {
  $("#add-approval-reviewreviewer-modal").modal("hide");
  $("#add-approval-selectreviewer-modal").modal("show");
}
function addApprovalReviewReviewerCancel() {
  addApprovalCancel();
}
function prepareAddDropdownList() {
  loadSelectionSimple("#add-businessType", {}, configPath+"/getBusinessTypes.shtml");
}
function prepareAddSelectReviewers() {
  printUtil("#add-selectreviewer-table", "", reviewerPath+"/getAllReviewers.shtml", function(rgs) {
    var theHtml = "";
    
    theHtml += "<tbody>";
    theHtml += "<tr class=\"rtt1 rttitle\">";
    theHtml += "    <td colspan=\"2\">一级审批人</td>";
    theHtml += "</tr>";
    
    var rgl1 = rgs.reviewerGroups1;
    for (var i in rgl1) {
      var rg = rgl1[i];
      var rgrl = rg.reviewers;
      theHtml += "<tr class=\"rtl1 rtline\">";
      theHtml += "    <td class=\"rtleft\">";
      theHtml += "      <label class=\"checkbox-inline\">";
      theHtml += "        <input class=\"rtcbleft\" type=\"checkbox\">"+rg.businessType+"";
      theHtml += "      </label>";
      theHtml += "    </td>";
      theHtml += "    <td class=\"rtright\">";
      for (var j in rgrl) {
        var rgr = rgrl[j];
        theHtml += "    <label class=\"checkbox-inline\">";
        theHtml += "      <input type=\"checkbox\" value=\"一级审批人;"+rg.businessType+";"+rgr.userName+";"+rgr.nickName+"\" class=\"addrtc\">" + rgr.nickName;
        theHtml += "    </label>";
      }
      theHtml += "    </td>";
      theHtml += "</tr>";
    }

    theHtml += "<tr class=\"rtt2 rttitle\">";
    theHtml += "    <td colspan=\"2\">二级审批人</td>";
    theHtml += "</tr>";

    var rgl2 = rgs.reviewerGroups2;
    for (var i in rgl2) {
      var rg = rgl2[i];
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
        theHtml += "      <input type=\"checkbox\" value=\"二级审批人;"+rg.businessType+";"+rgr.userName+";"+rgr.nickName+"\" class=\"addrtc reviewer2rtc\">" + rgr.nickName;
        theHtml += "    </label>";
      }
      theHtml += "    </td>";
      theHtml += "</tr>";
    }
    
    theHtml += "<tr class=\"rtt3 rttitle\">";
    theHtml += "    <td colspan=\"2\">三级审批人</td>";
    theHtml += "</tr>";
    
    var rl3 = rgs.reviewers3;
    theHtml += "<tr class=\"rtl3 rtline\">";
    theHtml += "  <td colspan=\"2\">";
    for (var i in rl3) {
      var rgr = rl3[i];
      theHtml += "  <label class=\"checkbox-inline\">";
      theHtml += "    <input type=\"checkbox\" value=\"三级审批人;"+rgr.userName+";"+rgr.nickName+"\" class=\"addrtc\">" + rgr.nickName;
      theHtml += "  </label>";
    }
    theHtml += "  </td>";
    theHtml += "</tr>";
    
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
  
  // can and only can check one reviewer 2
  radioCheckbox(".reviewer2rtc");
}
function prepareAddReviewReviewers() {
  var reviewers = addApprovalReviewReviewerValue();
  var dataStr = "reviewers=" + reviewers;
  printUtil("#add-reviewreviewer-table", dataStr, reviewerPath+"/parseReviewers.shtml", function(rgs) {
    var theHtml = "";
    
    theHtml += "<tbody>";
    
    var rgl1 = rgs.reviewerGroups1;
    for (var i in rgl1) {
      var rg = rgl1[i];
      theHtml += "<tr>";
      if (i == 0) {
        theHtml += "<td class=\"rtt1\" rowspan=\""+rgl1.length+"\">一级审批人</td>";
      }
      theHtml += "<td class=\"rtt2\">"+rg.businessType+"</td>";
      theHtml += "<td class=\"rtt3\">"+rg.reviewersNickNames+"</td>";
      theHtml += "</tr>";
    }

    var rgl2 = rgs.reviewerGroups2;
    for (var i in rgl2) {
      var rg = rgl2[i];
      theHtml += "<tr>";
      if (i == 0) {
        theHtml += "<td class=\"rtt1\" rowspan=\""+rgl2.length+"\">二级审批人</td>";
      }
      theHtml += "<td class=\"rtt2\">"+rg.businessType+"</td>";
      theHtml += "<td class=\"rtt3\">"+rg.reviewersNickNames+"</td>";
      theHtml += "</tr>";
    }
    
    theHtml += "<tr>";
    theHtml += "<td class=\"rtt1\">三级审批人</td>";
    theHtml += "<td class=\"rtt2\"></td>";
    theHtml += "<td class=\"rtt3\">"+rgs.reviewers3NickNames+"</td>";
    theHtml += "</tr>";
    
    theHtml += "</tbody>";
    
    return theHtml;
  });
  
  // set add-reviewers in form
  $("#add-reviewers").val(reviewers);
}
function prepareAddAttachments() {
  $("#add-up-submit").hover(function() {
    $(this).css("background-color", "darkgreen");
    $(this).css("color", "white");
    $(this).css("cursor", "pointer");
  }, function() {
    $(this).css("background-color", "white");
    $(this).css("color", "green");
  });
  
  $("#add-up-file").hover(function() {
    $("#add-up-browse").css("background-color", "darkgreen");
    $("#add-up-browse").css("color", "white");
    $("#add-up-browse").css("cursor", "pointer");
  }, function() {
    $("#add-up-browse").css("background-color", "white");
    $("#add-up-browse").css("color", "green");
  });
  
  $("#add-up-file").change(function() {
    $("#add-up-name").val(getUploadFileName($(this).val()));
    $("#add-up-note").text("");
    $("#add-up-note").hide();
  });
  $("#add-up-submit").click(function() {
    var file = $("#add-up-file").val();
    if (file == "") {
      $("#add-up-note").text("请先点击“浏览...”选择要上传的文件");
      $("#add-up-note").show();
    } else {
      $("#add-up-applyId").val($("#add-applyId").val());
      ajaxSubmitWithFunc("#add-upload-form", function(r) {
        if (r.success == "true") {
          resetUploadFileForAddApproval();
          refreshAddAttachmentList();
        } else {
          $("#add-up-note").text(r.reason);
          $("#add-up-note").show();
        }
      });
    }
  });
}
function refreshAddAttachmentList() {
  var applyId = $("#add-applyId").val();
  var category = "submitter";
  var dataStr = "applyId="+applyId + "&category=" + category;
  printUtil("#add-attachment-list", dataStr, filePath+"/listFiles.shtml", function(response) {
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
    var applyId = $("#add-applyId").val();
    var fileName = $(this).prev().text();
    ajaxUtil({"applyId":applyId,"fileName":fileName}, filePath+"/deleteFile.shtml", function(r) {
        refreshAddAttachmentList();
      }
    );
  });
}
function refreshAddAttachmentListInReview() {
  var applyId = $("#review-add-applyId").text();
  var category = "submitter";
  var dataStr = "applyId="+applyId + "&category=" + category;
  printUtil("#review-add-attachment-list", dataStr, filePath+"/listFiles.shtml", function(response) {
    var theHtml = "";
    var list = response.list;
    var floatside;
    for (var index in list) {
      var r = list[index];
      theHtml += "<div class=\"att\">";
      theHtml += "  <img src=\""+getUploadFileIcon(r.type)+"\" />";
      theHtml += "  <span class=\"s1\">"+r.fileName+"</span>";
      theHtml += "  <br>";
      theHtml += "  <span class=\"s2\">"+r.size+"</span>";
      theHtml += "</div>";
    }
    return theHtml;
  });
}
function removeAddUploadedAttachments() {
  var applyId = $("#add-applyId").val();
  var status = "临时";
  var category = "submitter";
  ajaxUtil({"applyId":applyId,"category":category,"status":status}, filePath+"/deleteFiles.shtml", function(r) {
    }
  );
}
function nextApplyIdForAddApproval() {
  ajaxUtil({}, approvalPath+"/nextApplyId.shtml", function(r) {
      $("#add-applyId").val(r.next);
    }
  );
}
function validateAddApproval() {
  /*
  var name = $("#add-name").val();
  var starts = $("#add-starts").val();
  var ends = $("#add-ends").val();
  var participants = $("#add-participants").val();
  var r;
  ajaxUtil({"name":name,"starts":starts,"ends":ends,"participants":participants,"type":"add"}, 
    approvalPath+"/validateApproval.shtml", function(response) { r = response;}
  );
  if (r.success == "false") {
    $("#add-approval-note").text(r.reason);
    $("#add-approval-note").show();
    return false;
  } else {
    $("#add-approval-note").hide();
    return true;
  }
  */
  return true;
}
function prepareAddApproval() {
  ajaxUtil({}, userPath+"/getCurrentUser.shtml", function(r) {
      $("#add-userId").val(r.id);
      $("#add-employeeNo").val(r.employeeNo);
      $("#add-nickName").val(r.nickName);
      $("#add-department").val(r.department);
      readOnly("#add-applyId");
      readOnly("#add-userId");
      readOnly("#add-employeeNo");
      readOnly("#add-nickName");
      readOnly("#add-department");
    }
  );
}
function doSetDefaultAddApproval() {
  $("#add-applyId").val("AS201600001");
  $("#add-businessType").val("销售管理");
  $("#add-fileType").val("作业指导书");
  $("#add-name").val("销售作业指导书");
  $("#add-version").val("v1.0");
  $("#add-formId").val("BD000001");
  $("#add-description").val("这里是审批业务的描述：\n    1. 第一条描述。\n    2. 第二条描述。\n    3. 第三条描述。");
}
function resetUploadFileForAddApproval() {
  $("#add-up-applyId").val("");
  $("#add-up-name").val("");
  $("#add-up-file").val("");
  $("#add-up-note").hide();
}
function doSetAddApprovalReview() {
  $("#review-add-applyId").text($("#add-applyId").val());
  $("#review-add-userId").text($("#add-userId").val());
  $("#review-add-employeeNo").text($("#add-employeeNo").val());
  $("#review-add-nickName").text($("#add-nickName").val());
  $("#review-add-department").text($("#add-department").val());
  $("#review-add-businessType").text($("#add-businessType").val());
  $("#review-add-fileType").text($("#add-fileType").val());
  $("#review-add-name").text($("#add-name").val());
  $("#review-add-version").text($("#add-version").val());
  $("#review-add-formId").text($("#add-formId").val());
  $("#review-add-description").html(formatHtml($("#add-description").val()));
}

// update
function updateApproval(id, name) {
  prepareUpdateApproval(id, name);
  doSetDefaultUpdateApproval(id, name);
  resetUploadFileForUpdateApproval();
  // nextApplyIdForUpdateApproval();
  refreshUpdateAttachmentList();
  $("#update-approval-modal").modal("show");
}
function updateApprovalReview() {
  doSetUpdateApprovalReview();
  refreshUpdateAttachmentListInReview();
  $("#update-approval-modal").modal("hide");
  $("#update-approval-review-modal").modal("show");
}
function updateApprovalCancel() {
  removeUpdateUploadedAttachments();
  refreshUpdateAttachmentList();
}
function updateApprovalReviewSelectReviewer() {
  prepareUpdateSelectReviewers();
  $("#update-approval-review-modal").modal("hide");
  $("#update-approval-selectreviewer-modal").modal("show");
}
function updateApprovalReviewReturn() {
  $("#update-approval-review-modal").modal("hide");
  $("#update-approval-modal").modal("show");
}
function updateApprovalReviewCancel() {
  updateApprovalCancel();
}
function updateApprovalSelectReviewerReview() {
  prepareUpdateReviewReviewers();
  $("#update-approval-selectreviewer-modal").modal("hide");
  $("#update-approval-reviewreviewer-modal").modal("show");
}
function updateApprovalSelectReviewerReturn() {
  $("#update-approval-review-modal").modal("show");
  $("#update-approval-selectreviewer-modal").modal("hide");
}
function updateApprovalSelectReviewerCancel() {
  updateApprovalCancel();
}
function updateApprovalReviewReviewerValue() {
  var result = "";
  $(".updatertc").each(function(index) {
    var checked = $(this).prop('checked');
    if (checked) {
      result += $(this).val();
      result += ",";
    }
  });
  return result;
}
function updateApprovalReviewReviewerSubmit() {
  if (validateUpdateApproval()) {
    ajaxSubmitRefresh("#update-approval-form");
    $("#update-approval-reviewreviewer-modal").modal("hide");
  }
  // alert("发起评审：给一级评审人发邮件，写数据库。");
}
function updateApprovalReviewReviewerReturn() {
  $("#update-approval-reviewreviewer-modal").modal("hide");
  $("#update-approval-selectreviewer-modal").modal("show");
}
function updateApprovalReviewReviewerCancel() {
  updateApprovalCancel();
}
function prepareUpdateDropdownList() {
  loadSelectionSimple("#update-businessType", {}, configPath+"/getBusinessTypes.shtml");
}
function prepareUpdateSelectReviewers() {
  var applyId = $("#update-applyId").val();
  var dataStr = "applyId="+applyId;
  printUtil("#update-selectreviewer-table", dataStr, reviewerPath+"/getReviewers.shtml", function(rgs) {
    var theHtml = "";
    
    theHtml += "<tbody>";
    theHtml += "<tr class=\"rtt1 rttitle\">";
    theHtml += "    <td colspan=\"2\">一级审批人</td>";
    theHtml += "</tr>";
    
    var rgl1 = rgs.reviewerGroups1;
    for (var i in rgl1) {
      var rg = rgl1[i];
      var rgrl = rg.reviewers;
      theHtml += "<tr class=\"rtl1 rtline\">";
      theHtml += "    <td class=\"rtleft\">";
      theHtml += "      <label class=\"checkbox-inline\">";
      theHtml += "        <input class=\"rtcbleft\" type=\"checkbox\">"+rg.businessType+"";
      theHtml += "      </label>";
      theHtml += "    </td>";
      theHtml += "    <td class=\"rtright\">";
      for (var j in rgrl) {
        var rgr = rgrl[j];
        theHtml += "    <label class=\"checkbox-inline\">";
        theHtml += "      <input type=\"checkbox\" value=\"一级审批人;"+rg.businessType+";"+rgr.userName+";"+rgr.nickName+"\" class=\"updatertc\""+(rgr.checked?" checked=\"true\"":"")+">" + rgr.nickName;
        theHtml += "    </label>";
      }
      theHtml += "    </td>";
      theHtml += "</tr>";
    }

    theHtml += "<tr class=\"rtt2 rttitle\">";
    theHtml += "    <td colspan=\"2\">二级审批人</td>";
    theHtml += "</tr>";

    var rgl2 = rgs.reviewerGroups2;
    for (var i in rgl2) {
      var rg = rgl2[i];
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
        theHtml += "      <input type=\"checkbox\" value=\"二级审批人;"+rg.businessType+";"+rgr.userName+";"+rgr.nickName+"\" class=\"updatertc reviewer2rtc\""+(rgr.checked?" checked=\"true\"":"")+">" + rgr.nickName;
        theHtml += "    </label>";
      }
      theHtml += "    </td>";
      theHtml += "</tr>";
    }
    
    theHtml += "<tr class=\"rtt3 rttitle\">";
    theHtml += "    <td colspan=\"2\">三级审批人</td>";
    theHtml += "</tr>";
    
    var rl3 = rgs.reviewers3;
    theHtml += "<tr class=\"rtl3 rtline\">";
    theHtml += "  <td colspan=\"2\">";
    for (var i in rl3) {
      var rgr = rl3[i];
      theHtml += "  <label class=\"checkbox-inline\">";
      theHtml += "    <input type=\"checkbox\" value=\"三级审批人;"+rgr.userName+";"+rgr.nickName+"\" class=\"updatertc\""+(rgr.checked?" checked=\"true\"":"")+">" + rgr.nickName;
      theHtml += "  </label>";
    }
    theHtml += "  </td>";
    theHtml += "</tr>";
    
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
  
  // can and only can check one reviewer 2
  radioCheckbox(".reviewer2rtc");
}
function prepareUpdateReviewReviewers() {
  var reviewers = updateApprovalReviewReviewerValue();
  var dataStr = "reviewers=" + reviewers;
  printUtil("#update-reviewreviewer-table", dataStr, reviewerPath+"/parseReviewers.shtml", function(rgs) {
    var theHtml = "";
    
    theHtml += "<tbody>";
    
    var rgl1 = rgs.reviewerGroups1;
    for (var i in rgl1) {
      var rg = rgl1[i];
      theHtml += "<tr>";
      if (i == 0) {
        theHtml += "<td class=\"rtt1\" rowspan=\""+rgl1.length+"\">一级审批人</td>";
      }
      theHtml += "<td class=\"rtt2\">"+rg.businessType+"</td>";
      theHtml += "<td class=\"rtt3\">"+rg.reviewersNickNames+"</td>";
      theHtml += "</tr>";
    }

    var rgl2 = rgs.reviewerGroups2;
    for (var i in rgl2) {
      var rg = rgl2[i];
      theHtml += "<tr>";
      if (i == 0) {
        theHtml += "<td class=\"rtt1\" rowspan=\""+rgl2.length+"\">二级审批人</td>";
      }
      theHtml += "<td class=\"rtt2\">"+rg.businessType+"</td>";
      theHtml += "<td class=\"rtt3\">"+rg.reviewersNickNames+"</td>";
      theHtml += "</tr>";
    }
    
    theHtml += "<tr>";
    theHtml += "<td class=\"rtt1\">三级审批人</td>";
    theHtml += "<td class=\"rtt2\"></td>";
    theHtml += "<td class=\"rtt3\">"+rgs.reviewers3NickNames+"</td>";
    theHtml += "</tr>";
    
    theHtml += "</tbody>";
    
    return theHtml;
  });
  
  // set update-reviewers in form
  $("#update-reviewers").val(reviewers);
}
function prepareUpdateAttachments() {
  $("#update-up-submit").hover(function() {
    $(this).css("background-color", "darkgreen");
    $(this).css("color", "white");
    $(this).css("cursor", "pointer");
  }, function() {
    $(this).css("background-color", "white");
    $(this).css("color", "green");
  });
  
  $("#update-up-file").hover(function() {
    $("#update-up-browse").css("background-color", "darkgreen");
    $("#update-up-browse").css("color", "white");
    $("#update-up-browse").css("cursor", "pointer");
  }, function() {
    $("#update-up-browse").css("background-color", "white");
    $("#update-up-browse").css("color", "green");
  });
  
  $("#update-up-file").change(function() {
    $("#update-up-name").val(getUploadFileName($(this).val()));
    $("#update-up-note").text("");
    $("#update-up-note").hide();
  });
  $("#update-up-submit").click(function() {
    var file = $("#update-up-file").val();
    if (file == "") {
      $("#update-up-note").text("请先点击“浏览...”选择要上传的文件");
      $("#update-up-note").show();
    } else {
      $("#update-up-applyId").val($("#update-applyId").val());
      ajaxSubmitWithFunc("#update-upload-form", function(r) {
        if (r.success == "true") {
          resetUploadFileForUpdateApproval();
          refreshUpdateAttachmentList();
        } else {
          $("#update-up-note").text(r.reason);
          $("#update-up-note").show();
        }
      });
    }
  });
}
function refreshUpdateAttachmentList() {
  var applyId = $("#update-applyId").val();
  var category = "submitter";
  var dataStr = "applyId="+applyId + "&category=" + category;
  printUtil("#update-attachment-list", dataStr, filePath+"/listFiles.shtml", function(response) {
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
    var applyId = $("#update-applyId").val();
    var fileName = $(this).prev().text();
    ajaxUtil({"applyId":applyId,"fileName":fileName}, filePath+"/deleteFile.shtml", function(r) {
        refreshUpdateAttachmentList();
      }
    );
  });
}
function refreshUpdateAttachmentListInReview() {
  var applyId = $("#review-update-applyId").text();
  var category = "submitter";
  var dataStr = "applyId="+applyId + "&category=" + category;
  printUtil("#review-update-attachment-list", dataStr, filePath+"/listFiles.shtml", function(response) {
    var theHtml = "";
    var list = response.list;
    var floatside;
    for (var index in list) {
      var r = list[index];
      theHtml += "<div class=\"att\">";
      theHtml += "  <img src=\""+getUploadFileIcon(r.type)+"\" />";
      theHtml += "  <span class=\"s1\">"+r.fileName+"</span>";
      theHtml += "  <br>";
      theHtml += "  <span class=\"s2\">"+r.size+"</span>";
      theHtml += "</div>";
    }
    return theHtml;
  });
}
function removeUpdateUploadedAttachments() {
  var applyId = $("#update-applyId").val();
  ajaxUtil({"applyId":applyId}, filePath+"/cancelUploadedFiles.shtml", function(r) {
    }
  );
}
function nextApplyIdForUpdateApproval() {
  ajaxUtil({}, approvalPath+"/nextApplyId.shtml", function(r) {
      $("#update-applyId").val(r.next);
    }
  );
}
function validateUpdateApproval() {
  /*
  var name = $("#update-name").val();
  var starts = $("#update-starts").val();
  var ends = $("#update-ends").val();
  var participants = $("#update-participants").val();
  var r;
  ajaxUtil({"name":name,"starts":starts,"ends":ends,"participants":participants,"type":"update"}, 
    approvalPath+"/validateApproval.shtml", function(response) { r = response;}
  );
  if (r.success == "false") {
    $("#update-approval-note").text(r.reason);
    $("#update-approval-note").show();
    return false;
  } else {
    $("#update-approval-note").hide();
    return true;
  }
  */
  return true;
}
function prepareUpdateApproval(id, name) {
  ajaxUtil({}, userPath+"/getCurrentUser.shtml", function(r) {
      $("#update-userId").val(r.id);
      $("#update-employeeNo").val(r.employeeNo);
      $("#update-nickName").val(r.nickName);
      $("#update-department").val(r.department);
      readOnly("#update-applyId");
      readOnly("#update-userId");
      readOnly("#update-employeeNo");
      readOnly("#update-nickName");
      readOnly("#update-department");
    }
  );
}
function doSetDefaultUpdateApproval(id, name) {
  ajaxUtil({"id":id}, approvalPath+"/getApproval.shtml", function(response) {
    var r = response;
    $("#update-id").val(r.id);
    $("#update-applyId").val(r.applyId);
    $("#update-businessType").val(r.businessType);
    $("#update-fileType").val(r.fileType);
    $("#update-name").val(r.name);
    $("#update-version").val(r.version);
    $("#update-formId").val(r.formId);
    $("#update-description").val(r.description);
  });
}
function resetUploadFileForUpdateApproval() {
  $("#update-up-applyId").val("");
  $("#update-up-name").val("");
  $("#update-up-file").val("");
  $("#update-up-note").hide();
}
function doSetUpdateApprovalReview() {
  $("#review-update-applyId").text($("#update-applyId").val());
  $("#review-update-userId").text($("#update-userId").val());
  $("#review-update-employeeNo").text($("#update-employeeNo").val());
  $("#review-update-nickName").text($("#update-nickName").val());
  $("#review-update-department").text($("#update-department").val());
  $("#review-update-businessType").text($("#update-businessType").val());
  $("#review-update-fileType").text($("#update-fileType").val());
  $("#review-update-name").text($("#update-name").val());
  $("#review-update-version").text($("#update-version").val());
  $("#review-update-formId").text($("#update-formId").val());
  $("#review-update-description").html(formatHtml($("#update-description").val()));
}

// delete
function deleteApproval(id, name) {
  if(!confirm("您确定要删除 “"+name+"”？")) {
    return;
  }
  ajaxUtil({"id" : id}, approvalPath+"/deleteApproval.shtml", function() {
    showMsg("删除成功");
  }, function() {
    showMsg("删除失败");
  });
}

// confirm
function confirmApproval(id, name) {
  if(!confirm("您确定要提交审批 “"+name+"”？")) {
    return;
  }
  ajaxUtil({"id" : id}, approvalPath+"/confirmApproval.shtml", function() {
    showMsg("提交审批成功");
  }, function() {
    showMsg("提交审批失败");
  });
}

// view
function viewApprovalDetail(id, name) {
  doSetViewApprovalDetail(id, name);
  refreshViewAttachmentList();
  $("#view-approval-detail-modal").modal("show");
}
function viewApprovalDetailStatus() {
  doSetViewApprovalDetailStatus();
  $("#view-approval-detail-modal").modal("hide");
  $("#view-approval-status-modal").modal("show");
}
function viewApprovalDetailCancel() {
}
function viewApprovalStatusReturn() {
  $("#view-approval-status-modal").modal("hide");
  $("#view-approval-detail-modal").modal("show");
}
function viewApprovalStatusCancel() {
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
function doSetViewApprovalDetailStatus() {
  var applyId = $("#view-applyId").text();
  var dataStr = "applyId=" + applyId;
  printUtil("#view-status-table", dataStr, reviewerPath+"/listReviewersForView.shtml", function(response) {
    var theHtml = "";
    theHtml += "<tbody>";
    
    theHtml += "<thead>";
    theHtml += "<th width='15%'>审批角色</th>";
    theHtml += "<th width='15%'>业务类型</th>";
    theHtml += "<th width='15%'>审批人</th>";
    theHtml += "<th width='10%'>结论</th>";
    theHtml += "<th width='45%'>审批意见</th>";
    theHtml += "</thead>";
    
    var list = response.list;
    for (var i in list) {
      var r = list[i];
      theHtml += "<tr>";
      theHtml += "<td>"+r.approvalRole+"</td>";
      theHtml += "<td>"+r.reviewerBusinessType+"</td>";
      theHtml += "<td>"+r.reviewerNickName+"</td>";
      theHtml += "<td class='"+getConclusionClass(r.conclusion)+"'>"+formatHtml(r.conclusion)+"</td>";
      theHtml += "<td>"+formatHtml(r.comments)+"</td>";
      theHtml += "</tr>";
    }
    
    theHtml += "</tbody>";
    return theHtml;
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
