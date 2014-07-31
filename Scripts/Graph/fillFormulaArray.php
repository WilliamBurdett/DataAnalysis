<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
$formQuery = mysql_query("select * from formula_list;");
$output="";
while($formResult = mysql_fetch_array($formQuery)){]
	$outout.="var " . $formResult['formulaName'] . " = {formulaName : '" . $formResult['formulaName'] . "', formula_id : '" . $formResult['formula_id'] . "', tableNumber : 0 };\n";
	$output.="formulaList.push(" . $formResult['formulaName'] . ");\n";
}
$output.="setupFormulaTable();\n"
echo $output;
?>