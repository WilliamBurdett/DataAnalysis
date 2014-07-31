<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual");
$valueQuery = mysql_query("select value from skipList where fieldName='" . $_REQUEST['fieldName'] . "' and tableName='" . $_REQUEST['tableName'] . "'");
$whereSql="";
while($valueResult = mysql_fetch_array($valueQuery)){
	$whereSql.=" and ";
	$whereSql.=" " . $_REQUEST['fieldName'] . "<>'" . $valueResult['value'] . "' ";
}
mysql_select_db("mas");
$sql = "select distinct " . $_REQUEST['fieldName'] . " from " . $_REQUEST['tableName'] . " where  " . $_REQUEST['fieldName'] . "<>'' " . $whereSql;
$valueQuery = mysql_query("select distinct " . $_REQUEST['fieldName'] . " from " . $_REQUEST['tableName'] . " where  " . $_REQUEST['fieldName'] . "<>'' " . $whereSql);
$output="";
while($valueResult = mysql_fetch_array($valueQuery)){
	$output.="addOption('" . $_REQUEST['id'] . "','" . $valueResult[$_REQUEST['fieldName']] . "','" . $valueResult[$_REQUEST['fieldName']] . "');\n";
}
echo $output;
?>