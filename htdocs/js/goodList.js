define(["jquery"],function($){
	// z直接引入该函数即可
	function banner(){
		var index = 0;
		var timer = setInterval(function(){
			index ++;
			tab();
		},4000)
		function tab(){
			$(".swiper-container .swiper-wrapper").animate({
				left:-2560 * index
			},1000,function(){
				if( index == $(".swiper-container .swiper-wrapper").children().size() -1){
					index = 0;
					$(".swiper-container .swiper-wrapper").css("left",0);
				}
			});
			if( index == $(".swiper-container .swiper-wrapper").children().size() -1){
				$(".swiper-pagination .swiper-pagination-bullet ").eq(0).addClass("swiper-pagination-bullet-active");
				$(".swiper-pagination .swiper-pagination-bullet ").eq(0).siblings().removeClass("swiper-pagination-bullet-active");
			}else{
				$(".swiper-pagination .swiper-pagination-bullet ").eq(index).addClass("swiper-pagination-bullet-active");
				$(".swiper-pagination .swiper-pagination-bullet ").eq(index).siblings().removeClass("swiper-pagination-bullet-active");
			}
			
		}
		$(".swiper-button-prev").click(function(){
			$(".swiper-container .swiper-wrapper").stop();
			clearInterval(timer);
			if(index ==0){
				// 这里乘的2是图片数量减一
				$(".swiper-container .swiper-wrapper").css("left",-2560 * 2);
				index = 1;
				tab();
			}else{
				index--;
				tab();
			}
			console.log(index)
			timer = setInterval(function(){
				index ++;
				
				tab();
			},4000);
		})
		$(".swiper-button-next").click(function(){
			$(".swiper-container .swiper-wrapper").stop();
			clearInterval(timer);
			index++;
			if(index > $(".swiper-container .swiper-wrapper").children().size() -1){
				index = $(".swiper-container .swiper-wrapper").children().size() -1;
			}
			tab();
			timer = setInterval(function(){
				index ++;
				tab();
			},4000);
		})
		$(".swiper-pagination-bullet").click(function(){
			clearInterval(timer);
			index = $(this).index();
			tab();
			timer = setInterval(function(){
			index ++;
			tab();
		},4000);
			return false;
		})
	}
	
	// 下载商品数据
	function download(){
		$.ajax({
			type:"get",
			url:"../data/goodsList2.json",
			success:function(result){
				console.log(result);
				// 将第一个商品插入到大图中
				$(`<div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-a2d6c756 class="channel-product-imgText">
                            <div data-v-a2d6c756 class = 'channel-product-top'>
                                <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                    <div data-v-a2d6c756 class = 'figure'>
                                        <a href="goodsDesc.html?product_id=${result[0].product_id}">
                                            <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${result[0].image}" alt=""/>
                                        </a>
                                    </div>
                                    <div data-v-a2d6c756 class = 'content'>
                                        <h3 data-v-a2d6c756 class = 'title'>
                                            <a data-v-a2d6c756 href="goodsDesc.html">
                                                ${result[0].name}
                                            </a>
                                        </h3>
                                        <p data-v-a2d6c756 class = 'desc'>${result[0].desc}</p>
                                        <p data-v-a2d6c756 class = 'price'>
                                            <strong data-v-a2d6c756>${result[0].price}</strong>元
                                            <span data-v-a2d6c756>起</span>
                                            <del data-v-a2d6c756>${result[0].del}元</del>
                                        </p>
                                        <p data-v-a2d6c756 class = 'link'>
                                            <a data-v-a2d6c756 href="#">立即购买</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div data-v-61428f58 class = 'section'>
				    <div data-v-61428f58 class = 'components-list-box'>
				        <div data-v-4a0c734d class = 'channel-line' style = 'background-color: rgb(245, 245, 245); height: 14px;'></div>
				    </div>
				</div>`).appendTo(".app-body");
				for(var i = 1;i < result.length;i++){
					if( (i - 1)%2 == 0){
						$(`<div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                            <div data-v-45ef62b1 class = 'row'>
                                
                            </div>
                        </div>
                    </div>
                </div>`).appendTo(".app-body");
					}
					$(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                                    <div data-v-45ef62b1 class = 'figure'>
                                        <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}" class = 'exposure'>
                                            <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${result[i].image}" alt=""/>
                                        </a>
                                    </div>
                                    <h3 data-v-45ef62b1 class = 'title'>
                                        <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}">${result[i].name}</a>
                                    </h3>
                                    <p data-v-45ef62b1 class = 'desc'>${result[i].desc} </p>
                                    <p data-v-45ef62b1 class = 'price'>
                                        <strong data-v-45ef62b1>${result[i].price}</strong>元
                                        <span data-v-45ef62b1>起</span>
                                        <del data-v-45ef62b1>${result[i].del}元</del>
                                    </p>
                                </div>`).appendTo(`.row:eq(${$(".row").size() - 1})`);
				}
			},
			error:function(msg){
				console.log(msg);
			}
		})
		}
	return {
		banner:banner,
		download:download
	}
})