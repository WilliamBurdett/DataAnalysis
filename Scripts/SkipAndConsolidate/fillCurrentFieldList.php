<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
$tableQuery = mysql_query("select * from table_list");
$output="clearSelectBox('" . $_REQUEST['id'] . "');\n";
while($tableResults = mysql_fetch_array($tableQuery)){
	$output.="addOption('" . $_REQUEST['id'] . "','" . $tableResults['tableName'] . " - " . $tableResults['fieldName'] . "','" . $tableResults['table_id'] . "');\n";
}
echo $output;
?>