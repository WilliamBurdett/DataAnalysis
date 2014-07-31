<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
$formQuery = mysql_query("select * from formula_list;");
$output="";
while($formResult = mysql_fetch_array($formQuery)){
	$output.="addOption('currentFormulas', '" . $formResult['formulaName'] . " - " . $formResult['formulaSQL'] . "', '" . $formResult['formula_id'] . "');\n";
}
echo $output;
?>