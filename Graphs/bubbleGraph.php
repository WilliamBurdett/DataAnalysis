<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
include dirname('C:/wamp/www/ALAnew/DataAnalysis/Scripts/Graph/formulaClass.php') . '/formulaClass.php';
mysql_select_db("visual_backend");
include dirname('C:/wamp/www/ALAnew/DataAnalysis/Scripts/Graph/graphSetup.php') . '/graphSetup.php';
$formulaOne = new Formula($_REQUEST['formula_id']);
$formulaTwo = new Formula($_REQUEST['formula_idTwo']);
$formulaThree = new Formula($_REQUEST['formula_idThree']);
$tableOne = $fieldName . $tableName . $formulaOne->formulaName;
$tableTwo = $fieldName . $tableName . $formulaTwo->formulaName;
$tableThree = $fieldName . $tableName . $formulaThree->formulaName;

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Untitled Document</title>
<script type="text/javascript" src="//www.google.com/jsapi"></script>
<script type="text/javascript">
	google.load('visualization', '1', {packages: ['corechart']});
</script>
<script type="text/javascript">
function drawVisualization() {
	var data = google.visualization.arrayToDataTable([
		<?php
		echo "['" . $fieldName . "', '" . $formulaOne->formulaName . "', '" . $formulaTwo->formulaName . "', '" . $fieldName . "', '" . $formulaThree->formulaName . "']";
		$fieldSQL = "Select distinct fieldValue, avg(formulaValue) from " . $tableOne  . " where dateSelected>='" . $startDate . "' and dateSelected<='" . $endDate . "' group by fieldValue having count(*)>1 order by formulaValue LIMIT " . $maxFields;
		echoIt($fieldSQL);
		$fieldQuery = mysql_query($fieldSQL);
		$output = "";
		while($fieldResult=mysql_fetch_array($fieldQuery)){
			$output.=",\n['" . $fieldResult['fieldValue'] . "',\t";
			$infoSQL = "select " . returnType($type, $formulaOne->valueType) . $tableOne . ".formulaValue) as valueOne, " . returnType($type, $formulaTwo->valueType) . $tableTwo . ".formulaValue) as valueTwo, " . returnType($type, $formulaThree->valueType) . $tableThree . ".formulaValue) as valueThree, " . $tableOne . ".fieldValue
			from " . $tableOne . " join " . $tableTwo . " on
			" . $tableOne . ".dateSelected=" . $tableTwo . ".dateSelected and
			" . $tableOne . ".fieldValue=" . $tableTwo . ".fieldValue
			join " . $tableThree . " on
			" . $tableTwo . ".dateSelected=" . $tableThree . ".dateSelected and
			" . $tableTwo . ".fieldValue=" . $tableThree . ".fieldValue
			where " . $tableOne . ".dateSelected>='" . $startDate . "' and " . $tableOne . ".dateSelected<='" . $endDate . "'
			and " . $tableOne . ".fieldValue='" . $fieldResult['fieldValue'] . "'";
			echoIt($infoSQL);
			$infoQuery = mysql_query($infoSQL);
			while($infoResult = mysql_fetch_array($infoQuery)){
				$output.=$infoResult['valueOne'] . ",\t" . $infoResult['valueTwo'] . ",\t'" . $infoResult['fieldValue'] . "', " . $infoResult['valueThree'] . "]";
			}
		}
		echo $output;
		?>
		]);
	var options = {
		title: '<?php echo "Correlation between " . $formulaOne->formulaName . ", " . $formulaTwo->formulaName . ", and " . $formulaThree->formulaName . " on " . $fieldName . " between the dates " . $startDate . " and " . $endDate; ?>',
		hAxis: {title: '<?php echo $formulaOne->formulaName; ?>'},
		vAxis: {title: '<?php echo $formulaTwo->formulaName; ?>'},
		bubble: {textStyle: {fontSize: 11}}
	};
	
	// Create and draw the visualization.
	var chart = new google.visualization.BubbleChart(document.getElementById('visualization'));
	chart.draw(data, options);
}

google.setOnLoadCallback(drawVisualization);
</script>
</head>

<body>
<form action="bubbleGraph.php" method="get">
<input type="hidden" value="<?php echo $formulaOne->formula_id; ?>" name="formulaOne" id="formulaOne"/>
<input type="hidden" value="<?php echo $formulaTwo->formula_id; ?>" name="formulaTwo" id="formulaTwo"/>
<input type="hidden" value="<?php echo $fieldName; ?>" name="fieldName" id="fieldName"/>
<input type="hidden" value="<?php echo $tableName; ?>" name="tableName" id="tableName"/>
<input <?php if(isset($_REQUEST['startDate'])){echo "value=\"" . $_REQUEST['startDate'] . "\"";}else{echo "value=\"2009-01-01\"";}?> type="text" name="startDate" id="startDate"  />
<input <?php if(isset($_REQUEST['endDate'])){echo "value=\"" . $_REQUEST['endDate'] . "\"";}else{echo "value=\"" . date('Y-m-d') . "\"";}?> type="text" name="endDate" id="endDate"  />
<select name="type" id="type">
<option <?php if(isset($_REQUEST['type'])){if($_REQUEST['type']=="Average"){echo "selected=\"selected\"";}}?> value="Average">Average</option>
<option <?php if(isset($_REQUEST['type'])){if($_REQUEST['type']=="Total"){echo "selected=\"selected\"";}}?> value="Total">Total</option>
</select>
<input type="submit" value="Submit" />
</form>
<div id="visualization" style="width: 100%; height: 600px;"></div>
</body>
</html>
