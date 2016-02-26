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
  
  // buttons
  $("#list-approval-btn").click(listApproval);
  // add
  $("#add-approval-btn").click(addApproval);
    // step 1: add
    $("#add-approval-review-btn").click(addApprovalReview);
    $("#add-approval-cancel-btn").click(addApprovalCancel);
    // step 2: review
    $("#add-approval-review-auth-btn").click(addApprovalReviewAuth);
    $("#add-approval-review-return-btn").click(addApprovalReviewReturn);
    $("#add-approval-review-cancel-btn").click(addApprovalReviewCancel);
    // step 3: auth
    $("#add-approval-auth-review-btn").click(addApprovalAuthReview);
    $("#add-approval-auth-return-btn").click(addApprovalAuthReturn);
    $("#add-approval-auth-cancel-btn").click(addApprovalAuthCancel);
    // step 4: review auth
    $("#add-approval-reviewauth-submit-btn").click(addApprovalReviewAuthSubmit);
    $("#add-approval-reviewauth-return-btn").click(addApprovalReviewAuthReturn);
    $("#add-approval-reviewauth-cancel-btn").click(addApprovalReviewAuthCancel);
    
    // approval detail
    $("#view-approval-detail-auth-btn").click(viewApprovalDetailAuth);
    $("#view-approval-detail-cancel-btn").click(viewApprovalDetailCancel);
    $("#view-approval-auth-return-btn").click(viewApprovalAuthReturn);
    $("#view-approval-auth-cancel-btn").click(viewApprovalAuthCancel);
});

// list
function listApproval() {
  var name = $("#search-name").val();
  var status = "文件";
  var userId = getHeaderUserId();
  var searchPara = "name="+name+"&status="+status+"&userId="+userId;
  printApprovalList("#approval-table", approvalPath+"/listApprovalForFile.shtml", searchPara, approvalPageNo, pageSize);
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
    theHtml += "<th width='12%'>申请号</th>";
    theHtml += "<th width='10%'>部门</th>";
    theHtml += "<th width='13%'>业务类型</th>";
    theHtml += "<th width='13%'>文件类型</th>";
    theHtml += "<th width='12%'>名称</th>";
    theHtml += "<th width='10%'>版本号</th>";
    theHtml += "<th width='15%'>更新日期</th>";
    theHtml += "<th width='15%'>操作</th>";
    theHtml += "</tr>";
    theHtml += "</thead>";
    var list = response.list;
    theHtml += "<tbody>";
    for (var index in list) {
      var r = list[index];
      theHtml += "<tr>";
      theHtml += "<td>"+r.applyId+"</td>";
      theHtml += "<td>"+r.department+"</td>";
      theHtml += "<td>"+r.businessType+"</td>";
      theHtml += "<td>"+r.fileType+"</td>";
      theHtml += "<td>"+r.name+"</td>";
      theHtml += "<td>"+r.version+"</td>";
      theHtml += "<td>"+formatTimestamp(r.timestamp)+"</td>";
      theHtml += "<td>";
      theHtml += "  <a class=\"btn btn-primary btn-sm\" href=\"javascript:viewApprovalDetail('" + r.id + "', '" + htmlspecialchars(r.name) + "')\"> 审批详情 </a>";
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
function addApprovalReviewAuth() {
  prepareAddAuth();
  $("#add-approval-review-modal").modal("hide");
  $("#add-approval-auth-modal").modal("show");
}
function addApprovalReviewReturn() {
  $("#add-approval-review-modal").modal("hide");
  $("#add-approval-modal").modal("show");
}
function addApprovalReviewCancel() {
  addApprovalCancel();
}
function addApprovalAuthReview() {
  prepareReviewAddAuth();
  $("#add-approval-auth-modal").modal("hide");
  $("#add-approval-reviewauth-modal").modal("show");
}
function addApprovalAuthReturn() {
  $("#add-approval-review-modal").modal("show");
  $("#add-approval-auth-modal").modal("hide");
}
function addApprovalAuthCancel() {
  addApprovalCancel();
}
function addApprovalReviewAuthSubmit() {
  if (validateAddApprovalReviewAuth()) {
    ajaxSubmitRefresh("#add-approval-form");
    $("#add-approval-reviewauth-modal").modal("hide");
  }
  // alert("审批：给四级评审人发邮件，写数据库。");
}
function addApprovalReviewAuthReturn() {
  $("#add-approval-auth-modal").modal("show");
  $("#add-approval-reviewauth-modal").modal("hide");
}
function addApprovalReviewAuthCancel() {
  addApprovalCancel();
}
function prepareAddDropdownList() {
  loadSelectionSimple("#add-businessType", {}, configPath+"/getBusinessTypes.shtml");
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
  $("#add-description").val("这里是文件的描述：\n    1. 第一条描述。\n    2. 第二条描述。\n    3. 第三条描述。");
}
function resetUploadFileForAddApproval() {
  $("#add-up-applyId").val("");
  $("#add-up-name").val("");
  $("#add-up-file").val("");
  $("#add-up-note").hide();
}
function prepareAddAuth() {
  printUtil("#add-auth-table", "", authPath+"/getAllUsers.shtml", function(ugs) {
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
function prepareReviewAddAuth() {
  var users = getReviewApprovalAddAuthValue();
  var dataStr = "users=" + users;
  printUtil("#add-reviewauth-table", dataStr, authPath+"/parseUsers.shtml", function(ugs) {
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
  $("#add-auth").val(users);
}
function getReviewApprovalAddAuthValue() {
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
function validateAddApprovalReviewAuth() {
  return true;
}


// view
function viewApprovalDetail(id, name) {
  doSetViewApprovalDetail(id, name);
  refreshViewAttachmentList();
  $("#view-approval-detail-modal").modal("show");
}
function viewApprovalDetailAuth() {
  doSetViewApprovalDetailAuth();
  $("#view-approval-detail-modal").modal("hide");
  $("#view-approval-auth-modal").modal("show");
}
function viewApprovalDetailCancel() {
}
function viewApprovalAuthReturn() {
  $("#view-approval-auth-modal").modal("hide");
  $("#view-approval-detail-modal").modal("show");
}
function viewApprovalAuthCancel() {
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
function doSetViewApprovalDetailAuth() {
  var applyId = $("#view-applyId").text();
  var dataStr = "applyId=" + applyId;
  printUtil("#view-auth-table", dataStr, authPath+"/getUsers.shtml", function(ugs) {
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

