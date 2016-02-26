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
<title>地图详情</title>
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
		<div id="mapContainer" style="width:100%;"></div>
	</div>
	<script type="text/javascript" src="../js/common.js?t=<%=t%>"></script>
	<script type="text/javascript" src="../js/jquery-2.1.0.min.js"></script>
	
	<!-- 地图 -->
	<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=0286444896d521f0e17ae3be05d5ab95"></script>
	<script type="text/javascript">
		$(function(){
			$("#mapContainer").height($(window).height() +"px");
			var code = urlparameter("code");  //WeChat auth code
			browse_record(code);//记录访问统计
		});
		 //初始化地图对象，加载地图
	    var mapObj;
	    function mapInit(lat,lng,title) {
	         mapObj = new AMap.Map("mapContainer",{
	            dragEnable:true,
	            zoomEnable:true,
	            zooms:[3,18],
	            //二维地图显示视口
	             view: new AMap.View2D({
	                center:new AMap.LngLat(lng, lat),//地图中心点
	                zoom:16 //地图显示的缩放级别
	            })
	        });
	        var marker = new AMap.Marker({
	            position:mapObj.getCenter(),
	            size:new AMap.Size(23,25),
	            content: "<i class='text-icon icon-mark color-strong'></i><div class='markerspan'><div class='markerspan-bg'></div>"+title+"</div>"
	        });
	        marker.setMap(mapObj);

	        mapObj.plugin('AMap.Geolocation', function () {
	            geolocation = new AMap.Geolocation({
	                enableHighAccuracy: true,//是否使用高精度定位，默认:true
	                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
	                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
	                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
	                showButton: true,        //显示定位按钮，默认：true
	                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
	                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
	                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
	                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
	                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
	                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
	            });
	            mapObj.addControl(geolocation);
	        });

	        mapObj.plugin(["AMap.ToolBar"],function(){
	            toolBar = new AMap.ToolBar();
	            mapObj.addControl(toolBar);
	        });
	    }

	    var id = urlparameter("id");
		ajaxUtil({"id":id}, mainpath+"/store/getStore.shtml", loadStoreMap);
		function loadStoreMap(response){
			var lat = response.lat;
			var lng = response.lng;
			var title = response.name;
	    	mapInit(lat, lng, title);
		}
	</script>

</body>
</html>