<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");

$tableResult = mysql_fetch_array(mysql_query("select tableName, fieldName from visual_backend.table_list where table_id=" . $_REQUEST['table_id']));

$skipQuery = mysql_query("select value from visual_backend.skip_list where table_id=" . $_REQUEST['table_id']);
$valueList = array();
$where = $tableResult['fieldName'] . "<>''";

while($skipResult = mysql_fetch_array($skipQuery)){
	$where .= " and " . $tableResult['fieldName'] . "<>'" . $skipResult['value'] . "'";
}
$distSQL = "select distinct " . $tableResult['fieldName'] . " from mas." . $tableResult['tableName'] . " where " . $where . " order by " . $tableResult['fieldName'];
$distQuery = mysql_query($distSQL);
while($distResult=mysql_fetch_array($distQuery)){
	array_push($valueList, $distResult[$tableResult['fieldName']]);
}
sort($valueList);
$output = "clearSelectBox('" . $_REQUEST['id'] . "');\n;";
foreach ($valueList as $value){
	$output.="addOption('" . $_REQUEST['id'] . "', '" . $value . "', '" . $value . "');\n";
}
echo $output;
?>
