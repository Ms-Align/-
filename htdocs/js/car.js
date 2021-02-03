define(["jquery","jquery-cookie","descData"],function($,cookie,descData){
	var goodsInCookie = null;
	function download(){
		// 拿到cookie中的数据
		// promise实现异步串行加载
		new Promise(function(resolve,reject){
			$.ajax({
				url:"../data/goodsCarList.json",
				success:function(obj){
					resolve(obj.data);
				},
				error:function(msg){
					reject(msg);
				}
			})
		}).then(function(goodsCarList){
				// 下载第二份代码
				 return new Promise(function(resolve,reject){
					$.ajax({
						url:"../data/goodsList2.json",
						success:function(goodsList){
							// 合并两份数据
							goodsAll = goodsCarList.concat(goodsList);
							resolve(goodsAll);
						},
						error:function(msg){
							reject(msg);
						}
					}) 
				 }) 
			}).then(function(arr){
				// 在页面上加载数据
				goodsInCookie = JSON.parse($.cookie("goods"));
				if(!goodsInCookie || goodsInCookie == null){
					$("#J_cartEmpty").removeClass("hide");
					$("#J_cartBox").addClass("hide");
				}else{
					$("#J_cartEmpty").addClass("hide");
					$("#J_cartBox").removeClass("hide");
					var result = arr;
					$("#J_cartListBody .item-table").children().remove();
					for(var i = 0; i < goodsInCookie.length;i++){
							for(var j = 0; j < result.length;j++){
								result[j].product_id = result[j].product_id || parseFloat(result[j].productid);
								result[j].price_min = result[j].price_min || result[j].price;
								if(goodsInCookie[i].id == result[j].product_id){
									$(`<div class="item-row clearfix">
										<div class="col col-check">  
											<i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
										</div> 
										<div class="col col-img">  
											<a href="goodsDesc.html?product_id=${result[j].product_id}" target="_blank"> 
												<img alt="" src="${result[j]['image']}" width="80" height="80"> 
											</a>  
										</div> 
										<div class="col col-name">  
											<div class="tags">   
											</div>     
											<div class="tags">  
											</div>   
											<h3 class="name">  
												<a href="goodsDesc.html?product_id=${result[j].product_id}" target="_blank"> 
													${result[j].name}
												</a>  
											</h3>        
										</div> 
										<div class="col col-price"> 
											${result[j].price_min}元 
											<p class="pre-info">  </p> 
										</div> 
										<div class="col col-num">  
											<div class="change-goods-num clearfix J_changeGoodsNum"> 
												<a href="javascript:void(0)" class="J_minus">
													<i class="iconfont"></i>
												</a> 
												<input tyep="text" name="2192300031_0_buy" value="${goodsInCookie[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
												<a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
											</div>  
										</div> 
										<div class="col col-total"> 
											${result[j].price_min * goodsInCookie[i].num}元 
											<p class="pre-info">  </p> 
										</div> 
										<div class="col col-action"> 
											<a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i r="${result[j].product_id}" class="iconfont"></i></a> 
										</div> 
									</div>`).appendTo("#J_cartListBody .item-table");
									break;
								}
							}
						}
					//结算台
						function sum(){
							$('#J_cartBar').children().remove();
							var sumNum = 0;
							var numSelected = 0;
							var sumSelected = $(".icon-checkbox-selected").not("#J_selectAll").parent().parent();
							var sumPrice = 0;
							// 找到所有商品节点
							var allGoods = $("#J_cartListBody .icon-checkbox-selected").parents(".item-row");
							if(allGoods.size()){
								for(var k = 0; k < sumSelected.size();k++){
									numSelected += parseFloat($(sumSelected[k]).find("input").val());
								}
								for(var i = 0;i < allGoods.size();i++){
									sumNum += parseFloat($(allGoods[i]).find("input").val());
									sumPrice += parseFloat($(allGoods[i]).find("input").val()) * parseFloat($(allGoods[i]).find(".col-price").html());
									$($(allGoods)[i]).find(".col-total").html(parseFloat($(allGoods[i]).find("input").val()) * parseFloat($(allGoods[i]).find(".col-price").html()));
								}
							}
							
							$(`<div class="section-left">
													<a href="//list.mi.com/0" class="back-shopping J_goShoping" data-stat-id="b16361b4c5491b6d" onclick="_msq.push(['trackEvent', '5df97b551662ffe7-b16361b4c5491b6d', '#', 'pcpid', '']);">继续购物</a>
													<span class="cart-total">共 <i id="J_cartTotalNum">${sumNum}</i> 件商品，已选择 <i id="J_selTotalNum">${numSelected}</i> 件</span>
													<span class="cart-coudan hide" id="J_coudanTip">
														，还需 <i id="J_postFreeBalance">0.00</i> 元即可免邮费  <a href="javascript:void(0);" id="J_showCoudan" data-stat-id="cfc8337d6cbfdef7" onclick="_msq.push(['trackEvent', '5df97b551662ffe7-cfc8337d6cbfdef7', 'javascript:void0', 'pcpid', '']);">立即凑单</a>
													</span>
												</div>
												<span class="activity-money hide">
													活动优惠：减 <i id="J_cartActivityMoney">0</i> 元
												</span>
												<span class="total-price">
													合计：<em id="J_cartTotalPrice">${sumPrice}</em>元
												</span>
												<a href="javascript:void(0);" class="btn btn-a btn btn-primary" id="J_goCheckout" data-stat-id="9bd56b7232f4ef1a" onclick="_msq.push(['trackEvent', '5df97b551662ffe7-9bd56b7232f4ef1a', 'javascript:void0', 'pcpid', '']);">去结算</a>
								
												<div class="no-select-tip hide" id="J_noSelectTip">
													请勾选需要结算的商品
													<i class="arrow arrow-a"></i>
													<i class="arrow arrow-b"></i>
												</div>`).appendTo("#J_cartBar")
						}
						sum();
						// 给表单元素添加点击事件
						$(".J_minus").click(function(event){
							var num = $(event.target).parent().next().val();
							num--;
							if(num < 1){
								num = 1;
							}
							$(event.target).parent().next().val(num);
							sum();
							updateCookie();
						})
						$(".J_plus").click(function(event){
							var num = $(event.target).parent().prev().val();
							num++;
							$(event.target).parent().prev().val(num);
							sum();
							updateCookie();
						})
						// 多选按钮添加点击事件
						$('#J_selectAll').click(function(){
							if($(this).attr("class").indexOf("icon-checkbox-selected") != -1){
								$(".icon-checkbox").removeClass("icon-checkbox-selected");
							}else{
								$(".icon-checkbox").addClass("icon-checkbox-selected");
							}
							sum();
						})
						// 单选按钮添加点击事件
						$(".icon-checkbox").not("#J_selectAll").click(function(event){
							if($(this).attr("class").indexOf("icon-checkbox-selected") != -1){
								$(event.target).removeClass("icon-checkbox-selected");
							}else{
								$(event.target).addClass("icon-checkbox-selected");
							}
							if($(".icon-checkbox-selected").not("#J_selectAll").size() == 0){
								$('#J_selectAll').removeClass("icon-checkbox-selected");
							}else if($(".icon-checkbox-selected").not("#J_selectAll").size() == $(".icon-checkbox").not("#J_selectAll").size()){
								$('#J_selectAll').addClass("icon-checkbox-selected");
							}
							sum();
						})
						// 删除按钮
						
						// 该函数用于更新cookie
						function updateCookie(){
							// 获取页面上用户操作的数据
							var allGoods = $(".item-row");
							
							for( var i = 0;i < allGoods.length;i++){
								var same = false;
								for(var j = 0;j < goodsInCookie.length;j++){
									if(parseFloat(descData.getId($(allGoods[i]).find("a:eq(0)").attr("href"),"product_id")) == parseFloat(goodsInCookie[j].id)){
										goodsInCookie[i].num = $(allGoods[i]).find("input").val();
										same = true;
										break;
									}
								}
								if(!same){
									goodsInCookie.push(allGoods[i]);
								}
							}
							$.cookie("goods",JSON.stringify(goodsInCookie),{
								expires: 7
							});
						}
				}
				
			})
		
		}
		function del(){
			$(".J_cartGoods").on("click",".J_delGoods .iconfont",function(event){
				console.log(event.target);
				var i  = confirm("确定要删除嘛？");
				if(i){
					var goodId = parseFloat(descData.getId($(event.target).parents(".item-row").find("a:eq(0)").attr("href"),"product_id"));
					// 遍历并删除该商品
					for(var i =0;i < goodsInCookie.length;i++){
						if(parseFloat(goodsInCookie[i].id) == goodId){
							goodsInCookie.splice(i,1);
							break;
						}
					}
					// 重新存放cookie
					if(goodsInCookie.length == 0){
						$.cookie("goods",null);
					}else{
						$.cookie("goods",JSON.stringify(goodsInCookie));
					}
					console.log(goodsInCookie);
					download();
				}
			})
		}
		del();
	function recGoods(){
		$.ajax({
			type:"get",
			url:"../data/goodsCarList.json",
			success:function(result){
				var goods = result.data;
				for(var i = 0; i < goods.length;i++){
					$(`<li class="J_xm-recommend-list span4">    
						<dl> 
							<dt> 
								<a href="//item.mi.com/1181300007.html"> 
									<img src="${goods[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="小米净水器1A（厨下式）"> 
								</a> 
							</dt> 
							<dd class="xm-recommend-name"> 
								<a href="//item.mi.com/1181300007.html"> 
									${goods[i].name} 
								</a> 
							</dd> 
							<dd class="xm-recommend-price">${goods[i].price}元</dd> 
							<dd class="xm-recommend-tips">   ${goods[i].comments}人好评    
								<a href="//item.mi.com/cart/add/2181300007-0-1" id="${goods[i].productid}" class="btn btn-small btn-line-primary J_xm_recommend-btn" style="display: none;">加入购物车</a>  
							</dd> 
							<dd class="xm-recommend-notice">

							</dd> 
						</dl>  
					</li>`).appendTo(".xm-recommend .row")
				}
			},
			error:function(msg){
				console.log(msg);
			}
		})
		}
		// 事件委托添加移入移出效果
		$(".xm-recommend .row").on("mouseover","li",function(){
			$(this).find(".xm-recommend-tips a").css("display","block");
		})
		$(".xm-recommend .row").on("mouseout","li",function(){
			$(this).find(".xm-recommend-tips a").css("display","none");
		})
		$(".xm-recommend .row").on("click",".xm-recommend-tips a",function(){
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
				
			download();
			return false;
		})
		
	return {
		download:download,
		recGoods:recGoods
	}
})