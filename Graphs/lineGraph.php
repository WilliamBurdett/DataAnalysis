<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
include dirname('C:/wamp/www/ALAnew/DataAnalysis/Scripts/Graph/formulaClass.php') . '/formulaClass.php';
mysql_select_db("visual_backend");
include dirname('C:/wamp/www/ALAnew/DataAnalysis/Scripts/Graph/graphSetup.php') . '/graphSetup.php';

$formula = new Formula($_REQUEST['formula_id']);
$table = $fieldName . $tableName . $formula->formulaName;
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
  // Create and populate the data table.
  var data = google.visualization.arrayToDataTable([
  <?php
	$listSql = "select distinct fieldValue from " . $table . " where dateSelected>='" . $startDate . "' and dateSelected<='" . $endDate . "' group by fieldValue having count(*)>1 order by fieldValue LIMIT " . $maxFields;
	echoIt($listSql);
	$listQuery = mysql_query($listSql);
	$listWhere="";
	$list = array();
	$output="";
	if($interval=="Day"){
		$output.= "['Day'";
		$intervalString="+1 day";
		$tempDate = $startDate;
	}
	if($interval=="Week"){
		$output.=  "['Week'";
		$intervalString="+1 week";
		$tempDate = $startDate;
	}
	else{
		$output.=  "['Month'";
		$intervalString="+1 month";
		$tempDate = substr($startDate,0,-2) . "01";
	}
	while($listResult=mysql_fetch_array($listQuery)){
		$listWhere.= " fieldValue='" . $listResult['fieldValue'] . "' or ";
		$output.=  ", '" . $listResult['fieldValue'] . "'";
		array_push($list, $listResult['fieldValue']);
	}
	$listWhere = substr($listWhere, 0, -3);
	$output.=  ", 'Average'],\n";
	$average=0.0;
	$count=0;
	
	while(strtotime($tempDate)<=strtotime($endDate)){
		$averageSql = "select " . returnType($type, $formula->valueType) . "formulaValue) as average, fieldValue from " . $table . " where dateSelected>='" . $tempDate . "' and dateSelected <'";
		$output.="['" . $tempDate . "-";
		$tempDate = date("Y-m-d", strtotime($intervalString, strtotime($tempDate)));
		$averageSql.=$tempDate . "' and (" . $listWhere . ") group by fieldValue order by fieldValue";
		$output.=$tempDate . "',\t";
		$averageStoreQuery = mysql_query($averageSql);
		reset($list); 
		$count=0;
		$average=0.0;
		while($averageStoreResult = mysql_fetch_array($averageStoreQuery)){
			if($averageStoreResult['fieldValue']!=current($list)){
				$output.="0,\t";
				next($personList);
			}
			$output.=$averageStoreResult['average'] . ",\t";
			$average+=doubleval($averageStoreResult['average']);
			$count++;
			next($list);
		}
		if($count==0){
			$output.="0],\n";
		}
		else{
			$output.=($average/$count) . "],\n";
		}
	}
	$output = substr($output, 0, -2) . "\n";
	echo $output;
  ?>
  ]);

  // Create and draw the visualization.
  var ac = new google.visualization.LineChart(document.getElementById('visualization'));
  ac.draw(data, {
    title : '<?php echo $interval . "ly " . $formula->formulaName . " by " . $fieldName;?>',
    vAxis: {title: "Dollars"},
    hAxis: {title: "<?php echo $interval; ?>"}, 
	pointSize: 5
  });
}
google.setOnLoadCallback(drawVisualization);
</script>
</head>


<body style="font-family: Arial;border: 0 none;">
<form action="storeMarginAndAverageMargin.php" method="post">
<input <?php if(isset($_REQUEST['startDate'])){echo "value=\"" . $_REQUEST['startDate'] . "\"";}else{echo "value=\"2009-01-01\"";}?> type="text" name="startDate" id="startDate"  />
<input <?php if(isset($_REQUEST['endDate'])){echo "value=\"" . $_REQUEST['endDate'] . "\"";}else{echo "value=\"" . date('Y-m-d') . "\"";}?> type="text" name="endDate" id="endDate"  />
<select name="interval" id="interval">
<option <?php if(isset($_REQUEST['interval'])){if($_REQUEST['interval']=="Month"){echo "selected=\"selected\"";}}?> value="Month">Month</option>
<option <?php if(isset($_REQUEST['interval'])){if($_REQUEST['interval']=="Week"){echo "selected=\"selected\"";}}?> value="Week">Week</option>
<option <?php if(isset($_REQUEST['interval'])){if($_REQUEST['interval']=="Day"){echo "selected=\"selected\"";}}?> value="Day">Day</option>
</select>
<select name="type" id="type">
<option <?php if(isset($_REQUEST['type'])){if($_REQUEST['type']=="Average"){echo "selected=\"selected\"";}}?> value="Average">Average</option>
<option <?php if(isset($_REQUEST['type'])){if($_REQUEST['type']=="Total"){echo "selected=\"selected\"";}}?> value="Total">Total</option>
</select>
<input type="submit" value="Submit" />
</form>
<div id="visualization" style="width: 100%; height: 500px;"></div>
</body>
</html>
