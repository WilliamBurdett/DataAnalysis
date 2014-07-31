<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual");
$valueQuery = mysql_query("select value from visual_backend.consolidate_list where table_id=" . $_REQUEST['table_id'] . " order by value");
$tableResult = mysql_fetch_array(mysql_query("select tableName, fieldName from visual_backend.table_list where table_id=" . $_REQUEST['table_id']));

$skipQuery = mysql_query("select value from visual_backend.skip_list where table_id=" . $_REQUEST['table_id']);
$where = " and " . $tableResult['fieldName'] . "<>''";
while($skipResult = mysql_fetch_array($skipQuery)){
	$where .= " and " . $tableResult['fieldName'] . "<>'" . $skipResult['value'] . "'";
}

$output="clearSelectBox('consolidateListCurrentValue');\n;";
$output.="clearArray(consolidateList);\n";
$output.="var matchList=[];\n";
while($valueResult = mysql_fetch_array($valueQuery)){
	$matchQuery = mysql_query("select distinct " . $tableResult['fieldName'] . " from mas." . $tableResult['tableName'] . " where " . $tableResult['fieldName'] . " REGEXP '^" . $valueResult['value'] . "'" . $where . " order by " . $tableResult['fieldName']);
	while($matchResult = mysql_fetch_array($matchQuery)){
		$output.="matchList.push('" . $matchResult[$tableResult['fieldName']] . "');\n";
	}
	$output.="var " . $valueResult['value'] . "= {value : '" . $valueResult['value'] . "', matchList : clone(matchList)};\n";
	$output.="consolidateList.push(" . $valueResult['value'] . ");\n";
	$output.="clearArray(matchList);\n";
}
$output .= "fillConsolidateListValues();\n";
echo $output;
?>
