<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("MAS");
$descQuery = mysql_query("select distinct " . $_REQUEST['fieldName'] . " from mas." . $_REQUEST['tableName'] . " where " . $_REQUEST['fieldName'] . " REGEXP '^" . $_REQUEST['value'] . "'");
$output="";
while($descResult = mysql_fetch_array($descQuery)){
	$output.="addOption('" . $_REQUEST['id'] . "','" . $descResult[$_REQUEST['fieldName']] . "','" . $descResult[$_REQUEST['fieldName']] . "');\n";
}
echo $output;
?>