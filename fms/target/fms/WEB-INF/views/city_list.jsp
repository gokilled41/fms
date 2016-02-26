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
<title>切换城市</title>
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
		<div class="city_list">
			<p class="wz">定位城市</p>
			<ul>
			    <li class="city_none" style="display: none;">无法获取当前位置</li>
				<li><a id="localcity" href="javascript:void(0);">北京</a></li>
			</ul>
		</div>
		<div class="city_list">
			<p class="wz">切换城市</p>
			<ul>
				<li><a href="javascript:void(0);">北京</a></li>
				<li><a href="javascript:void(0);">上海</a></li>
				<li><a href="javascript:void(0);">广州</a></li>
				<li><a href="javascript:void(0);">深圳</a></li>
			</ul>
		</div>
	</div>
	
	<script type="text/javascript" src="../js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="../js/common.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/city_list.js?t=<%=t%>"></script>
</body>
</html>