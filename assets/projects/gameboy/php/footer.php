<?php 
	require_once 'php/url.php';
	
	$glen = new URL;
	$glen->name = "Glen De Cauwsemaecker";
	$glen->website = "http://www.glendc.com/";
	
	$tommy = new URL;
	$tommy->name = "Tommy Tan Sze Yew";
	$tommy->website = "http://sg.linkedin.com/pub/tommy-tan-sze-yew/84/605/b23/";
	
	$gbjam = new URL;
	$gbjam->name = "GBJam";
	$gbjam->website = "http://www.gbjam.net/";
	
	$day = "06";
?>

<p>A <?php $gbjam->getInfo(); ?> HTML5 Game Developed By<br/>
<?php $glen->getInfo(); ?> and <?php $tommy->getInfo(); ?>.</p>
<p id=sub-footer>Latest update @ 
	<time datetime="2013-11-<?php echo $day; ?>"><?php echo $day; ?>
	<sup>th</sup> November, 2013</time>
</p>
