<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
$formQuery = mysql_query("select * from table_list;");
$output="clearSelectBox('currentFields');\n";
while($formResult = mysql_fetch_array($formQuery)){
	$output.="addOption('currentFields', '" . $formResult['fieldName'] . " - " . $formResult['tableName'] . "', '" . $formResult['table_id'] . "');\n";
}
echo $output;
?>