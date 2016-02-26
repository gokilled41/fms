<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.zw.fms.model.User"%>
<%@page import="com.zw.fms.utils.SessionUtil"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    User user = SessionUtil.getLoginUser(request);
%>
<script>
  $(document).ready(function() {
    $("#change-admin-user-pw-btn").click(function(e) {
      var oldpassword = $("#oldpassword").val();
      var newPassword = $("#newpassword").val();
      var newPasswordag = $("#newpasswordag").val();
      if (newPassword == "") {
        $("#change-password-hint").text("新密码不能为空");
        $("#change-password-hint").show();
      } else if (newPassword != newPasswordag) {
        $("#change-password-hint").text("两次输入密码不一致");
        $("#change-password-hint").show();
      } else {
        var json = {"password":newPassword,"oldPassword":oldpassword};
        ajaxUtil(json, path+"/changeUserPassword.shtml", function(r) {
          if (r.success == "true") {
            showMsgWithoutRefresh("修改成功！");
            $("#change-user-password-modal").modal("hide");
          } else {
            $("#change-password-hint").text(r.reason);
            $("#change-password-hint").show();
          }
        });
      }
    });
  });
  function logout() {
    if (!confirm("确定要退出系统?")) {
      return ;
    }
    ajaxUtil(null, path+"/logout.shtml", null, null);
    window.location.href = "<%=path%>/admin/login.shtml";
  }
  function popupChangePasswordModal() {
    $("#change-password-hint").hide();
    $("#change-user-password-modal").modal('show');
  }
  function changePassword(e) {
  }
</script>
<div class="navbar navbar-default" role="navigation">

    <div class="navbar-inner">
        <button type="button" class="navbar-toggle pull-left animated flip">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button> 
        <a class="navbar-brand" href="index.html" style="padding: 5px;"> 
          <img alt="文件管理系统" src="" class="hidden-xs"  style="height:50px;width:200px"/>
        </a>

        <!-- user dropdown starts -->
        <div class="btn-group pull-right">
            <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <i class="glyphicon glyphicon-user"></i><span id="header-userName" class="hidden-sm hidden-xs"> <%=user.getUserName() %></span>
                <span id="header-userId" class="hd"><%=user.getId()%></span>
                <span id="header-businessType" class="hd"><%=user.getBusinessType()%></span>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a href="javascript:popupChangePasswordModal()">设置</a></li>
                <li class="divider"></li>
                <li><a href="javascript:logout()">退出系统</a></li>
            </ul>
        </div>
        <!-- user dropdown ends -->

        <!-- theme selector starts -->
        <div class="btn-group pull-right theme-container animated tada">
          <!-- 
            <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <i class="glyphicon glyphicon-tint"></i><span
                    class="hidden-sm hidden-xs"> Change Theme / Skin</span>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" id="themes">
                <li><a data-value="classic"><i class="whitespace"></i> Classic</a></li>
                <li><a data-value="cerulean"><i class="whitespace"></i> Cerulean</a></li>
                <li><a data-value="cyborg"><i class="whitespace"></i> Cyborg</a></li>
                <li><a data-value="simplex"><i class="whitespace"></i> Simplex</a></li>
                <li><a data-value="darkly"><i class="whitespace"></i> Darkly</a></li>
                <li><a data-value="lumen"><i class="whitespace"></i> Lumen</a></li>
                <li><a data-value="slate"><i class="whitespace"></i> Slate</a></li>
                <li><a data-value="spacelab"><i class="whitespace"></i> Spacelab</a></li>
                <li><a data-value="united"><i class="whitespace"></i> United</a></li>
            </ul>
             -->
        </div>
        <!-- theme selector ends -->

        <h3 style="margin-left:40%;color:white"> 文件管理系统</h3>

    </div>
</div>

<!-- modal begin -->
<!-- change password modal  -->
<div class="modal fade" id="change-user-password-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3>修改管理员密码</h3>
            </div>
            <div class="modal-body">
                <div role="form">
                 <div class="form-group">
                     <label for="oldpassword">原密码</label>
                     <input type="password" placeholder="请输入原密码"  id="oldpassword" class="form-control">
                 </div>
                 <div class="form-group">
                     <label for="newpassword">新密码</label>
                     <input type="password" placeholder="请输入新密码" id="newpassword" class="form-control">
                     
                 </div>
                 <div class="form-group">
                     <label for="newpasswordag">再输一次新密码</label>
                     <input type="password" placeholder="请再次输入新密码" id="newpasswordag" class="form-control">
                     
                 </div>
                 <div class="form-group">
                     <label id="change-password-hint" class="cr hd"></label>
                 </div>
             </div>
            </div>
            <div class="modal-footer">
                <a id="change-admin-user-pw-btn" class="btn btn-primary"> 确 定 </a>
                <a href="#" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
            </div>
        </div>
    </div>
</div>
<!-- modal end -->
