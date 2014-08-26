<?php
	include_once 'php/global.php';

	function pCreateJSImage($name, $x, $y, $src)
	{
		global $dir_framework;
		echo 'var ' . $name . ' = new Image(';
		echo $x . ', ' . $y . ');';
		echo $name . '.src = "' . $dir_framework . $src . '";';
	}
?>
