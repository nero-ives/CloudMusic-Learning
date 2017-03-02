<?php
$arrStr = file_get_contents('info.JSON');

$totalArr = json_decode($arrStr,true);
//print_r($totalArr);
$id = $_GET['id'];
$arr = array();

for($i = 0;$i<count($totalArr);$i++)
{
	if($id==$totalArr[$i]['id'])
	{
		$arr[] = $totalArr[$i];
	}
}
//print_r($arr);

echo json_encode($arr);


 ?>