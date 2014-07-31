<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
mysql_query("insert into formula_list (formulaName, formulaSQL, newFormula,markForDeletion,valueType) values ('" . $_REQUEST['formulaName'] . "','" . $_REQUEST['formulaSQL'] . "', 'Yes', 'No', '" . $_REQUEST['valueType'] . "')");
$idArray = mysql_fetch_array(mysql_query("select formula_id from formula_list where formulaName='" . $_REQUEST['formulaName'] . "' and formulaSQL='" . $_REQUEST['formulaSQL'] . "'"));
echo "addOption('currentFormulas','" . $_REQUEST['formulaName'] . "-" . $_REQUEST['formulaSQL'] . "','" . $idArray['formula_id'] . "');";
mysql_query("update formula_list set newFormula='Yes' where formula_id=" . $idArray['formula_id']);
?>