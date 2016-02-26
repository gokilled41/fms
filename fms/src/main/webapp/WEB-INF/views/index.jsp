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
<title>立即享</title>
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
		<div class="menu_fixed">
			<div class="nav_bar">
				<ul class="nav_list" id="navConId">
					<li>全部分类</li>
					<li><span class="xyk_num">0</span>信用卡</li>
					<li>显示全部</li>
				</ul>
				<div class="dropdown_wrapper">
					<div class="module_con dropdown_module_1">
						<ul class="con_hei" id="classify_param">
							<!-- 分类列表 -->
							<li class="on"><a href="">全部分类</a></li>
							
						</ul>
					</div>
					<div class="module_con dropdown_module_2">
						<div class="con_hei">
							<ul id="xyk_ul">
							<!-- banklist -->
								
								
							</ul>
							<p class="cz_con"><a href="javascript:void(0);" class="finish_btn">完成</a><a href="javascript:void(0);" class="all_xyk_btn on">不限</a></p>
						</div>
					</div>
				    <div class="module_con dropdown_module_1">
						<ul class="con_hei" id="weekday_param">
							<li class="on"><a href="javascript:void(0);">显示全部</a></li>
							<li><a href="javascript:void(0);">今天可用</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="deal_container dear_mar">
			<div class="shop_box">
				<!-- shoplist -->
				
				
				
			</div>
			<div class="shade dn"></div>
		</div>
		
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
				<a href="javascript:attention_store();" class="sm_link love_link"></a>
				<a href="javascript:search_store();" class="sm_link search_link"></a>
				<a href="javascript:return_home();" class="sm_link address_link"></a>
			</div>
		</div>
	</div>
	
	
	<!-- Loading -->
	<div class="loading" ><img src="../images/loading.gif" alt=""></div>
	
	<script type="text/javascript" src="../js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="../js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="../js/common.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/index.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/hotkeys_common.js?t=<%=t%>"></script>
</body>
</html>