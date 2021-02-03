<?php
	header("ontent-type:text/html;charset='utf-8'");
	// 拿到数据
	$username = $_POST["username"];
	$password = $_POST["password"];
	if(!$username){
		echo "用户名不能为空";
		exit;
	}
	if(!$password){
		echo "密码不能为空";
		exit;
	}
	// 链接数据库
	$link = mysql_connect("localhost","root","21201314");
	if(!$link){
		echo "数据库链接失败";
		exit;
	}
	mysql_set_charset("utf8");
	mysql_select_db("zhong");
	$sql = "select * from mi where username = '{$username}'";
	$res = mysql_query($sql);
	$row =mysql_fetch_assoc($res);
	if($row){
		if($row["password"] == $password){
			echo "登录成功";
		}else{
			echo "密码错误";
			exit;
		}
	}else{
		echo "用户名错误或尚未注册";
		exit;
	}
	mysql_close($link);
?>