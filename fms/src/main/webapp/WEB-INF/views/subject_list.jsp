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
<title>惠专题</title>
<link href="../css/css.css?t=<%=t%>" rel="stylesheet" type="text/css">
<script type="text/javascript" src="../js/baidu_statistics.js?t=<%=t%>"></script>
</head>
<body>
	<div class="index_box">
		<ul class="zt_list">
			<!-- subject list -->			


		</ul>
		<a href="javascript:appendSubject();" style="display: none;" class="moreBtn"><span class="name">更多</span></a>
	</div>

	
	<script type="text/javascript" src="../js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="../js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="../js/common.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/subject_list.js?t=<%=t%>"></script>
</body>
</html>