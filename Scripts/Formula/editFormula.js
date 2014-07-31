var bracketOpen=false;
var lastStep="start";

function setup(){
	fillCurrentFormulaSQL();
	fillFormulaSQLFieldList();
	fillAggregateFormulaSQL();
	fillArithmeticFormulaSQL();
	resetFormulaSQL();
}

function resetFormulaSQL(){
	bracketOpen=false;
	lastStep="start";
	var formulaSQLSelected = document.getElementById("formulaLSQLSelected");
	formulaSQLSelected.innerHTML = "";
	switchTitles("formulaSQLAggregateTitle", "formulaSQLAggregateTitle");
	switchTitles("formulaSQLFieldTitle", "formulaSQLAggregateTitle");
	switchTitles("formulaSQLArithmeticTitle", "formulaSQLAggregateTitle");
}

function removeCurrentFormula(){
	if(document.getElementById("currentFormulas").selectedIndex!=-1){
		var id = getSelectedValue("currentFormulas");
		var send = "formula_id=" + id;
		var sendTo = "/ALAnew/DataAnalysis/Scripts/Formula/removeCurrentFormula.php";
		pingServer(send, sendTo);
		removeOption("currentFormulas", id);
	}
}

//Build SQL Formulas
function chooseAggregateFormulaSQL(){
	deselectFormulaSQLSelectBoxes("formulaSQLAggregateList");
	if(lastStep=="finished"){
		resetFormulaSQL();
	}
	if(lastStep=="start" || lastStep=="Arithmetic" || lastStep=="openBracket"){
		lastStep="Aggregate";
		var value=getSelectedValue("formulaSQLAggregateList");
		appendToFormulaSQL(value + "(");
		switchTitles("formulaSQLAggregateTitle", "formulaSQLFieldTitle");
	}
	else if(lastStep=="Aggregate"){
		alert("You must place a field within the last Aggregate formula.");
	}
	else if(lastStep=="closeBracket" || lastStep=="Field"){
		alert("You must place an Arithmetic formula before an additional aggregate formula.");
	}
}

function switchTitles(currentId, nextId){
	var currentTitle = document.getElementById(currentId);
	currentTitle.className = currentTitle.className.replace( /(?:^|\s)fontBold(?!\S)/g , '' );
	var nextTitle = document.getElementById(nextId);
	nextTitle.className += " fontBold";
}

function fillAggregateFormulaSQL(){
	var id = "formulaSQLAggregateList";
	addOption(id, "Sum", "SUM");
	addOption(id, "Average", "AVG");
	addOption(id, "Maximum", "MAX");
	addOption(id, "Minimum", "MIN");
}

function chooseCurrentFormulaSQL(){
	deselectFormulaSQLSelectBoxes("formulaSQLList");
	var formulaSQLList = document.getElementById("formulaSQLList");
	var formulaSQL = formulaSQLList.options[formulaSQLList.selectedIndex].value;
	var formulaSQLSelected = document.getElementById("formulaLSQLSelected");
	formulaSQLSelected.innerHTML = formulaSQL;
	lastStep="finished";
}

function fillCurrentFormulaSQL(){
	var send = "";
	var sendTo = "/ALAnew/DataAnalysis/Scripts/Formula/fillCurrentFormulaSQL.php";
	pingServer(send, sendTo);
}

function appendToFormulaSQL(text){
	var formulaSQLSelected = document.getElementById("formulaLSQLSelected");
	var formulaSQL=formulaSQLSelected.innerHTML;
	formulaSQL+=text;
	formulaSQLSelected.innerHTML = formulaSQL;
}

function chooseFieldNameFormulaSQL(){
	deselectFormulaSQLSelectBoxes("formulaSQLFieldList");
	if(lastStep=="finished"){
		resetFormulaSQL();
	}
	if(lastStep=="Aggregate"){
		lastStep="Field";
		var value=getSelectedValue("formulaSQLFieldList");
		appendToFormulaSQL(value + ")");
		switchTitles("formulaSQLFieldTitle", "formulaSQLArithmeticTitle");
	}
	else if(lastStep=="start" || lastStep=="openBracket" || lastStep=="Arithmetic" || lastStep=="closeBracket"){
		alert("You must place an Aggregate formula before placing a field.");
	}
	else if(lastStep=="Field"){
		alert("You must place an Arithmetic formula then Aggregate or Brackets before placing a field.");
	}
}

function fillFormulaSQLFieldList(){
	var id = "formulaSQLFieldList";
	var send = "id=" + id;
	var sendTo = "/ALAnew/DataAnalysis/Scripts/Formula/fillFormulaSQLFieldList.php";
	pingServer(send, sendTo);
}

function deselectFormulaSQLSelectBoxes(skipValue){
	var ids = [];
	ids.push("formulaSQLAggregateList");
	ids.push("formulaSQLFieldList");
	ids.push("formulaSQLArithmeticList");
	for(var i=0;i<ids.length;++i){
		if(ids[i]!=skipValue){
			deselectSelectBox(ids[i]);
		}
	}
}

function chooseArithmeticFormulaSQL(){
	deselectFormulaSQLSelectBoxes("formulaSQLArithmeticList");
	if(lastStep=="finished"){
		resetFormulaSQL();
	}
	var value=getSelectedValue("formulaSQLArithmeticList");
	if(value==")"){ // comes after field
		if(bracketOpen===false || lastStep=="start"){
			alert("You can't place a closed bracket without having an open one.");
		}
		else if(lastStep=="closeBracket"){
			alert("You can't place a closed bracket right after closed bracket.");
		}
		else if(lastStep=="openBracket"){
			alert("You must an Aggregate formula within the brackets.");
		}
		else if(lastStep=="Arithmetic"){
			alert("You must put an Aggregate formula then field before closing.");
		}
		else if(lastStep=="Aggregate"){
			alert("You must place a field in the Aggregate formula before closing a bracket.");
		}
		else{
			bracketOpen=false;
			appendToFormulaSQL(")");
			lastStep="closeBraket";
		}
	}
	else if(value=="("){ // comes after arithmetic or start
		if(bracketOpen===true || lastStep=="openBracket"){
			alert("You can only have one set of brackets at a time.");
		}
		else if(lastStep=="closeBracket"){
			alert("You must have an Arithmetic formula between brackets.");
		}
		else if(lastStep=="Aggregate"){
			alert("You must place a field in the Aggregate formula then have an Arithmetic formula before opening new brackets.");
		}
		else if(lastStep=="Field"){
			alert("You must place an Arithmetic formula before opening new brackets after selecting a Field.");
		}
		else{
			bracketOpen=true;
			appendToFormulaSQL("(");
			lastStep="openBracket";
		}
	}
	else{ // comes after field, or closeBracket
		if(lastStep=="openBracket" || lastStep=="start"){
			alert("You must put in an Aggregate formula then field before Arithmetic.");
		}
		else if(lastStep=="Aggregate"){
			alert("You must place a field within the aggregate formula before Arithmetic");
		}
		else if(lastStep=="Arithmetic"){
			alert("You cannot put two Arithmetic formulas in a row");
		}
		else{
			appendToFormulaSQL(" " + value + " " );
			lastStep="Arithmetic";
		}
	}
}

function fillArithmeticFormulaSQL(){
	var id = "formulaSQLArithmeticList";
	addOption(id, "+", "+");
	addOption(id, "-", "-");
	addOption(id, "*", "*");
	addOption(id, "/", "/");
	addOption(id, "(", "(");
	addOption(id, ")", ")");
}

function getValueFormat(){
	var decimal = document.getElementById("formulaDecimalRadio");
	var dollar = document.getElementById("formulaDollarRadio");
	if(decimal.checked){
		return "decimal";
	}
	else if(dollar.checked){
		return "dollar";
	}
	else{
		return "";
	}
}

function selectFormulaSQL(){
	var formulaName = document.getElementById("formulaName").value;
	var formulaSQL = document.getElementById("formulaLSQLSelected").innerHTML;
	var valueType = getValueFormat();
	if(bracketOpen===true){
		alert("You must close the bracket set before finishing.");
	}
	else if(lastStep=="Aggregate"){
		alert("You must place a field within the Aggregate formula before finishing.");
	}
	else if(lastStep=="Arithmetic"){
		alert("You cannot finish with an open arithmetic formula.");
	}
	else if(lastStep=="openBracket"){
		alert("You must close the bracket set before finishing.");
	}
	else if(lastStep=="start"){
		alert("You should probably make a SQL");
	}
	else if(formulaName==""){
		alert("Name the Formula");
	}
	else if(valueType==""){
		alert("You need to select a format for the values. Decimal or dollar value.");
	}
	else{
		var send="formulaName=" + formulaName + "&formulaSQL=" + formulaSQL + "&valueType=" + valueType;
		var sendTo = "/ALAnew/DataAnalysis/Scripts/Formula/addFormula.php";
		pingServer(send, sendTo);
	}
}