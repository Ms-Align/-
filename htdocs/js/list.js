console.log("加载成功");
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"nav":"nav",
		"goodList":"goodList"
	},
	skim:{
		"jquery-cookie":["jquery"]
	}
})
require(["nav"],function(nav){
	nav.topNav();
	nav.sideNav();
	nav.allGoods();
	
})
require(["goodList"],function(goodList){
	goodList.banner();
	goodList.download();
})
