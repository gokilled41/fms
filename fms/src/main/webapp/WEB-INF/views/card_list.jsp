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
<title>么·卡</title>
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
		<div class="nav_bar menu_fixed">
			<ul class="nav_list_1" id="navConId">
				<li>全部银行</li>
				<li>全部功能</li>
			</ul>
			<div class="dropdown_wrapper">
				<div class="dropdown_module">
					<ul id="banklist">
						<li class="on"><a href="javascript:void(0);">全部银行</a></li>
						
					</ul>
				</div>
				<div class="dropdown_module">
					<ul id="grandlist">
						<li class="on"><a href="javascript:void(0)">全部功能</a></li>
						<li ><a href="javascript:void(0)" >酒店/商务卡</a></li>
						<li><a href="javascript:void(0)" >卡通卡</a></li>
						<li><a href="javascript:void(0)" >特色主题卡</a></li>
						<li><a href="javascript:void(0)" >航空卡</a></li>
						<li><a href="javascript:void(0)" >购物卡</a></li>
						<li><a href="javascript:void(0)" >车主卡</a></li>
						<li><a href="javascript:void(0)" >网络联名卡</a></li>
						<li><a href="javascript:void(0)" >大额取现卡</a></li>
						<li><a href="javascript:void(0)" >女人卡</a></li>
						<li><a href="javascript:void(0)" >标准卡</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="deal_container" style="margin-top:41px;">
			<table class="card_list_tab">
			
			</table>
			<a href="javascript:appendCard();" style="display: none;" class="moreBtn"><span class="name">更多</span></a>
			<div class="shade dn"></div>
		</div>
	</div>

	<script type="text/javascript" src="../js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="../js/common.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/card_list.js?t=<%=t%>"></script>
</body>
</html>