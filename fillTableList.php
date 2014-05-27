<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("MAS");
$tablesQuery = mysql_query("show tables");
$output="var fieldList=[];\n";
$tempOutput="";
while($tablesResult = mysql_fetch_array($tablesQuery)){
	if(strpos($tablesResult['Tables_in_mas'], "_") !==FAlSE){
		$descQuery = mysql_query("describe " . $tablesResult['Tables_in_mas']);
		while($descResult = mysql_fetch_array($descQuery)){
			$output.="fieldList.push('" . $descResult['Field'] . "');\n";
		}
		$output.="var " . $tablesResult['Tables_in_mas'] . "= {tableName : '" . $tablesResult['Tables_in_mas'] . "', used : false, fieldList : fieldList};\n";
		$output.="tableList.push(" . $tablesResult['Tables_in_mas'] . ");";
	}
}
echo $output;
?>