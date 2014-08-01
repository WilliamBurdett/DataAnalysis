<html>
<head>
<link rel="stylesheet" type="text/css" href="/ALAnew/DataAnalysis/Scripts/createNewAnalysis.css"></link>
<script type="text/javascript" src="/ALAnew/DataAnalysis/Scripts/createNewAnalysis.js"></script>
<script type="text/javascript" src="/ALAnew/DataAnalysis/Scripts/Graph/generateGraph.js"></script>
<script type="text/javascript">
	//window.onload = setup;
</script>
</head>

<body>
<div class="FullArea">
	<div class="stepTitle">
		<div class="titleBorder fontBold">
			Graph And Field/Table
		</div>
	</div>
	<div class="stepRows"><!-- stepRows will collapse, block, width100%-->
		<div class ="inlineBlockDiv"><!--div for inline-block-->
			<div class="blockDiv textAlign">
					Graph
			</div>
			<div class="tableDiv"> <!-- bottom div for the selectbox, table -->
				<select class="selectBox" size="10" ondblclick="chooseGraph();" id="currentGraphs"> <!-- selectBox class, size10, width150px -->
				</select>
			</div>
		</div>
		<div class ="inlineBlockDiv"><!--div for inline-block-->
			<div class="blockDiv textAlign">
					Field/Table
			</div>
			<div class="tableDiv"> <!-- bottom div for the selectbox, table -->
				<select class="selectBox" size="10" ondblclick="chooseField();" id="currentFields"> <!-- selectBox class, size10, width150px -->
				</select>
			</div>
		</div>
		<div class ="inlineBlockDiv"><!--div for inline-block-->
			<div class ="inlineBlockDiv"><!--div for inline-block-->
				<input type="button" class="inlineBlockDiv" value="Reset Graphs and Fields" onclick="resetGraphAndField();">
			</div>
		</div>
	</div>
	<div class="stepTitle">
		<div class="titleBorder fontBold">
			Formula(s)
		</div>
	</div>
	<div class="stepRows"><!-- stepRows will collapse, block, width100%-->
		<div class ="inlineBlockDiv"><!--div for inline-block-->
			<div class="blockDiv textAlign" id="formulaOneTitle">
					Formula
			</div>
			<div class="tableDiv"> <!-- bottom div for the selectbox, table -->
				<select class="selectBox" size="10" ondblclick="fillFormula(1);" id="currentFormulas1"> <!-- selectBox class, size10, width150px -->
				</select>
			</div>
		</div>
		<div class ="inlineBlockDiv" id="formulaTwo"><!--div for inline-block-->
			<div class="blockDiv textAlign" id="formulaTwoTitle">
					Vertical Axis
			</div>
			<div class="tableDiv"> <!-- bottom div for the selectbox, table -->
				<select class="selectBox" size="10" ondblclick="fillFormula(2);" id="currentFormulas2"> <!-- selectBox class, size10, width150px -->
				</select>
			</div>
		</div>
		<div class ="inlineBlockDiv" id="formulaThree"><!--div for inline-block-->
			<div class="blockDiv textAlign" id="formulaThreeTitle">
					Bubble Size
			</div>
			<div class="tableDiv"> <!-- bottom div for the selectbox, table -->
				<select class="selectBox" size="10" id="currentFormulas3"> <!-- selectBox class, size10, width150px -->
				</select>
			</div>
		</div>
		<div class ="inlineBlockDiv"><!--div for inline-block-->
			<div class ="inlineBlockDiv"><!--div for inline-block-->
				<input type="button" class="inlineBlockDiv" value="Reset Formulas" onclick="resetFormulas();">
			</div>
		</div>
	</div>
	<div class="stepTitle">
		<div class="titleBorder fontBold">
			Graph Options
		</div>
	</div>
	<div class="stepRows"><!-- stepRows will collapse, block, width100%-->
		<div class="inlineBlockDiv"> <!-- div for button -->
			<div class="blockDiv textAlign">
				Start Date
			</div>
			<input type="text" class="blockDiv widthMin" id="startDate" />
			<div class="blockDiv textAlign">
				End Date
			</div>
			<input type="text" class="blockDiv widthMin" id="endDate" />
		</div>
		<div class="inlineBlockDiv"> <!-- div for button -->
			<div class="blockDiv textAlign">
				Type
			</div>
			<div class="blockDiv widthMin">
				<table>
					<tr>
						<td>Total</td>
						<td><input checked type="radio" id="typeRadioTotal" /></td>
					</tr>
					<tr>
						<td>Average</td>
						<td><input type="radio" id="typeRadioAverage" /></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="inlineBlockDiv" id="intervalSection"> <!-- div for button -->
			<div class="blockDiv textAlign">
				Interval
			</div>
			<div class="blockDiv widthMin">
				<table>
					<tr>
						<td>Month</td>
						<td><input checked type="radio" id="intervalRadioMonth" /></td>
					</tr>
					<tr>
						<td>Week</td>
						<td><input type="radio" id="intervalRadioWeek" /></td>
					</tr>
					<tr>
						<td>Day</td>
						<td><input type="radio" id="intervalRadioDay" /></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="inlineBlockDiv"> <!-- div for button -->
			<div class="blockDiv textAlign">
				Maximum Unique Values
			</div>
			<input type="text" value="10" class="blockDiv widthMin" id="maxUniques" />
		</div>
	</div>
	<div class="stepTitle">
		<div class="titleBorder fontBold">
			Generate Button
		</div>
	</div>
	<div class="stepRows"><!-- stepRows will collapse, block, width100%-->
		<input type="button" class="inlineBlockDiv" value="Generate Graph" onclick="generateGraph();">
	</div>
</div>
<form method="get" id="form" action="">
<input type="hidden" name="formula_id" id="form_formula_id" />
<input type="hidden" name="formula_id2" id="form_formula_id2" />
<input type="hidden" name="formula_id3" id="form_formula_id3" />
<input type="hidden" name="startDate" id="form_startDate" />
<input type="hidden" name="endDate" ="form_endDate" />
<input type="hidden" name="type" id="form_type" />
<input type="hidden" name="maxFields" id="form_maxFields" />
<input type="hidden" name="interval" id="form_interval" />
<input type="hidden" name="table_id" id="form_table_id" />
</form>
</body>