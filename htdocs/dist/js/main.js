console.log("加载成功");
/* 配置使用到的模块 */
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"nav":"nav",
		"slide":"slide",
		"data":"data"
	},
	shim:{
		//设置依赖关系
		"jquery-cookie":["jquery"]
	}
})

require(["nav"],function(nav){
	nav.download();
	nav.banner();
	nav.sideNav();
	nav.topNav();
})
require(["slide"],function(slide){
		slide.slideNav();
})
require(["data"],function(data){
	data.data();
})