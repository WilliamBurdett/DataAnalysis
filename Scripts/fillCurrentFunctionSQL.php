<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual");
$funcQuery = mysql_query("select * from functionList;");
$output="";
while($funcResult = mysql_fetch_array($funcQuery)){
	$output.="var " . $funcResult['functionName'] . "= {functionName : '" . $funcResult['functionName'] . "', functionSQL : '" . $funcResult['functionSQL'] . "'};\n";
	$output.="functionSQLList.push(" . $funcResult['functionName'] . ");";
}
$output.="fillFunctionSQLList();";
echo $output;
?>