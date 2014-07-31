<?php
class Formula{
	public $formulaName;
	public $formulaSQL;
	public $formula_id;
	public $valueType;
	
	function Formula($formula_id){
		$formulaSQL = "select formulaName, formulaSQL, valueType from formula_list where formula_id=" . $formula_id;
		if (!mysql_query($formulaSQL))
		{
			echo "Error: " . mysql_error() . "`<br /><br />";
			//die('Error: ' . mysql_error());
		}
		$formulaResult = mysql_fetch_array(mysql_query($formulaSQL));
		$this->formulaName = $formulaResult['formulaName'];
		$this->formulaSQL = $formulaResult['formulaSQL'];
		$this->formula_id = $formula_id;
		$this->valueType = $formulaResult['valueType'];
	}
}
?>