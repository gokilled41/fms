var approvalPageNo = 1;

$(document).ready(function() {

  // tabs
  $("#add-img-tab a:first").tab("show");
  $("#add-img-tab a").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });

  // prepare list
  prepareSearchDropdownList();
  listApproval();
  enterClickSearch("approval");
  changeClickSearch("approval", "businessType");
  
  // buttons
  $("#list-approval-btn").click(listApproval);
    // 1. detail
    $("#view-approval-detail-availability-btn").click(viewApprovalDetailAvailability);
    $("#view-approval-detail-cancel-btn").click(viewApprovalDetailCancel);
    // 2. availability
    $("#view-approval-availability-submit-btn").click(viewApprovalAvailabilitySubmit);
    $("#view-approval-availability-return-btn").click(viewApprovalAvailabilityReturn);
    $("#view-approval-availability-cancel-btn").click(viewApprovalAvailabilityCancel);
});

// list
function listApproval() {
  var name = $("#search-name").val();
  var businessType = $("#search-businessType").val();
  var status = "文件and已结案-通过";
  var searchPara = "name="+name+"&businessType="+businessType+"&status="+status;
  printApprovalList("#approval-table", approvalPath+"/listApprovalForAuthManage.shtml", searchPara, approvalPageNo, pageSize);
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
    theHtml += "<th width='9%'>申请号</th>";
    theHtml += "<th width='9%'>申请人工号</th>";
    theHtml += "<th width='9%'>申请人姓名</th>";
    theHtml += "<th width='9%'>申请人部门</th>";
    theHtml += "<th width='10%'>业务类型</th>";
    theHtml += "<th width='9%'>文件类型</th>";
    theHtml += "<th width='10%'>名称</th>";
    theHtml += "<th width='5%'>版本号</th>";
    theHtml += "<th width='15%'>更新日期</th>";
    theHtml += "<th width='5%'>状态</th>";
    theHtml += "<th width='10%'>操作</th>";
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
      theHtml += "<td>"+formatTimestamp(r.timestamp)+"</td>";
      theHtml += "<td class='"+getViewStatusClass(r.viewStatus)+"'>"+r.viewStatus+"</td>";
      theHtml += "<td>";
      theHtml += "  <a class=\"btn btn-primary btn-sm\" href=\"javascript:viewApprovalDetail('" + r.id + "', '" + htmlspecialchars(r.name) + "')\"> 设定有效性 </a>";
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

// view
function viewApprovalDetail(id, name) {
  doSetViewApprovalDetail(id, name);
  refreshViewAttachmentList();
  $("#view-approval-detail-modal").modal("show");
}
function viewApprovalDetailAvailability() {
  $("#view-approval-detail-modal").modal("hide");
  $("#view-approval-availability-modal").modal("show");
}
function viewApprovalDetailCancel() {
}
function viewApprovalAvailabilitySubmit() {
  if (validateViewApprovalReviewAvailability()) {
    ajaxSubmitRefresh("#view-availability-form");
    $("#view-approval-availability-modal").modal("hide");
  }
}
function viewApprovalAvailabilityReturn() {
  $("#view-approval-detail-modal").modal("show");
  $("#view-approval-availability-modal").modal("hide");
}
function viewApprovalAvailabilityCancel() {
  viewApprovalDetailCancel();
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
    
    radioCheckbox(".racb");
    checkOnlyByClick("#update-viewStatus", r.viewStatus);
    $("#update-applyId").val(r.applyId);
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
function validateViewApprovalReviewAvailability() {
  return true;
}
function prepareSearchDropdownList() {
  loadSelectionSimple("#search-businessType", {}, configPath+"/getBusinessTypesWithAll.shtml");
}
