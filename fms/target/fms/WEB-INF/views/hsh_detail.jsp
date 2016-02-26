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
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=no" />
<title>活动详情</title>
<link href="../css/css.css?t=<%=t%>" rel="stylesheet" type="text/css">
<link href="../css/swiper.min.css" rel="stylesheet" type="text/css">
<style type="text/css">
html,body {
	background: #f3f3f3;
}
</style>
<script type="text/javascript" src="../js/baidu_statistics.js?t=<%=t%>"></script>
</head>

<body>
	<div class="index_box">
		

		
		<!-- 关注约惠么 -->
		<div class="wrapper_code">
			<div class="tac">
				<p class="code_pt"><img src="../images/code_pt.png" alt=""></p>
				<p class="btn"><a href="javascript:void(0);" onclick="javascript:close_subscribe_tip(this);"><img src="../images/btn.jpg" alt=""></a></p>
			</div>
		</div>
	</div>
	
	<!-- 快捷键 -->
	<div>
		<div class="fixed_bg dn"></div>
		<div class="btn_fixed">
			<div class="talk_box">
				<a href="javascript:void(0);" class="add_link"></a>
				<a href="javascript:attention_reward();" class="sm_link love_link"></a>
				<a href="javascript:search_reward();" class="sm_link search_link"></a>
				<a href="javascript:return_home();" class="sm_link address_link"></a>
			</div>
		</div>
	</div>
	
	
	<!-- UY BEGIN -->
	<div id="SOHUCS" sid=""></div>
	<div style="height:50px;"></div>
	
	<!-- UY END -->
	<script type="text/javascript" src="../js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="../js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="../js/swiper.min.js"></script>
	<script type="text/javascript" src="../js/common.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/hsh_detail.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/hotkeys_common.js?t=<%=t%>"></script>
	
</body>
</html>