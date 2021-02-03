define(["jquery"],function($){
	function data(){
		$.ajax({
			type:"get",
			url:"../data/data.json",
			success:function(result){
				
				var phone = result[0];
				$(`<div class = "home-brick-box home-brick-row-2-box xm-plain-box">
					<div class = 'box-hd'>
						<h2 class = 'title'>${phone.title}</h2>
						<div class = "more">
							<a href="#" class = 'more-link'>
								查看全部
								<i class = 'iconfont iconfont-arrow-right-big'></i>
							</a>
						</div>
					</div>
					<div class = 'hox-bd clearfix'>
						<div class = 'row'>
							<div class = 'span4'>
								<ul class = 'brick-promo-list clearfix'>
									<li class = 'brick-item brick-item-l'>
										<a href="#">
											<img src="${phone.img}" alt=""/>
										</a>
									</li>
								</ul>
							</div><div class = 'span16'><ul class = 'brick-list clearfix'></ul></div>
					</div>`).appendTo(".page-main .container");
					for(var i = 0; i < phone.childs.length;i++){
						$(`<li class = 'brick-item brick-item-m brick-item-m-2'>
								<a href="#">
									<div class = 'figure figure-img'>
										<img width="160" height="160" src="${phone['childs'][i].img}" alt=""/>
									</div>
									<h3 class = 'title'>
										${phone['childs'][i].title}
									</h3>
									<p class = 'desc'>${phone['childs'][i].desc}</p>
									<p class = 'price'>
										<span class = 'num'>${phone['childs'][i].price}</span>
										元
										<span>起</span>
									</p>
								</a>
							</li>`).appendTo(".brick-list:eq(0)");
					}
					function Tab(index,childs){
						for(var j = 0; j < result[index][childs].length;j++){
							$(`<div>
									<li class = 'brick-item brick-item-m brick-item-m-2'>
										<a href="#">
											<div class = 'figure figure-img'>
												<img width="160" height="160" src="${result[index][childs][j].img}" alt=""/>
											</div>
											<h3 class = 'title'>${result[index][childs][j].title}</h3>
											<p class = 'desc'>${result[index][childs][j].desc}</p>
											<p class = 'price'>
												<span class = 'num'>${result[index][childs][j].price}</span>元
												<del>
													<span class = 'num'>${result[index][childs][j].del}</span>元
												</del>
											</p>
										</a>
									</li>
								</div>`).appendTo(`.home-brick-box:eq(${index}) .brick-list`);
					}
					
					}
			for(var i = 1;i < result.length -1;i++){
				$(`<div class = 'home-banner-box'>
					<a href="#">
						<img src="${result[i].topImg}" alt=""/>
					</a>
				</div>
				<div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
					<div class = 'box-hd clearfix'>
						<h2 class = 'title'>${result[i].title}</h2>
						<div class = 'more'>
							<ul class = 'tab-list'>
								<li class = 'tab-active'>
									热门
								</li>
								<li>
									${result[i].subTitle}
								</li>
							</ul>
						</div>
					</div>
					<div class = 'box-bd'>
						<div class = 'row'>
							<div class = 'span4'>
								<ul class = 'brick-promo-list clearfix'>
									<li class = 'brick-item  brick-item-m'>
										<a href="#">
											<img src="${result[i]["leftChilds"][0]}" alt=""/>
										</a>
									</li>
									<li class = 'brick-item  brick-item-m'>
										<a href="#">
											<img src="${result[i]["leftChilds"][1]}" alt=""/>
										</a>
									</li>
								</ul>
							</div>
							<div class = 'span16'>
								<ul class = "brick-list clearfix">
								</ul>
							</div>
						</div>
					</div>
				</div>`).appendTo(".page-main .container");	
				Tab(i,'hotChilds');
			}
				$(".home-brick-box .tab-list").on("mouseover",'li',function(){
					$(this).siblings().removeClass("tab-active");
					$(this).addClass("tab-active");
					// 初始化商品列表
					$(this).closest(".home-brick-box").find(".brick-list").empty();
					// 添加对应商品
					if($(this).index()){
						Tab($(this).closest(".home-brick-box").index(".home-brick-box"),'childs');
						console.log($(this).closest(".home-brick-box").index(".home-brick-box"))
					}else{
						Tab($(this).closest(".home-brick-box").index(".home-brick-box"),'hotChilds');
					}
				})
			},
			error:function(msg){
				console.log(msg)
			}
		})
	}
	return {
		data:data
	}
})