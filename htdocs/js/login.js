define(["jquery"],function($){
	function loginSend(){
		$("#login-button").click(function(){
			$.ajax({
				type:"post",
				url:"./php/login.php",
				data:{
					username:$(".item_account").eq(0).val(),
					password:$(".item_account").eq(1).val()
				},
				success:function(result){
					var obj = result;
					if(obj){
						$(".err_tip").find("em").attr("class","icon_error");
					}else{
						$(".err_tip").find("em").attr("class","icon_select icon_true");
						$(".err_tip").find("em").css("color","green");
					}
					$(".err_tip").show().find("span").html(obj)
				},
				error:function(msg){
					console.log(msg)
				}
			})
		})
	}
	return {
		loginSend:loginSend
	}
})