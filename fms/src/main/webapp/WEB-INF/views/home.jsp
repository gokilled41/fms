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
<title>约惠么</title>
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
		<div class="home_top">
			<div class="address"><a href="javascript:selectAddress();" >北京</a></div>
			<div class="search"><a href="javascript:search_store();">搜索优惠活动和商户</a></div>
			<div class="icon">
				<span class="card_font"><a href="javascript:bind_bank();"></a></span>
				<span class="like_font"><a href="javascript:attention();"></a></span>
			</div>
		</div>
		<div class="home_menu">
			<ul>
				<li>
					<a href="javascript:index_reward('美食')">
						<p class="pt"><img src="../images/tb_1.png" alt="美食"></p>
						<p class="name">美食</p>
					</a>
				</li>
				<li>
					<a href="javascript:index_reward('休闲娱乐')">
						<p class="pt"><img src="../images/tb_2.png" alt="休闲娱乐"></p>
						<p class="name">休闲娱乐</p>
					</a>
				</li>
				<li>
					<a href="javascript:index_reward('出行')">
						<p class="pt"><img src="../images/tb_3.png" alt="出行"></p>
						<p class="name">出行</p>
					</a>
				</li>
				<li>
					<a href="javascript:index_reward('时尚生活')">
						<p class="pt"><img src="../images/tb_4.png" alt="时尚生活"></p>
						<p class="name">时尚生活</p>
					</a>
				</li>
				<li>
					<a href="javascript:return_card_list();">
						<p class="pt"><img src="../images/tb_5.png" alt=""></p>
						<p class="name">找卡</p>
					</a>
				</li>
			</ul>
			<div class="clear"></div>
		</div>
		<div class="ljx_box">
			<div class="title">
				<a href="javascript:index_shop();"><span class="right">附近3公里有<span class="yh_num"><span>0</span></span>个优惠></span><span class="ic"><img src="../images/ljx_pt.png" alt="立即享"></span></a>
			</div>
			<ul class="ljx_con">
				<!-- shop list just show 4 number -->
				
				
			</ul>
			<div class="clear"></div>
		</div>
		<div class="home_content">
			<ul>
			<!--subject list   -->
				
				
				
			</ul>
			<a href="javascript:appendSubject();" style="display: none;" class="moreBtn"><span class="name">更多</span></a>
		</div>
		
		<!-- 关注约惠么 -->
		<div class="wrapper_code">
			<div class="tac">
				<p class="code_pt"><img src="../images/code_pt.png" alt=""></p>
				<p class="btn"><a href="javascript:void(0);" onclick="javascript:close_subscribe_tip(this);"><img src="../images/btn.jpg" alt=""></a></p>
			</div>
		</div>
	</div>
	
	<script type="text/javascript" src="../js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="../js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="../js/common.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/home.js?t=<%=t%>"></script>
</body>
</html>