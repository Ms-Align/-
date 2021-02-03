define(["jquery","jquery-cookie"],function($){
	// 该函数用来处理查询字符串
	function getId(str,name){
		// str是查询字符串，name是需要查到的键
		var Str = str.substring(str.indexOf("?") + 1);
		// 将字符串用&号分割
		var strArr = Str.split("&");
		// 将数组中的键值取出用等号分割存入到一个对象数组中
		for(var i = 0; i< strArr.length; i++){
			var a = strArr[i].split("=");
			if(name == a[0]){
				return a[1];
			}else{
				console.log("未找到该键值对");
			}
		}
	}
	// 下载商品数据
	function download(){
		$.ajax({
			type:"get",
			url:"../data/goodsList.json",
			success:function(result){
				console.log(result);
				// 遍历数组，获取想要的商品信息
				var goodData = null;
				for(var i = 0; i < result.length;i++){
					if(result[i].product_id == getId(location.search,"product_id")){
						goodData = result[i];
						break;
					}
				}
				//拿到数据就可以插入到页面中了
				$(`<div id = 'J_proHeader' data-name="${goodData.name}">
            <div class = 'xm-product-box'>
                <div id = 'J_headNav' class = 'nav-bar'>
                    <div class = 'container J_navSwitch'>
                        <h2 class = 'J_proName'>${goodData.name}</h2>
                        <div class = 'con'>
                            <div class = 'left'>
                                <span class = 'separator'>|</span>
                                <a href="">${goodData.title}</a>
                            </div>
                            <div class = 'right'>
                                <a href="">概述</a>
                                <span class = 'separator'>|</span>
                                <a href="">参数</a>
                                <span class = 'separator'>|</span>
                                <a href="">F码通道</a>
                                <span class = 'separator'>|</span>
                                <a href="#">用户评价</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<div class = 'xm-buyBox' id = 'J_buyBox'>
		    <div class = 'box clearfix'>
		        <div class = 'login-notic J_notic'>
		            <!-- 未登陆提示 -->
		            <div class = 'container'>
		                为方便您购买，请提前登录 
		                <a href="#" class="J_proLogin">立即登陆</a>
		                <a href="#" class = 'iconfont J_proLoginClose'></a>
		            </div>
		        </div>
		        <!-- 商品数据 -->
		        <div class = 'pro-choose-main container clearfix'>
		            <div class = 'pro-view span10'>
		                <!-- 左侧轮播图 未加载数据显示的图片 -->
		                <div class = 'J_imgload imgload hide'></div>
		                <!-- img-con fix 设置图片浮动 -->
		                <div id = 'J_img' class = 'img-con' style = 'left: 338px; margin: 0px;'>
		                    <div class = 'ui-wrapper' style="max-width: 100%;">
		                        <!-- 图片 -->
		                        <div class = 'ui-viewport' style="width: 100%; overflow: hidden; position: relative; height: 560px;">
		                            <div id = 'J_sliderView' class = 'sliderWrap' style = 'width: auto; position: relative;'>
		                                <img class = 'slider done' src="${goodData.images[0]}" style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: block;" alt=""/>
		                                <img class = 'slider done' src="${goodData.images[1] || goodData.images[0]}" style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: none;" alt=""/>
		                                <img class = 'slider done' src="${goodData.images[2] || goodData.images[0]}" style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: none;" alt=""/>
		                                <img class = 'slider done' src="${goodData.images[3] || goodData.images[0]}" style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: none;" alt=""/>
		                                <img class = 'slider done' src="${goodData.images[4] || goodData.images[0]}" style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: none;" alt=""/>
		                            </div>
		                        </div>
		                        <!-- 显示第几张图片的下标 -->
		                        <div class = 'ui-controls ui-has-pager ui-has-controls-direction'>
		                            <div class = 'ui-pager ui-default-pager'>
		                                <div class = 'ui-pager-item'>
		                                    <a href="#" data-slide-index = "0" class = 'ui-pager-link active'>1</a>
		                                </div>
		                                <div class = 'ui-pager-item'>
		                                    <a href="#" data-slide-index = "1" class = 'ui-pager-link'>2</a>
		                                </div>
		                                <div class = 'ui-pager-item'>
		                                    <a href="#" data-slide-index = "2" class = 'ui-pager-link'>3</a>
		                                </div>
		                                <div class = 'ui-pager-item'>
		                                    <a href="#" data-slide-index = "3" class = 'ui-pager-link'>4</a>
		                                </div>
		                                <div class = 'ui-pager-item'>
		                                    <a href="#" data-slide-index = "4" class = 'ui-pager-link'>5</a>
		                                </div>
		                            </div>
		                            <div class = 'ui-controls-direction'>
		                                <a class="ui-prev" href="">上一张</a>
		                                <a class="ui-next" href="">下一张</a>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		            <div class = 'pro-info span10'>
		                <!-- 标题 -->
		                <h1 class = 'pro-title J_proName'>
		                    <span class = 'img'></span>
		                    <span class = 'name'>${goodData.name}</span>
		                </h1>
		                <!-- 提示 -->
		                <p class = 'sale-desc' id = 'J_desc'>
		                    <font color="#ff4a00">${goodData.product_desc_ext}</p>
		                <div class = 'loading J_load hide'>
		                    <div class = 'loader'></div>
		                </div>
		                <!-- 主体 -->
		                <div class = 'J_main'>
		                    <!-- 经营主题 -->
		                    <p class = 'aftersale-company' id = 'J_aftersaleCompany' type = '1' desc = 'null'>小米自营</p>
		                    <!-- 价格 -->
		                    <div class = 'pro-price J_proPrice'>
		                        <span class = 'price'>
		                            ${goodData.price_min} 
		                            <del>${goodData.market_price_max}元</del>
		                        </span>
		                        <span class="seckill-notic hide"><em></em><i></i><span><span></span></span></span>
		                    </div>
		                    <!-- 预售提示倒计时 -->
		                    <div class="pro-time hide J_proOrder">
		                        <div class = 'pro-time-head'>
		                            <span class = 'pro-order-count J_orderCount hide'></span>
		                            <span class = 'time J_orderTime'></span>
		                        </div>
		                        <div class = 'pro-time-con'>
		                            <span class = 'pro-time-price'>
		                                ￥
		                                <em class = 'J_orderPrice'></em>
		                            </span>
		                        </div>
		                    </div>
		                    <!-- 常态秒杀倒计时 -->
		                    <div class = 'pro-time J_proSeckill'>
		                        <div class="pro-time-head">
		                            <em class="seckill-icon"></em> 
		                            <i>秒杀</i>
		                            <span class="time J_seckillTime">距结束 03 时 24 分 46 秒</span>
		                       </div>
		                        <div class = 'pro-time-con'>
		                            <span class = 'pro-time-price'>
		                                ￥
		                                <em class = 'J_seckillPrice'>${goodData.price_min}</em>
		                                <del>
		                                    ￥
		                                    <em class = 'J_seckillPriceDel'>${goodData.market_price_max}</em>
		                                </del>
		                            </span>
		                        </div>
		                    </div>
		                    <!-- 分仓地址 -->
		                    <div class = 'J_addressWrap address-wrap'>
		                        <div class = 'user-default-address' id = 'J_userDefaultAddress'>
		                            <i class = 'iconfont iconfont-location'></i>
		                            <div>
		                                <div class = 'address-info'>
		                                    <span class="item">山东</span>
		                                    <span class="item">济南市</span>
		                                    <span class="item">历下区</span>
		                                    <span class="item">趵突泉街道</span>
		                                </div>
		                                <span class="switch-choose-regions" id="J_switchChooseRegions"> 修改 </span>
		                            </div>
		                            <div class="product-status active" id="J_productStatus"> 
		                                <span class="sale">有现货</span> 
		                            </div>
		                        </div>
		                    </div>
		                    <!-- 产品版本 -->
		                    <div class = 'list-wrap' id = 'J_list'>
		                        <!-- 小米意外保护 -->
		                        <div class = 'pro-choose list-choose list-choose-small J_service' data-index="0" data-multi="false">
		                            <div class = 'step-title'>
		                                选择小米提供的意外保护
		                                <a href="https://api.jr.mi.com/activity/accidentIns/?from=mishop&insuranceSku=24802" target="_blank">了解意外保护 ></a> 
		                            </div>
		                            <ul>
		                                <li class="clearfix" data-oriprice="179.00" data-price="179.00" data-name="意外保障服务" data-bargain_id="2192100029" data-id="2192100029" data-source="common"> 
		                                    <i class="iconfont icon-checkbox">
		                                        <em>√</em>
		                                    </i> 
		                                    <img src="//i1.mifile.cn/a1/pms_1558617128.57794462.png?width=50&amp;height=50"> 
		                                    <div> 
		                                        <span class="name"> 意外保障服务 </span> 
		                                        <p class="desc">手机意外碎屏/进水/碾压等损坏</p>  
		                                        <p class="agreement"> 
		                                            <i class="iconfont icon-checkbox J_read">
		                                                <em>√</em>
		                                            </i> 我已阅读  
		                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24802&amp;couponFrom=rule" target="_blank">
		                                                服务条款
		                                                <span>|</span>
		                                            </a>  
		                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24802&amp;couponFrom=question" target="_blank">
		                                                常见问题
		                                            </a>  
		                                        </p>  
		                                        <span class="price">  179元  </span> 
		                                    </div> 
		                                </li>
		                                <li class="clearfix" data-oriprice="99.00" data-price="99.00" data-name="碎屏保障服务" data-bargain_id="2192100030" data-id="2192100030" data-source="common"> 
		                                    <i class="iconfont icon-checkbox">
		                                        <em>√</em>
		                                    </i> 
		                                    <img src="//i1.mifile.cn/a1/pms_1558617981.89919461.png?width=50&amp;height=50"> 
		                                    <div> 
		                                        <span class="name"> 碎屏保障服务    </span> 
		                                        <p class="desc">手机意外碎屏</p>  
		                                        <p class="agreement"> 
		                                            <i class="iconfont icon-checkbox J_read"><em>√</em></i> 
		                                            我已阅读  
		                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24803&amp;couponFrom=rule" target="_blank">
		                                                服务条款
		                                                <span>|</span>
		                                            </a>  
		                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24803&amp;couponFrom=question" target="_blank">
		                                                常见问题
		                                            </a>  
		                                        </p>  
		                                        <span class="price">  99元  </span> 
		                                    </div> 
		                                </li>
		                            </ul>
		                        </div>
		                        <!-- 小米延长保修 -->
		                        <div class="pro-choose list-choose list-choose-small J_service" data-index="1" data-multi="false">
		                            <div class = 'step-title'>
		                                选择小米提供的延长保修 
		                                <a href="https://api.jr.mi.com/activity/accidentIns/?from=mishop&insuranceSku=24806" target="_blank">了解延长保修 ></a>
		                            </div>
		                            <ul>
		                                <li class="clearfix" data-oriprice="49.00" data-price="34.3" data-name="延长保修服务" data-bargain_id="2192100031" data-id="2192100031" data-source="common"> 
		                                    <i class="iconfont icon-checkbox"><em>√</em></i> 
		                                    <img src="//i1.mifile.cn/a1/pms_1558618318.5427285.png?width=50&amp;height=50"> 
		                                    <div> <span class="name"> 延长保修服务  <em>已省14.7元</em>  </span> 
		                                        <p class="desc">厂保延一年，性能故障免费维修</p>  
		                                        <p class="agreement"> 
		                                            <i class="iconfont icon-checkbox J_read"><em>√</em></i> 
		                                            我已阅读  
		                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24806&amp;couponFrom=rule" target="_blank">服务条款<span>|</span></a>  
		                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24806&amp;couponFrom=question" target="_blank">常见问题</a>  
		                                        </p>  
		                                        <span class="price">  34.3元 
		                                            <del>49元</del>  
		                                        </span> 
		                                    </div> 
		                                </li>
		                                
		                            </ul>
		                        </div>
		                        <!-- 已经选择产品 -->
		                        <div class = 'pro-list' id = 'J_proList'>
		                            <ul>
		                                <li>${goodData.price_min} 6GB+128GB ${goodData.value}  
		                                    <del>${goodData.market_price_max}元</del>  
		                                    <span>  ${goodData.price_min} 元 </span> 
		                                </li>
		                                <li class="totlePrice" data-name="seckill">   
		                                    秒杀价   ：${goodData.price_min}元  
		                                </li>
		                            </ul>
		                        </div>
		                        <!-- 购买按钮 -->
		                        <ul class="btn-wrap clearfix" id="J_buyBtnBox">     
		                            <li>  
		                                <a href="javascript:void(0);" data-href="" class="btn btn-primary btn-biglarge J_login" id="${goodData.product_id}">加入购物车</a>  
		                            </li>   
		                            <li>  
		                                <a href="//order.mi.com/site/login?redirectUrl=https://item.mi.com/product/10000150.html" class="btn-gray btn-like btn-biglarge"> 
		                                    <i class="iconfont default"></i>喜欢 
		                                </a>  
		                            </li>
		                        </ul>
		                        <div class="pro-policy" id="J_policy">   
		                            <a href="javascript:void(0);" title="">  
		                                <span class="support">  
		                                    <i class="iconfont"></i>  
		                                    <em>小米自营</em> 
		                                </span> 
		                            </a>   
		                            <a href="javascript:void(0);" title="由小米发货">  
		                                <span class="support">  
		                                    <i class="iconfont"></i>  
		                                    <em>小米发货</em> 
		                                </span> 
		                            </a>   
		                            <a href="javascript:void(0);" title=""> 
		                                <span class="support">  
		                                    <i class="iconfont"></i>  
		                                    <em>7天无理由退货</em> 
		                                </span> 
		                            </a>   
		                            <a href="javascript:void(0);" title="由小米发货的商品，单笔满150元免运费;
		                            由第三方商家发货的商品，免运费;
		                            特殊商品需要单独收取运费，具体以实际结算金额为准；优惠券等不能抵扣运费金额;如需无理由退货，用户将承担该商品的退货物流费用;">  
		                                <span class="support">  
		                                    <i class="iconfont"></i>  
		                                    <em>运费说明</em> 
		                                </span> 
		                            </a> 
		                        </div>
		
		                    </div>
		                </div>
		            </div>
		        </div>
		        <!-- 预售流程 -->
		        <div class="pro-infomation" id="J_proInfo">
		                <div class="pro-book-flow container hide" id="J_bookFlow">
		                    <span class="book-name">预售流程</span>
		                    <ul class="clearfix">
		                        <li class="item01">
		                            <span class="icon icon1"></span>
		                            <div>
		                                <span class="item-name">1.支付预付款</span>
		                                <span class="item-infor"></span>
		                            </div>
		                        </li>
		                        <li class="item02">
		                            <span class="icon icon2"></span>
		                            <div>
		                                <span class="item-name">2.支付尾款 <em>（在我的订单完成）</em></span>
		                                <span class="item-infor"></span>
		                            </div>
		                        </li>
		                        <li class="item03">
		                            <span class="icon icon3"></span>
		                            <div>
		                                <span class="item-name">3.商品发货</span>
		                                <span class="item-infor"></span>
		                            </div>
		                        </li>
		                    </ul>
		                </div>
		                <div class="infor-con" id="J_infoBox"> 
		                    <div class="section-box active "> 
		                        <div class="section-info  is-visible preload">   
		                            <h3 class="container">价格说明   </h3>   
		                            <div class="con" style="height: 189px;">  
		                                <div data-src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/a482afa34053b1b32ece1023475af7fb.jpeg" class="pic J_img done" style="background: url(&quot;//cdn.cnbj1.fds.api.mi-img.com/mi-mall/a482afa34053b1b32ece1023475af7fb.jpeg&quot;) 50% 0px / auto 100% no-repeat;">
		                                </div> 
		                            </div>           
		                        </div> 
		                    </div> 
		                </div>
		            </div>
		    </div>
		</div>`).appendTo("#app");
		banner();
		// 添加购物车按钮
		$("#J_buyBtnBox .btn").click(function(){
			/* alert($(this).attr("id")); */
			// 将数据存入cookie
			var goodsArr = [{
				id:$(this).attr("id"),
				num:1
			}];
			// 使用json存储数据
			$.cookie.json = true;
			// 判断是否有该cookie
			
			if(!$.cookie("goods")){
				$.cookie("goods",JSON.stringify(goodsArr),{
					expires: 7
				});
			}else{
				var cookieArr = JSON.parse($.cookie("goods"));
				var same = false;
				for(var i = 0;i < cookieArr.length;i++){
					if(cookieArr[i].id == goodsArr[0].id){
						cookieArr[i].num ++;
						console.log(cookieArr[i].num);
						same = true;
						break;
					}
				}
				if(!same){
					cookieArr.push(goodsArr[0]);
				}
				$.cookie("goods",JSON.stringify(cookieArr),{
					expires: 7
				});
			}
				
			console.log($.cookie("goods"))
			
		})
			},
			error:function(msg){
				console.log(msg);
			}
		})
	}
	//添加展示图片切换（和主页的效果类似，直接用哪个改的）
	function banner(){
		var imgIndex = 0;
		var timer = setInterval(function(){
			imgIndex ++;
			if(imgIndex >= $("#J_sliderView").find(".slider").length){
				imgIndex = 0;
			}
			Tab(imgIndex);
			spot(imgIndex);
			
		},5000)
		function Tab(Index){
			$("#J_sliderView").find(".slider").css({
				opacity: 0.2,
				display:"none"
			});
			$("#J_sliderView").find(".slider").eq(Index).animate({
				opacity:1
			},500).css("display","block")
		}
		// 事件委托点击图标切换功能
		$(".ui-pager").on("click","a",function(){
			$(this).siblings().attr("class","ui-pager-link");
			$(this).attr("class","ui-pager-link active");
			imgIndex = $(this).index();
			Tab(imgIndex);
			return false;
		})
		function spot(index){
			$(".ui-pager a").eq(index).siblings().attr("class","ui-pager-link");
			$(".ui-pager a").eq(index).attr("class","ui-pager-link active");
		}
		$(".ui-prev").click(function(){
			
			imgIndex --;
			imgIndex =(imgIndex < 0? 4:imgIndex);
			Tab(imgIndex);
			spot(imgIndex);
			return false;
		})
		$(".ui-next").click(function(){
			imgIndex ++;
			imgIndex =(imgIndex > 4?0:imgIndex);
			Tab(imgIndex);
			spot(imgIndex);
			return false;
		})
		}
	return {
		getId:getId,
		download:download,
	}
})