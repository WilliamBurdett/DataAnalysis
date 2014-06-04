<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("MAS");
$descQuery = mysql_query("describe AR_InvoiceHistoryHeader");
$output="";
while($descResult = mysql_fetch_array($descQuery)){
	if (strpos($descResult['Type'], 'decimal') !== FALSE){
		$output.="addOption('" . $_REQUEST['id'] . "','" . $descResult['Field'] . "','" . $descResult['Field'] . "');\n";
	}
}
echo $output;
?>