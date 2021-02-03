define(["jquery"],function($){
	function registerSend(){
		$("#register-button").click(function(){
			$.ajax({
				type:"post",
				url:"./php/register.php",
				data:{
					username:$(".item_account").eq(0).val(),
					password:$(".item_account").eq(1).val(),
					repassword:$(".item_account").eq(2).val(),
					createTime: (new Date()).getTime()
				},
				success:function(result){
					var obj = JSON.parse(result);
					if(obj.code){
						$(".err_tip").find("em").attr("class","icon_error");
					}else{
						$(".err_tip").find("em").attr("class","icon_select icon_true");
						$(".err_tip").find("em").css("color","green");
						setTimeout(function(){
							location.assign("login.html");
						})
					}
					$(".err_tip").show().find("span").html(obj.message)
				},
				error:function(msg){
					console.log(msg)
				}
			})
		})
	}
	return {
		registerSend:registerSend
	}
})