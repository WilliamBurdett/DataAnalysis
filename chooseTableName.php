<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("MAS");

$output="";

$descQuery = mysql_query("describe " . $_REQUEST['tableName']);
while($descResult = mysql_fetch_array($descQuery)){
	$output.="addOption(" . $_REQUEST['id'] . ", '" . $descResult['Field'] . "', '" . $descResult['Field'] . "');\n";
}
echo $output;
?>