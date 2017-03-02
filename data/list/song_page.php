<?php
$para = $_GET['para'];
$source = 'song_page'.$para.'.JSON';
$arrStr = file_get_contents($source);

$totalArr = json_decode($arrStr,true);
//print_r(json_encode($totalArr));
echo json_encode($totalArr);

 ?>