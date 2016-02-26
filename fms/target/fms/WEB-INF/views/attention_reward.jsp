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
<title>我的关注</title>
<link href="../css/css.css?t=<%=t%>" rel="stylesheet" type="text/css">

<script type="text/javascript" src="../js/baidu_statistics.js?t=<%=t%>"></script>
</head>

<body>
	<div class="index_box">
		<div class="attention_menu">
			<div class="m_con">
				<a href="javascript:attention('attention_shop.shtml');" class="">店铺<span class="num">0</span></a>
				<a href="javascript:attention('attention_reward.shtml');" class="active">活动<span class="num">0</span></a>
			</div>
		</div>
		<div class="deal_container">
			<div class="hsh_box">
				<ul class="hsh_list">
					
					
					
				</ul>
				<a href="javascript:appendReward();" style="display: none;" class="moreBtn"><span class="name">更多</span></a>
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

	<script type="text/javascript" src="../js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="../js/common.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/attention_reward.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/hotkeys_common.js?t=<%=t%>"></script>
</body>
</html>