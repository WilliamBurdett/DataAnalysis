<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
$tableQuery = mysql_query("select * from table_list");
$output="";
while($tableResults = mysql_fetch_array($tableQuery)){
	$output.="addOption('" . $_REQUEST['id'] . "','" . $tableResults['table_id'] . "','" . $tableResults['tableName'] . "-" . $tableResults['fieldName'] . "');\n";
}
echo $output;
?>