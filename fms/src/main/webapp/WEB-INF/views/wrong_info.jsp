<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	long t = System.currentTimeMillis();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=no" />
<title>信息报错</title>
<link href="../css/css.css?t=<%=t%>" rel="stylesheet" type="text/css">
<style type="text/css">
html,body {
	background: #f3f3f3;
}
</style>
<script type="text/javascript" src="../js/baidu_statistics.js?t=<%=t%>"></script>
</head>

<body>
	<div class="index_box">
		<div class="wrong_infor">
			<p><textarea id="content"  name="content" placeholder="例：该优惠已失效"></textarea></p>
			<p class="bz_wz">请填写您的建议</p>
			<p class="cz"><a href="javascript:cancel();" class="fq_btn">放弃</a><a href="javascript:addFeedback();" class="submit_btn">提交</a></p>
		</div>
	</div>
	
	<!-- 弹出框 -->
	<div class="wrapper" id="wrapperId" style="display: none;">
		<div class="pop_box" id="conId">
			<p class="wz">谢谢亲帮我们改进产品！</p>
			<p class="cz_btn"><a href="javascript:void(0);" class="close_btn" onclick="closePopFunc(this);">不客气</a></p>
		</div>
	</div>

	<script type="text/javascript" src="../js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="../js/common.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/wrong_info.js?t=<%=t%>"></script>
</body>
</html>