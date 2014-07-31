<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("MAS");

$tableResult = mysql_fetch_array(mysql_query("select tableName, fieldName from visual_backend.table_list where table_id=" . $_REQUEST['table_id']));
$skipQuery = mysql_query("select value from visual_backend.skip_list where table_id=" . $_REQUEST['table_id']);
$where = " and " . $tableResult['fieldName'] . "<>''";
while($skipResult = mysql_fetch_array($skipQuery)){
	$where .= " and " . $tableResult['fieldName'] . "<>'" . $skipResult['value'] . "'";
}

$descQuery = mysql_query("select distinct " . $tableResult['fieldName'] . " from mas." . $tableResult['tableName'] . " where " . $tableResult['fieldName'] . " REGEXP '^" . $_REQUEST['regexp'] . "'" . $where . " order by " . $tableResult['fieldName']);
$output="clearSelectBox('" . $_REQUEST['id'] . "');";
while($descResult = mysql_fetch_array($descQuery)){
	$output.="addOption('" . $_REQUEST['id'] . "','" . $descResult[$tableResult['fieldName']] . "','" . $descResult[$tableResult['fieldName']] . "');\n";
}
echo $output;
?>