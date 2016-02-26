<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title> 审批业务管理</title>
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
    <script src="<%=path%>/admin/adminjs/approvalmanage.js"></script>
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
                        <li><a href="<%=path%>/page/admin/approvalmanage.shtml">审批业务管理</a></li>
                    </ul>
                </div>
                <!-- breadcrumb end -->

                <!--正文开始-->
                <div class="box-content">
                    <div style="float:right;margin-right:30px">
                        <a id="add-approval-btn"  class="btn btn-success"><i class="glyphicon glyphicon-zoom-in icon-white"></i> 创建审批业务</a>
                    </div>
                    <ul class="nav nav-tabs" id="myTab">
                        <li class="active"><a>审批业务管理</a></li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                        <div class="tab-pane active">
                            <div>&nbsp;</div>
                            <div id="search-panel">
                                <div id="search-approval-form">
                                    <div class="form-group col-md-2 searchbox">
                                        <label for="name" class="control-label">&nbsp;我的审批进度</label>
                                        <select id="search-status" name="status" title="选择业务状态" class="form-control">
                                            <option value='^文件' selected="selected">全部</option>
                                            <option value='草稿'>草稿</option>
                                            <option value='审批中'>审批中</option>
                                            <option value='已结案-通过'>已结案-通过</option>
                                            <option value='已结案-未通过'>已结案-未通过</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-2 searchbox">
                                        <label for="name" class="control-label">&nbsp;</label>
                                        <input type="text" id="search-name" name="name" placeholder="搜索审批业务名称" class="form-control">
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
        <div class="modal fade" id="add-approval-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>1. 添加审批业务</h3>
                    </div>
                    <div class="modal-body">
                        <form id="add-approval-form" action="<%=path%>/approval/addApproval.shtml" method="post">
                            <div class="form-group hide">
                                <label>申请人ID</label>
                                <input type="text" placeholder="申请人ID" id="add-userId" name="userId" class="form-control">
                            </div>
                            <div class="form-group col-md-3">
                                <label>申请号</label>
                                <input type="text" placeholder="申请号" id="add-applyId" name="applyId" class="form-control">
                            </div>
                            <div class="form-group col-md-3">
                                <label>申请人工号</label>
                                <input type="text" placeholder="申请人工号" id="add-employeeNo" name="employeeNo" class="form-control">
                            </div>
                            <div class="form-group col-md-3">
                                <label>申请人姓名</label>
                                <input type="text" placeholder="申请人姓名" id="add-nickName" name="nickName" class="form-control">
                            </div>
                            <div class="form-group col-md-3">
                                <label>所在部门</label>
                                <input type="text" placeholder="所在部门" id="add-department" name="department" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>业务类型</label>
                                <select id="add-businessType" name="businessType" class="form-control" title="选择业务类型">
                                    <option value='销售管理'>销售管理</option>
                                    <option value='生产管理'>生产管理</option>
                                    <option value='技术管理'>技术管理</option>
                                    <option value='实验室管理'>实验室管理</option>
                                    <option value='采购管理'>采购管理</option>
                                    <option value='人事管理'>人事管理</option>
                                    <option value='计划物控管理'>计划物控管理</option>
                                    <option value='财务管理'>财务管理</option>
                                    <option value='工艺管理'>工艺管理</option>
                                    <option value='设备管理'>设备管理</option>
                                    <option value='品质管理'>品质管理</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label>文件类型</label>
                                <input type="text" placeholder="文件类型" id="add-fileType" name="fileType" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label>评审文件名称</label>
                                <input type="text" placeholder="评审文件名称" id="add-name" name="name" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label>文件版本号</label>
                                <input type="text" placeholder="文件版本号" id="add-version" name="version" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label>表单号</label>
                                <input type="text" placeholder="表单号" id="add-formId" name="formId" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>备注</label>
                                <textarea placeholder="备注" id="add-description" name="description" class="form-control" rows="5" cols="60"></textarea>
                            </div>
                            <div class="form-group hd">
                                <label>审批人</label>
                                <input type="text" placeholder="审批人" id="add-reviewers" name="reviewers" class="form-control">
                            </div>
                        </form>
                        <div class="form-group fatt">
                            <label>上传附件</label>
                            <div class="up">
                                <form id="add-upload-form" action="<%=path%>/file/uploadFile.shtml" method="post" enctype="multipart/form-data">
                                    <input id="add-up-applyId" type="text" name="applyId" class="hd" />
                                    <input id="add-up-name" type="text" name="name" class="upc-txt" />
                                    <input id="add-up-category" type="text" name="category" class="hd" value="submitter" />
                                    <input id="add-up-browse" type="button" class="upc-btn" value="浏览..." />
                                    <input id="add-up-file" type="file" name="file" class="upc-file"  size="28" title="点这里选择要上传的附件"/>
                                    <input id="add-up-submit" type="button" class="upc-btn" value="上传" />
                                    <label id="add-up-note" class="upc-note hd"></label>
                                </form>
                            </div>
                            <div id="add-attachment-list">
                            </div>                          
                        </div>
                    </div>
                    <div class="modal-footer">
                        <label id="add-approval-note" class="cr hd"></label>
                        <a id="add-approval-review-btn" class="btn btn-primary"> 预 览 </a>
                        <a id="add-approval-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="add-approval-review-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>2. 预览审批业务</h3>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td width="50%">申请号</td>
                                    <td width="50%" id="review-add-applyId"></td>
                                </tr>
                                <tr>
                                    <td>申请人工号</td>
                                    <td id="review-add-employeeNo"></td>
                                </tr>
                                <tr>
                                    <td>申请人姓名</td>
                                    <td id="review-add-nickName"></td>
                                </tr>
                                <tr>
                                    <td>所在部门</td>
                                    <td id="review-add-department"></td>
                                </tr>
                                <tr>
                                    <td>业务类型</td>
                                    <td id="review-add-businessType"></td>
                                </tr>
                                <tr>
                                    <td>文件类型</td>
                                    <td id="review-add-fileType"></td>
                                </tr>
                                <tr>
                                    <td>评审文件名称</td>
                                    <td id="review-add-name"></td>
                                </tr>
                                <tr>
                                    <td>文件版本号</td>
                                    <td id="review-add-version"></td>
                                </tr>
                                <tr>
                                    <td>表单号</td>
                                    <td id="review-add-formId"></td>
                                </tr>
                                <tr>
                                    <td>备注</td>
                                    <td id="review-add-description"></td>
                                </tr>
                                <tr>
                                    <td>上传附件</td>
                                    <td>
                                        <div id="review-add-attachment-list">
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hd">
                                    <td>申请人ID</td>
                                    <td id="review-add-userId"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="add-approval-review-note" class="cr hd"></label>
                        <a id="add-approval-review-selectreviewer-btn" class="btn btn-primary"> 选择评审人员 </a>
                        <a id="add-approval-review-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="add-approval-review-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="add-approval-selectreviewer-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>3. 勾选审批人</h3>
                    </div>
                    <div class="modal-body">
                        <table id="add-selectreviewer-table" class="table">
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="add-approval-selectreviewer-note" class="cr hd"></label>
                        <a id="add-approval-selectreviewer-review-btn" class="btn btn-primary"> 预 览 </a>
                        <a id="add-approval-selectreviewer-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="add-approval-selectreviewer-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="add-approval-reviewreviewer-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>4. 预览审批人</h3>
                    </div>
                    <div class="modal-body">
                        <table id="add-reviewreviewer-table" class="table table-striped">
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="add-approval-reviewreviewer-note" class="cr hd"></label>
                        <a id="add-approval-reviewreviewer-submit-btn" class="btn btn-primary"> 提 交 </a>
                        <a id="add-approval-reviewreviewer-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="add-approval-reviewreviewer-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="update-approval-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>1. 更新审批业务</h3>
                    </div>
                    <div class="modal-body">
                        <form id="update-approval-form" action="<%=path%>/approval/updateApproval.shtml" method="post">
                            <div class="form-group hide">
                                <label>ID</label>
                                <input type="text" placeholder="ID" id="update-id" name="id" class="form-control">
                            </div>
                            <div class="form-group hide">
                                <label>申请人ID</label>
                                <input type="text" placeholder="申请人ID" id="update-userId" name="userId" class="form-control">
                            </div>
                            <div class="form-group col-md-3">
                                <label>申请号</label>
                                <input type="text" placeholder="申请号" id="update-applyId" name="applyId" class="form-control">
                            </div>
                            <div class="form-group col-md-3">
                                <label>申请人工号</label>
                                <input type="text" placeholder="申请人工号" id="update-employeeNo" name="employeeNo" class="form-control">
                            </div>
                            <div class="form-group col-md-3">
                                <label>申请人姓名</label>
                                <input type="text" placeholder="申请人姓名" id="update-nickName" name="nickName" class="form-control">
                            </div>
                            <div class="form-group col-md-3">
                                <label>所在部门</label>
                                <input type="text" placeholder="所在部门" id="update-department" name="department" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>业务类型</label>
                                <select id="update-businessType" name="businessType" class="form-control" title="选择业务类型">
                                    <option value='销售管理'>销售管理</option>
                                    <option value='生产管理'>生产管理</option>
                                    <option value='技术管理'>技术管理</option>
                                    <option value='实验室管理'>实验室管理</option>
                                    <option value='采购管理'>采购管理</option>
                                    <option value='人事管理'>人事管理</option>
                                    <option value='计划物控管理'>计划物控管理</option>
                                    <option value='财务管理'>财务管理</option>
                                    <option value='工艺管理'>工艺管理</option>
                                    <option value='设备管理'>设备管理</option>
                                    <option value='品质管理'>品质管理</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label>文件类型</label>
                                <input type="text" placeholder="文件类型" id="update-fileType" name="fileType" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label>评审文件名称</label>
                                <input type="text" placeholder="评审文件名称" id="update-name" name="name" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label>文件版本号</label>
                                <input type="text" placeholder="文件版本号" id="update-version" name="version" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label>表单号</label>
                                <input type="text" placeholder="表单号" id="update-formId" name="formId" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>备注</label>
                                <textarea placeholder="备注" id="update-description" name="description" class="form-control" rows="5" cols="60"></textarea>
                            </div>
                            <div class="form-group hd">
                                <label>审批人</label>
                                <input type="text" placeholder="审批人" id="update-reviewers" name="reviewers" class="form-control">
                            </div>
                        </form>
                        <div class="form-group fatt">
                            <label>上传附件</label>
                            <div class="up">
                                <form id="update-upload-form" action="<%=path%>/file/uploadFile.shtml" method="post" enctype="multipart/form-data">
                                    <input id="update-up-applyId" type="text" name="applyId" class="hd" />
                                    <input id="update-up-name" type="text" name="name" class="upc-txt" />
                                    <input id="update-up-category" type="text" name="category" class="hd" value="submitter" />
                                    <input id="update-up-browse" type="button" class="upc-btn" value="浏览..." />
                                    <input id="update-up-file" type="file" name="file" class="upc-file"  size="28" title="点这里选择要上传的附件"/>
                                    <input id="update-up-submit" type="button" class="upc-btn" value="上传" />
                                    <label id="update-up-note" class="upc-note hd"></label>
                                </form>
                            </div>
                            <div id="update-attachment-list">
                            </div>                          
                        </div>
                    </div>
                    <div class="modal-footer">
                        <label id="update-approval-note" class="cr hd"></label>
                        <a id="update-approval-review-btn" class="btn btn-primary"> 预 览 </a>
                        <a id="update-approval-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="update-approval-review-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>2. 预览审批业务</h3>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td width="50%">申请号</td>
                                    <td width="50%" id="review-update-applyId"></td>
                                </tr>
                                <tr>
                                    <td>申请人工号</td>
                                    <td id="review-update-employeeNo"></td>
                                </tr>
                                <tr>
                                    <td>申请人姓名</td>
                                    <td id="review-update-nickName"></td>
                                </tr>
                                <tr>
                                    <td>所在部门</td>
                                    <td id="review-update-department"></td>
                                </tr>
                                <tr>
                                    <td>业务类型</td>
                                    <td id="review-update-businessType"></td>
                                </tr>
                                <tr>
                                    <td>文件类型</td>
                                    <td id="review-update-fileType"></td>
                                </tr>
                                <tr>
                                    <td>评审文件名称</td>
                                    <td id="review-update-name"></td>
                                </tr>
                                <tr>
                                    <td>文件版本号</td>
                                    <td id="review-update-version"></td>
                                </tr>
                                <tr>
                                    <td>表单号</td>
                                    <td id="review-update-formId"></td>
                                </tr>
                                <tr>
                                    <td>备注</td>
                                    <td id="review-update-description"></td>
                                </tr>
                                <tr>
                                    <td>上传附件</td>
                                    <td>
                                        <div id="review-update-attachment-list">
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hd">
                                    <td>申请人ID</td>
                                    <td id="review-update-userId"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="update-approval-review-note" class="cr hd"></label>
                        <a id="update-approval-review-selectreviewer-btn" class="btn btn-primary"> 选择评审人员 </a>
                        <a id="update-approval-review-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="update-approval-review-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="update-approval-selectreviewer-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>3. 更新审批人</h3>
                    </div>
                    <div class="modal-body">
                        <table id="update-selectreviewer-table" class="table">
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="update-approval-selectreviewer-note" class="cr hd"></label>
                        <a id="update-approval-selectreviewer-review-btn" class="btn btn-primary"> 预 览 </a>
                        <a id="update-approval-selectreviewer-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="update-approval-selectreviewer-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="update-approval-reviewreviewer-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>4. 预览审批人</h3>
                    </div>
                    <div class="modal-body">
                        <table id="update-reviewreviewer-table" class="table table-striped">
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="update-approval-reviewreviewer-note" class="cr hd"></label>
                        <a id="update-approval-reviewreviewer-submit-btn" class="btn btn-primary"> 提 交 </a>
                        <a id="update-approval-reviewreviewer-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="update-approval-reviewreviewer-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
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
                        <a id="view-approval-detail-status-btn" class="btn btn-primary"> 审批状态 </a>
                        <a id="view-approval-detail-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="view-approval-status-modal" tabindex="-1"
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog" style="width:800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>审批状态</h3>
                    </div>
                    <div class="modal-body">
                        <table id="view-status-table" class="table table-striped">
                        </table>
                    </div>
                    <div class="modal-footer">
                        <label id="view-approval-status-note" class="cr hd"></label>
                        <a id="view-approval-status-return-btn" class="btn btn-default"> 返 回 </a>
                        <a id="view-approval-status-cancel-btn" class="btn btn-default" data-dismiss="modal"> 取 消 </a>
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
