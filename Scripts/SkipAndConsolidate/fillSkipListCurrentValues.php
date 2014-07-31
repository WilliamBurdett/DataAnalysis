<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
$valueQuery = mysql_query("select value from skip_list where table_id=" . $_REQUEST['table_id']);
$output="";
while($valueResult = mysql_fetch_array($valueQuery)){
	$output.="addOption('" . $_REQUEST['id'] . "','" . $valueResult['value'] . "','" . $valueResult['value'] . "');\n";
}
echo $output;
?>