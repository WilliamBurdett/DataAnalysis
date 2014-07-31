<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("MAS");
$tablesQuery = mysql_query("select tableName from visual_backend.table_info");
$output="var fieldList=[];\n";
$output.="clearArray(tableList);\n";
$tempOutput="";
while($tablesResult = mysql_fetch_array($tablesQuery)){
	$descQuery = mysql_query("describe " . $tablesResult['tableName']);
	while($descResult = mysql_fetch_array($descQuery)){
		$output.="var " . $descResult['Field'] . " = {fieldName : '" . $descResult['Field'] . "', used : false};";
		$output.="fieldList.push(" . $descResult['Field'] . ");\n";
	}
	$output.="var " . $tablesResult['tableName'] . "= {tableName : '" . $tablesResult['tableName'] . "', fieldList : clone(fieldList)};\n";
	$output.="tableList.push(" . $tablesResult['tableName'] . ");";
	$output.="clearArray(fieldList);\n";
}


$output.="clearSelectBox('" . $_REQUEST['id'] . "');\n";
$tableQuery = mysql_query("select * from visual_backend.table_list");
while($tableResults = mysql_fetch_array($tableQuery)){
	$output.="addOption('" . $_REQUEST['id'] . "','" . $tableResults['tableName'] . "-" . $tableResults['fieldName'] . "','" . $tableResults['table_id'] . "');\n";
	$output.="markUsed('" . $tableResults['tableName'] . "','" . $tableResults['fieldName'] . "');\n";
}
$output.="fillTableNames();";
echo $output;
?>