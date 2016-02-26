﻿<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title> 三级审批</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="file manage system">
    <meta name="author" content="zgf">
    
    <link rel="shortcut icon" href="<%=path%>/admin/img/favicon.ico">
    
    <link href="<%=path%>/admin/css/bootstrap-cerulean.min.css" rel="stylesheet">
    <link href="<%=path%>/admin/css/charisma-app.css" rel="stylesheet">
    <link href='<%=path%>/admin/bower_components/responsive-tables/responsive-tables.css' rel='stylesheet'>
    <link href='<%=path%>/admin/bower_components/bootstrap/css/datepicker.css' rel='stylesheet'>
    <link href='<%=path%>/admin/bower_components/bootstrap-tour/build/css/bootstrap-tour.min.css' rel='stylesheet'>
    <link href='<%=path%>/admin/css/jquery.noty.css' rel='stylesheet'>
    <link href='<%=path%>/admin/css/noty_theme_default.css' rel='stylesheet'>
    <link href='<%=path%>/admin/css/elfinder.min.css' rel='stylesheet'>
    <link href='<%=path%>/admin/css/elfinder.theme.css' rel='stylesheet'>
    <link href='<%=path%>/admin/css/jquery.iphone.toggle.css' rel='stylesheet'>
    <link href='<%=path%>/admin/css/animate.min.css' rel='stylesheet'>
    <link href='<%=path%>/admin/css/admin.css' rel='stylesheet'>
    <link href='<%=path%>/admin/css/fms.css' rel='stylesheet'>

    <script src='<%=path%>/admin/bower_components/jquery/jquery.min.js'></script>
    <!--<script src='<%=path%>/admin/bower_components/jquery/jquery.js'></script>-->
    <script src="<%=path%>/admin/adminjs/common.js"></script>
    <script src="<%=path%>/admin/adminjs/reviewmanage3.js"></script>
    <script src="<%=path%>/admin/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="<%=path%>/admin/js/jquery.cookie.js"></script>
    <script src='<%=path%>/admin/js/jquery.dataTables.min.js'></script>
    <script src="<%=path%>/admin/bower_components/chosen/chosen.jquery.min.js"></script>
    <script src="<%=path%>/admin/bower_components/colorbox/jquery.colorbox-min.js"></script>
    <script src="<%=path%>/admin/js/jquery.noty.js"></script>
    <script src="<%=path%>/admin/bower_components/responsive-tables/responsive-tables.js"></script>
    <script src="<%=path%>/admin/bower_components/bootstrap-tour/build/js/bootstrap-tour.min.js"></script>
    <script src="<%=path%>/admin/js/jquery.raty.min.js"></script>
    <script src="<%=path%>/admin/js/jquery.iphone.toggle.js"></script>
    <script src="<%=path%>/admin/js/jquery.autogrow-textarea.js"></script>
    <!--<script src="<%=path%>/admin/js/jquery.history.js"></script>-->
    <script src="<%=path%>/admin/js/jquery.form.js"></script>
    <!--<script src="<%=path%>/admin/js/charisma.js"></script>-->

</head>
<body>
    <!-- topbar starts -->
    <jsp:include page="header.jsp" />
    <!-- topbar ends -->
    <div class="ch-container">
        <div class="row">
            <!-- leftmenu starts -->
            <jsp:include page="leftmenu.jsp" />
            <!-- leftmenu ends -->
            <div id="content" class="col-lg-10 col-sm-10">
                <!-- content starts -->
                <!-- breadcrumb starts -->
                <div>
                    <ul class="breadcrumb">
                        <li><a href="<%=path%>/page/admin/index.shtml">管理首页</a></li>
                        <li><a href="<%=path%>/page/admin/reviewmanage3.shtml">三级审批</a></li>
                    </ul>
                </div>
                <!-- breadcrumb end -->

                <!--正文开始-->
                <div class="box-content">
                    <ul class="nav nav-tabs" id="myTab">
                        <li class="active"><a>三级审批</a></li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                        <div class="tab-pane active">
                            <div>&nbsp;</div>
                            <div id="search-panel">
                                <div id="search-approval-form">
                                    <div class="form-group col-md-2 searchbox">
                                        <label for="name" class="control-label">&nbsp;审批状态</label>
                                        <select id="search-status" name="status" title="选择审批状态" class="form-control">
                                            <option value='^预备' selected="selected">全部</option>
                                            <option value='审批中'>审批中</option>
                                            <option value='完成'>完成</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-2 searchbox2">
                                        <label for="name" class="control-label">&nbsp;</label>
                                        <input type="text" id="search-name" name="name" placeholder="搜索审批业务名称或申请人姓名" class="form-control">
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="key" class="control-label">&nbsp;</label>
                                        <a id="list-approval-btn" class="btn btn-primary form-control"> 查找 </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="clear: both;"></div>
                            <hr>
                            <div>
                                <table id="approval-table" class="table table-striped" cellspacing="0" width="100%"></table>
                                <div class="page tac yahei" id="paging_btn"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--正文结束-->
            </div>
        </div>

        <!-- modal starts -->
        <div class="modal fade" id="review-approval-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>1. 审批业务详情</h3>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td width="50%">申请号</td>
                                    <td width="50%" id="review-applyId"></td>
                                </tr>
                                <tr>
                                    <td>申请人工号</td>
                                    <td id="review-employeeNo"></td>
                                </tr>
                                <tr>
                                    <td>申请人姓名</td>
                                    <td id="review-nickName"></td>
                                </tr>
                                <tr>
                                    <td>所在部门</td>
                                    <td id="review-department"></td>
                                </tr>
                                <tr>
                                    <td>业务类型</td>
                                    <td id="review-businessType"></td>
                                </tr>
                                <tr>
                                    <td>文件类型</td>
                                    <td id="review-fileType"></td>
                                </tr>
                                <tr>
                                    <td>评审文件名称</td>
                                    <td id="review-name"></td>
                                </tr>
                                <tr>
                                    <td>文件版本号</td>
                                    <td id="review-version"></td>
                                </tr>
                                <tr>
                                    <td>表单号</td>
                                    <td id="review-formId"></td>
                                </tr>
                                <tr>
                                    <td>备注</td>
                                    <td id="review-description"></td>
                                </tr>
                                <tr>
                                    <td>上传附件</td>
                                    <td>
                                        <div id="review-attachment-list">
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hd">
                                    <td>申请人ID</td>
                                    <td id="review-userId"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="review-approval-note" class="cr hd"></label>
                        <a id="review-approval-review-btn" class="btn btn-primary"> 审 批 </a>
                        <a id="review-approval-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="review-approval-review-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>2. 审批</h3>
                    </div>
                    <div class="modal-body">
                        <form id="review-approval-form" action="<%=path%>/reviewer/reviewer3Submit.shtml" method="post">
                            <div class="form-group hd">
                                <label>ReviewerID</label>
                                <input type="text" placeholder="ReviewerID" id="review-review-id" name="id" class="form-control">
                            </div>
                            <div class="form-group hd">
                                <label>申请号</label>
                                <input type="text" placeholder="申请号" id="review-review-applyId" name="applyId" class="form-control">
                            </div>
                            <div class="form-group hd">
                                <label>Reviewer用户名</label>
                                <input type="text" placeholder="Reviewer用户名" id="review-review-userName" name="userName" class="form-control">
                            </div>
                            <div class="form-group hd">
                                <label>审批角色</label>
                                <input type="text" placeholder="审批角色" id="review-review-approvalRole" name="approvalRole" class="form-control">
                            </div>
                            <div class="form-group hd">
                                <label>Review状态</label>
                                <input type="text" placeholder="Review状态" id="review-review-status" name="status" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>审批意见</label>
                                <textarea placeholder="审批意见" id="review-review-comments" name="comments" class="form-control" rows="10" cols="60"></textarea>
                            </div>
                            <div class="form-group">
                                <label>审批结论</label>
                                <label class="checkbox-inline rabox bd cg">
                                	<input id="review-review-conclusion" name="conclusion" type="checkbox" class="racbleft racb" value="通过">通过
                                </label>
                                <label class="checkbox-inline bd cr">
                                	<input id="review-review-conclusion" name="conclusion" type="checkbox" class="racbright racb" value="不通过">不通过
                                </label>
                            </div>
                            <div class="form-group hd">
                                <label>权限</label>
                                <input type="text" placeholder="权限" id="review-review-auth" name="auth" class="form-control">
                            </div>
                            <div class="form-group hd">
                                <label>需要总经理审批</label>
                                <input type="text" placeholder="需要总经理审批" id="review-review-needreview4" name="needreview4" class="form-control">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <label id="review-approval-review-note" class="cr hd"></label>
                        <a id="review-approval-review-auth-btn" class="btn btn-primary"> 设定权限 </a>
                        <a id="review-approval-review-submit-btn" class="btn btn-primary"> 结 案 </a>
                        <a id="review-approval-review-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="review-approval-review-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="review-approval-auth-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>3. 设定权限</h3>
                    </div>
                    <div class="modal-body">
                        <table id="review-auth-table" class="table">
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="review-approval-auth-note" class="cr hd"></label>
                        <a id="review-approval-auth-review-btn" class="btn btn-primary"> 预 览 </a>
                        <a id="review-approval-auth-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="review-approval-auth-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="review-approval-reviewauth-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>4. 预览权限</h3>
                    </div>
                    <div class="modal-body">
                        <table id="review-reviewauth-table" class="table table-striped">
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="review-approval-reviewauth-note" class="cr hd"></label>
                        <a id="review-approval-reviewauth-review4-btn" class="btn btn-primary"> 提交总经理审批 </a>
                        <a id="review-approval-reviewauth-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="review-approval-reviewauth-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="review-approval-review4-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>5. 提交总经理审批</h3>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td width="30%">提交总经理审批</td>
                                    <td width="70%">
                                        <label class="checkbox-inline rabox bd cg">
                                        	<input id="review4-needreview4" name="needreview4" type="checkbox" class="r4cbleft r4cb" value="需要">需总经理审批
                                        </label>
                                        <label class="checkbox-inline bd cr">
                                        	<input id="review4-needreview4" name="needreview4" type="checkbox" class="r4cbright r4cb" value="不需要">无需总经理审批
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="review-approval-review4-note" class="cr hd"></label>
                        <a id="review-approval-review4-submit-btn" class="btn btn-primary"> 提 交 </a>
                        <a id="review-approval-review4-close-btn" class="btn btn-primary"> 结 案 </a>
                        <a id="review-approval-review4-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="review-approval-review4-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="view-approval-detail-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>审批业务详情</h3>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td width="50%">申请号</td>
                                    <td width="50%" id="view-applyId"></td>
                                </tr>
                                <tr>
                                    <td>申请人工号</td>
                                    <td id="view-employeeNo"></td>
                                </tr>
                                <tr>
                                    <td>申请人姓名</td>
                                    <td id="view-nickName"></td>
                                </tr>
                                <tr>
                                    <td>所在部门</td>
                                    <td id="view-department"></td>
                                </tr>
                                <tr>
                                    <td>业务类型</td>
                                    <td id="view-businessType"></td>
                                </tr>
                                <tr>
                                    <td>文件类型</td>
                                    <td id="view-fileType"></td>
                                </tr>
                                <tr>
                                    <td>评审文件名称</td>
                                    <td id="view-name"></td>
                                </tr>
                                <tr>
                                    <td>文件版本号</td>
                                    <td id="view-version"></td>
                                </tr>
                                <tr>
                                    <td>表单号</td>
                                    <td id="view-formId"></td>
                                </tr>
                                <tr>
                                    <td>备注</td>
                                    <td id="view-description"></td>
                                </tr>
                                <tr>
                                    <td>上传附件</td>
                                    <td>
                                        <div id="view-attachment-list">
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hd">
                                    <td>申请人ID</td>
                                    <td id="view-userId"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="view-approval-detail-note" class="cr hd"></label>
                        <a id="view-approval-detail-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal ends -->

        <!-- footer starts -->
        <jsp:include page="footer.jsp" />
        <!-- footer ends -->
    </div>
</body>
</html>
