<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual");
$valueQuery = mysql_query("select value from consolidateList where fieldName='" . $_REQUEST['fieldName'] . "' and tableName='" . $_REQUEST['tableName'] . "'");
$output="clearSelectBox('consolidateListForNewREGEXP');\n;";
$output.="var matchList=[];\n";
while($valueResult = mysql_fetch_array($valueQuery)){
	$matchQuery = mysql_query("select distinct " . $_REQUEST['fieldName'] . " from mas." . $_REQUEST['tableName'] . " where " . $_REQUEST['fieldName'] . " REGEXP '^" . $valueResult['value'] . "'");
	while($matchResult = mysql_fetch_array($matchQuery)){
		$output.="matchList.push('" . $matchResult[$_REQUEST['fieldName']] . "');\n";
	}
	$output.="var " . $valueResult['value'] . "= {value : '" . $valueResult['value'] . "', matchList : clone(matchList)};\n";
	$output.="consolidateList.push(" . $valueResult['value'] . ");\n";
	$output.="while(matchList.length > 0) {
    matchList.pop();
}\n";
}
$output .= "fillConsolidateListValues();\n";
echo $output;
?>
