<?php
	header('content-type:text/html;charset="utf-8"');
	$responseData = array("code" => 0,"message" => "");
	$username = $_POST["username"];
	$password = $_POST["password"];
	$repassword = $_POST["repassword"];
	$createtime = $_POST["createtime"];
	if(!$username){
		$responseData["code"] = 1;
		$responseData['message'] = "用户名不能为空";
		echo json_encode($responseData);
		exit;
	}
	if(!$password){
		$responseData["code"] = 2;
		$responseData['message'] = "密码不能为空";
		echo json_encode($responseData);
		exit;
	}
	if($password != $repassword){
		$responseData["code"] = 3;
		$responseData['message'] = "两次密码输入不一致";
		echo json_encode($responseData);
		exit;
	}

	// 链接数据库，判断用户名是否存在
	$link = mysql_connect("127.0.0.1","root","21201314");
	if(!$link){
		$responseData["code"] = 4;
		$responseData['message'] = "服务器忙碌";
		echo json_encode($responseData);
		exit;
	}
	mysql_set_charset($link,"utf8");
	mysql_select_db($link,"zhong");
	$sql = "select * from mi where username='{$username}'";
	$res =  mysql_query($link,$sql);
	$row = mysql_fetch_assoc($res);
	if($row){
		$responseData["code"] = 5;
		$responseData['message'] = "用户名重复";
		echo json_encode($responseData);
		exit;
	}
	$sql = "insert into mi(username,password,createtime) values('{$username}','{$password}',{$createtime})";
	$res2 =mysql_query($link,$sql2);
	if(!$res2){
		$responseData["code"] = 6;
		$responseData['message'] = "注册失败";
		echo json_encode($responseData);
		exit;
	}
	$responseData['message'] = "注册成功";
	echo json_encode($responseData);
	mysql_close($link);
?>