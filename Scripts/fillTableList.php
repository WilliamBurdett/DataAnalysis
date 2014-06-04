<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("MAS");
$tablesQuery = mysql_query("select tableName from visual_backend.table_info;");
$output="var fieldList=[];\n";
$tempOutput="";
while($tablesResult = mysql_fetch_array($tablesQuery)){
	$descQuery = mysql_query("describe " . $tablesResult['tableName']);
	while($descResult = mysql_fetch_array($descQuery)){
		$output.="fieldList.push('" . $descResult['Field'] . "');\n";
	}
	$output.="var " . $tablesResult['tableName'] . "= {tableName : '" . $tablesResult['tableName'] . "', fieldList : clone(fieldList)};\n";
	$output.="tableList.push(" . $tablesResult['tableName'] . ");";
	$output.="while(fieldList.length > 0) {
    fieldList.pop();
}\n";
}
$output.="fillTableNames();";
echo $output;
?>