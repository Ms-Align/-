// 处理首页的导航部分 声明模块遵从AMD
define(["jquery"],function($){
	function download(){
		// 下载数据
		$.ajax({
			type:"get",
			url:"../data/nav.json",
			success:function(result){
				var bannerArr = result["banner"];
				for(var i = 0;i < bannerArr.length;i++){
					$(`<a href = '${bannerArr[i].url}'><img class='swiper-lazy swiper-lazy-loaded' src='images/banner/${bannerArr[i].img}'></a>`).appendTo("#J_homeSwiper .swiper-slide")
					$(`<a href="#" class = 'swiper-pagination-bullet'></a>`).appendTo("#J_homeSwiper .swiper-pagination")
					$(".swiper-pagination-bullet").eq(0).attr("class","swiper-pagination-bullet swiper-pagination-bullet-active")
				}
				
				
			},
			error:function(msg){
				alert(msg)
			}
		})
	}
	// 封装轮播效果
	function banner(){
		var imgIndex = 0;
		var timer = setInterval(function(){
			imgIndex ++;
			if(imgIndex >= $("#J_homeSwiper .swiper-slide").find("a").length){
				imgIndex = 0;
			}
			Tab(imgIndex);
			spot(imgIndex);
			
		},5000)
		function Tab(Index){
			$("#J_homeSwiper .swiper-slide").find("a").css({
				opacity: 0.2,
				display:"none"
			});
			$("#J_homeSwiper .swiper-slide").find("a").eq(Index).animate({
				opacity:1
			},500).css("display","block")
		}
		// 事件委托点击图标切换功能
		$(".swiper-pagination").on("click","a",function(){
			$(this).siblings().attr("class","swiper-pagination-bullet");
			$(this).attr("class","swiper-pagination-bullet swiper-pagination-bullet-active");
			imgIndex = $(this).index();
			Tab(imgIndex);
		})
		function spot(index){
			$(".swiper-pagination a").eq(index).siblings().attr("class","swiper-pagination-bullet");
			$(".swiper-pagination a").eq(index).attr("class","swiper-pagination-bullet swiper-pagination-bullet-active");
		}
		$(".swiper-button-prev").click(function(){
			
			imgIndex --;
			imgIndex =(imgIndex < 0? 4:imgIndex);
			Tab(imgIndex);
			spot(imgIndex);
		})
		$(".swiper-button-next").click(function(){
			imgIndex ++;
			imgIndex =(imgIndex > 4?0:imgIndex);
			Tab(imgIndex);
			spot(imgIndex);
		})
	// 下载侧边栏数据
	}
	function sideNav(){
		$.ajax({
			url:"../data/nav.json",
			success:function(result){
				var side = result["sideNav"];
				for(var i = 0;i < side.length;i++){
					$(`<li class = 'category-item'>
						<a href="/index.html" class = 'title'>
							${side[i]["title"]}
							<em class = 'iconfont-arrow-right-big'></em>
						</a>
						<div class="children clearfix children-col-4" style = 'display: none'>
							
						</div>
					</li>`).appendTo("#J_categoryList")
					var col = 0;
					for(var j = 0; j < side[i]["child"].length;j++){
						if(j % 6 == 0 || j == 0){
							col = col + 1;
							$(`<ul class="children-list children-list-col children-list-col-${col}"></ul>`).appendTo(`.children:eq(${i})`);
						}
						$(`<li>
							<a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
								<img src='${side[i]["child"][j].img}' width="40" height="40" alt="" class="thumb">
								<span class="text">${side[i]["child"][j].title}</span>
							</a>
						</li>`).appendTo(`.children:eq(${i}) .children-list-col-${col}`)
					}
				}
				sideHover();
			},
			error:function(msg){
				alert(msg);
				
			}
		})
	}
	// 添加hover方法
	function sideHover(){
		$("#J_categoryList").on("mouseover",".category-item",function(){
			$(this).children(".children").css("display","block");
		})
		$("#J_categoryList").on("mouseout",".category-item",function(){
			$(this).children(".children").css("display","none");
		})
	}
	// 下载顶部数据
	function topNav(){
		$.ajax({
			type:"get",
			url:"../data/nav.json",
			success:function(result){
				var top = result["topNav"];
				top.push({title:"服务"},{title:"社区"})
				for(var i = 0;i < top.length;i++){
					$(`<li data-index="0" class="nav-item" >
						<a href="javascript:void(0);" class="link">
							<span class="text">${top[i]["title"]}</span>
						</a>
					</li>`).appendTo(".header-nav .nav-list")
				}
				$(".header-nav .nav-list").on("mouseover",".nav-item",function(){
					if($(this).index() < 8){
						$("#J_navMenu").css("display","block");
					}
					$(this).attr("class","nav-item nav-item-active");
					if(top[$(this).index()-1]["childs"]){
						$("#J_navMenu .container").children().remove();
						$('<ul class="children-list clearfix" style="display: block;"></ul>').appendTo("#J_navMenu .container");
						for(var i = 0; i < top[$(this).index()-1]["childs"].length;i++){
							$(`
								<li>
									<a href="#">
										<div class="figure figure-thumb">
											<img src="${top[$(this).index()-1]["childs"][i].img}">
										</div>
										<div class="title">${top[$(this).index()-1]["childs"][i].a}</div>
										<p class="price">${top[$(this).index()-1]["childs"][i].i}</p>
									</a>
								</li>`).appendTo(`#J_navMenu .container .children-list`);
						}
					}
					
					
				})
				$(".header-nav .nav-list").on("mouseout",".nav-item",function(){
					
					$(this).attr("class","nav-item");
					
					
				})
				$("#J_navMenu .container").on("mouseleave","ul",function(){
					$("#J_navMenu .container").children().remove();
					$("#J_navMenu").css("display","none");
				})
			},
			error:function(msg){
				console.log(msg);
			}
		})
	}
	// 搜索框
	$("#search").focus(function(){
		$("#J_keywordList").removeClass("hide").addClass("show");
	}).blur(function(){
		$("#J_keywordList").removeClass("show").addClass("hide")});
	// 该函数是商品列表下页面的"全部商品"事件
	function allGoods(){
		$("#J_navCategory").mouseover(function(){
			$(this).find(".site-category").css("display","block");
		})
		$("#J_navCategory").mouseout(function(){
			$(this).find(".site-category").css("display","none");
		})
	}
	return {
		download:download,
		banner:banner,
		sideNav:sideNav,
		topNav:topNav,
		allGoods:allGoods

	}
})
