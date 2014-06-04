<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual");
$valueQuery = mysql_query("select value from skipList where fieldName='" . $_REQUEST['fieldName'] . "' and tableName='" . $_REQUEST['tableName'] . "'");
$output="";
while($valueResult = mysql_fetch_array($valueQuery)){
	$output.="addOption('" . $_REQUEST['id'] . "','" . $valueResult['value'] . "','" . $valueResult['value'] . "');\n";
}
echo $output;
?>