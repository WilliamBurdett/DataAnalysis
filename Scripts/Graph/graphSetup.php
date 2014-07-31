<?php
if(isset($_REQUEST['startDate'])){
	$startDate = $_REQUEST['startDate'];
}
else{
	$startDate='2009-01-01';
}
if(isset($_REQUEST['endDate'])){
	$endDate = $_REQUEST['endDate'];
	if(strtotime($_REQUEST['endDate'])>strtotime("-1 day")){
		$endDate=date("Y-m-d", strtotime("-1 day"));
	}
}
else{
	$endDate=date("Y-m-d", strtotime("-1 day"));
}
if(isset($_REQUEST['type'])){
	$type = $_REQUEST['type'];
}
else{
	$type='Total';
}
if(isset($_REQUEST['maxFields'])){
	$maxFields=intval($_REQUEST['maxFields']);
}
else{
	$maxFields=10;
}
if(isset($_REQUEST['interval'])){
	$interval = $_REQUEST['interval'];
}
else{
	$interval='Month';
}

function returnType($tempType, $valueType){
	if($valueType=="decimal(11,9)"){
		return "avg(";
	}
	else if($tempType=="Total"){
		return "sum(";
	}
	else{
		return "avg(";
	}
}
function echoIt($out){
	echo "\n\n/*" . $out . "*/\n\n";
}

$tableSQL = "select fieldName, tableName from table_list where table_id=" . $_REQUEST['table_id'];
if (!mysql_query($tableSQL))
{
	echo "Error: " . mysql_error() . "`<br /><br />";
	//die('Error: ' . mysql_error());
}
$tableResult = mysql_fetch_array(mysql_query($tableSQL));
$fieldName = $tableResult['fieldName'];
$fieldName = $tableResult['tableName'];
?>