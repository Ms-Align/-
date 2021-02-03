define(["jquery"],function($){
	function slideNav(){
		$.ajax({
			type:"get",
			url:"../data/slide.json",
			success:function(result){
				var slideList = result.data.list.list;
				for(var i = 0; i < slideList.length;i++){
					$(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
						<a href="#" target = "_blank">
							<div class = 'content'>
								<div class = 'thumb'>
									<img width="160" height="160" src="${slideList[i].discount_img}" alt=""/>
								</div>
								<h3 class = 'title'>${slideList[i].goods_name}</h3>
								<p class = 'desc'>${slideList[i].desc}</p>
								<p class = 'price'>
									<span>${slideList[i].goods_price}</span>元
									<del>${slideList[i].seckill_Price}</del>
								</p>
							</div>
						</a>
					</li>`).appendTo("#J_flashSaleList .swiper-wrapper")
				}
				// 添加点击事件
				var count = -992;
				var sum = (-992/4)*(slideList.length -4 );
				var i = -992;
				// 设置定时器控制自动移动
				var timer = setInterval(function(){
					count += i;
					if(count < sum){
						count = sum;
						$(".swiper-flashsale-next").addClass("swiper-button-disabled")
						i = -i;
					}else if(count > 0){
						count = 0;
						$('.swiper-flashsale-prev').addClass("swiper-button-disabled")
						i = -i;
					}else{
						$(".swiper-flashsale-prev ,.swiper-flashsale-next").removeClass("swiper-button-disabled")
					}
					$(".swiper-wrapper").css({
						transform:`translate3d(${count}px,0px,0px)`,
						transitionDuration: "1000ms"
					})
				},5000)
				$(".swiper-flashsale-next").click(function(){
					$(".swiper-flashsale-prev").removeClass("swiper-button-disabled")
					count += -992;
					if(count < sum){
						count = sum;
						$(".swiper-flashsale-next").addClass("swiper-button-disabled")
					}else if(count > 0){
						count = 0;
					}
					console.log([count,sum]);
					$(".swiper-wrapper").css({
						transform:`translate3d(${count}px,0px,0px)`,
						transitionDuration: "1000ms"
					})
				})
				$(".swiper-flashsale-prev").click(function(){
					$(".swiper-flashsale-next").removeClass("swiper-button-disabled")
					count += 992;
					if(count < sum){
						count = sum;
					}else if(count > 0){
						count = 0;
						$(this).addClass("swiper-button-disabled")
					}
					console.log([count,sum]);
					$(".swiper-wrapper").css({
						transform:`translate3d(${count}px,0px,0px)`,
						transitionDuration: "1000ms"
					})
				})
			},
			error:function(msg){
				console.log(msg)
			}
		})
	}
	return{
			slideNav:slideNav
	}
})