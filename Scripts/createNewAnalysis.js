var bracketOpen=false;
var lastStep="start";
var tableList = [];
var functionSQLList = [];
var consolidateList = [];
/*
function setup(){
	fillTableList();
	fillCurrentFunctionSQL();
	fillFunctionSQLFieldList();
	showSection("joinSQL");
	//showSection("functionSQL");
	//showSection("skipList");
	//showSection("consolidateList");
	fillAggregateFunctionSQL();
	fillArithmeticFunctionSQL();
	resetFunctionSQL();
	switchTitles("functionSQLAggregateTitle", "functionSQLAggregateTitle");
}*/

function fillFunctionSQLList(){
	var i;
	for(i=0;i<functionSQLList.length;++i){
		addOption("functionSQLList", functionSQLList[i].functionName, functionSQLList[i].functionSQL);
	}
}

function resetFunctionSQL(){
	hideSection("skipList");
	hideSection("consolidateList");
	bracketOpen=false;
	lastStep="start";
	var functionSQLSelected = document.getElementById("functionLSQLSelected");
	functionSQLSelected.innerHTML = "";
	switchTitles("functionSQLAggregateTitle", "functionSQLAggregateTitle");
	switchTitles("functionSQLFieldTitle", "functionSQLAggregateTitle");
	switchTitles("functionSQLArithmeticTitle", "functionSQLAggregateTitle");
}

//Build SQL Functions
function chooseAggregateFunctionSQL(){
	deselectFunctionSQLSelectBoxes("functionSQLAggregateList");
	if(lastStep=="finished"){
		resetFunctionSQL();
	}
	if(lastStep=="start" || lastStep=="Arithmetic" || lastStep=="openBracket"){
		lastStep="Aggregate";
		var value=getSelectedValue("functionSQLAggregateList");
		appendToFunctionSQL(value + "(");
		switchTitles("functionSQLAggregateTitle", "functionSQLFieldTitle");
	}
	else if(lastStep=="Aggregate"){
		alert("You must place a field within the last Aggregate function.");
	}
	else if(lastStep=="closeBracket" || lastStep=="Field"){
		alert("You must place an Arithmetic function before an additional aggregate function.");
	}
}

function switchTitles(currentId, nextId){
	var currentTitle = document.getElementById(currentId);
	currentTitle.className = currentTitle.className.replace( /(?:^|\s)fontBold(?!\S)/g , '' );
	var nextTitle = document.getElementById(nextId);
	nextTitle.className += " fontBold";
}

function fillAggregateFunctionSQL(){
	var id = "functionSQLAggregateList";
	addOption(id, "Sum", "SUM");
	addOption(id, "Average", "AVG");
}

function chooseCurrentFunctionSQL(){
	deselectFunctionSQLSelectBoxes("functionSQLList");
	var functionSQLList = document.getElementById("functionSQLList");
	var functionSQL = functionSQLList.options[functionSQLList.selectedIndex].value;
	var functionSQLSelected = document.getElementById("functionLSQLSelected");
	functionSQLSelected.innerHTML = functionSQL;
	lastStep="finished";
}

function fillCurrentFunctionSQL(){
	var sendTo = "/ALAnew/DataAnalysis/Scripts/fillCurrentFunctionSQL.php";
	var send = "";
	pingServer(send, sendTo);
}

function appendToFunctionSQL(text){
	var functionSQLSelected = document.getElementById("functionLSQLSelected");
	var functionSQL=functionSQLSelected.innerHTML;
	functionSQL+=text;
	functionSQLSelected.innerHTML = functionSQL;
}

function chooseFieldNameFunctionSQL(){
	deselectFunctionSQLSelectBoxes("functionSQLFieldList");
	if(lastStep=="finished"){
		resetFunctionSQL();
	}
	if(lastStep=="Aggregate"){
		lastStep="Field";
		var value=getSelectedValue("functionSQLFieldList");
		appendToFunctionSQL(value + ")");
		switchTitles("functionSQLFieldTitle", "functionSQLArithmeticTitle");
	}
	else if(lastStep=="start" || lastStep=="openBracket" || lastStep=="Arithmetic" || lastStep=="closeBracket"){
		alert("You must place an Aggregate function before placing a field.");
	}
	else if(lastStep=="Field"){
		alert("You must place an Arithmetic function then Aggregate or Brackets before placing a field.");
	}
}

function fillFunctionSQLFieldList(){
	var id = "functionSQLFieldList";
	var send = "id=" + id;
	var sendTo = "/ALAnew/DataAnalysis/Scripts/fillFunctionSQLFieldList.php";
	pingServer(send, sendTo);
}

function deselectFunctionSQLSelectBoxes(skipValue){
	var ids = [];
	ids.push("functionSQLList");
	ids.push("functionSQLAggregateList");
	ids.push("functionSQLFieldList");
	ids.push("functionSQLArithmeticList");
	for(var i=0;i<ids.length;++i){
		if(ids[i]!=skipValue){
			deselectSelectBox(ids[i]);
		}
	}
}

function chooseArithmeticFunctionSQL(){
	deselectFunctionSQLSelectBoxes("functionSQLArithmeticList");
	if(lastStep=="finished"){
		resetFunctionSQL();
	}
	var value=getSelectedValue("functionSQLArithmeticList");
	if(value==")"){ // comes after field
		if(bracketOpen===false || lastStep=="start"){
			alert("You can't place a closed bracket without having an open one.");
		}
		else if(lastStep=="closeBracket"){
			alert("You can't place a closed bracket right after closed bracket.");
		}
		else if(lastStep=="openBracket"){
			alert("You must an Aggregate function within the brackets.");
		}
		else if(lastStep=="Arithmetic"){
			alert("You must put an Aggregate function then field before closing.");
		}
		else if(lastStep=="Aggregate"){
			alert("You must place a field in the Aggregate function before closing a bracket.");
		}
		else{
			bracketOpen=false;
			appendToFunctionSQL(")");
			lastStep="closeBraket";
		}
	}
	else if(value=="("){ // comes after arithmetic or start
		if(bracketOpen===true || lastStep=="openBracket"){
			alert("You can only have one set of brackets at a time.");
		}
		else if(lastStep=="closeBracket"){
			alert("You must have an Arithmetic function between brackets.");
		}
		else if(lastStep=="Aggregate"){
			alert("You must place a field in the Aggregate function then have an Arithmetic function before opening new brackets.");
		}
		else if(lastStep=="Field"){
			alert("You must place an Arithmetic function before opening new brackets after selecting a Field.");
		}
		else{
			bracketOpen=true;
			appendToFunctionSQL("(");
			lastStep="openBracket";
		}
	}
	else{ // comes after field, or closeBracket
		if(lastStep=="openBracket" || lastStep=="start"){
			alert("You must put in an Aggregate function then field before Arithmetic.");
		}
		else if(lastStep=="Aggregate"){
			alert("You must place a field within the aggregate function before Arithmetic");
		}
		else if(lastStep=="Arithmetic"){
			alert("You cannot put two Arithmetic functions in a row");
		}
		else{
			appendToFunctionSQL(" " + value + " " );
			lastStep="Arithmetic";
		}
	}
}

function fillArithmeticFunctionSQL(){
	var id = "functionSQLArithmeticList";
	addOption(id, "+", "+");
	addOption(id, "-", "-");
	addOption(id, "*", "*");
	addOption(id, "/", "/");
	addOption(id, "(", "(");
	addOption(id, ")", ")");
}

function selectFunctionSQL(){
	if(bracketOpen===true){
		alert("You must close the bracket set before finishing.");
	}
	else if(lastStep=="Aggregate"){
		alert("You must place a field within the Aggregate function before finishing.");
	}
	else if(lastStep=="Arithmetic"){
		alert("You cannot finish with an open arithmetic function.");
	}
	else if(lastStep=="openBracket"){
		alert("You must close the bracket set before finishing.");
	}
	else if(lastStep=="start"){
		alert("You should probably make a SQL");
	}
	else{
		showSection("skipList");
		showSection("consolidateList");
	}
}

function setupSkipAndConsolidateList(){
	fillSkipListCurrentValues();
	fillSkipListNewValues();
	fillConsolidateList();
}

//skipList and consolidate list
function fillSkipListCurrentValues(){
	var id = "skipListCurrentValues";
	clearSelectBox(id);
	var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName + "&id=" + id;
	var sendTo = "/ALAnew/DataAnalysis/Scripts/fillSkipListCurrentValues.php";
	pingServer(send, sendTo);
}

function fillSkipListNewValues(){
	var id = "skipListNewValues";
	clearSelectBox(id);
	var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName + "&id=" + id;
	var sendTo = "/ALAnew/DataAnalysis/Scripts/fillSkipListNewValues.php";
	pingServer(send, sendTo);
}

function fillConsolidateListValues(){
	clearSelectBox("consolidateListCurrentREGEXP");
	var i;
	for(i=0;i<consolidateList.length;++i){
		addOption("consolidateListCurrentREGEXP", consolidateList[i].value, consolidateList[i].value);
	}
}

function fillConsolidateList(){
	var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName;
	var sendTo = "/ALAnew/DataAnalysis/Scripts/fillConsolidateList.php";
	pingServer(send, sendTo);
}

function addToSkipList(){
	var newSelectBox = document.getElementById("skipListNewValues");
	addOption("skipListCurrentValues", getSelectedValue("skipListNewValues"), getSelectedValue("skipListNewValues"));
	newSelectBox.removeChild(newSelectBox[newSelectBox.selectedIndex]);
}

function removeFromSkipList(){
	var currentSelectBox = document.getElementById("skipListCurrentValues");
	addOption("skipListNewValues", getSelectedValue("skipListCurrentValues"), getSelectedValue("skipListCurrentValues"));
	currentSelectBox.removeChild(currentSelectBox[currentSelectBox.selectedIndex]);
}

function consolidateListViewCurrentREGEXP(){
	var value = getSelectedValue("consolidateListCurrentREGEXP");
	var consolidate;
	for(i=0;i<consolidateList.length;++i){
		if(consolidateList[i].value==value){
			consolidate = consolidateList[i];
		}
	}
	clearSelectBox("consolidateListCurrentReplacedValues");
	for(i=0;i<Object.keys(consolidate.matchList).length;++i){
		addOption("consolidateListCurrentReplacedValues", consolidate.matchList[i],consolidate.matchList[i]);
	}
}

function addToConsolidateList(){
	var value = document.getElementById("consolidateListREGEXP").value.toUpperCase();
	var consolidateListForNewREGEXP = document.getElementById("consolidateListForNewREGEXP");
	var matchList=[];
	for(var i=0; i<consolidateListForNewREGEXP.length;++i){
		matchList.push(consolidateListForNewREGEXP.options[i].value);
	}
	var evalStr = "var " + value + " = {value : \"" + value + "\", matchList : matchList};";
	eval(evalStr);
	consolidateList.push(eval(value));
	fillConsolidateListValues();
	//add to the consolidate list and the viewbox. Put to server at save
}

function removeFromConsolidateList(){
	var value = getSelectedValue("consolidateListCurrentREGEXP");
	var index=-1;
	for(var i=0;i<consolidateList.length;i++){
		if(consolidateList[i].value==value){
			index=i;
		}
	}
	if(index!=-1){
		consolidateList.splice( index, 1 );
	}
	fillConsolidateListValues();
	//Remove from the consolidateList and the view select box. Pop from server at save.
}

function consolidateListShowForNew(){
	var value = document.getElementById("consolidateListREGEXP").value;
	var id = "consolidateListForNewREGEXP";
	clearSelectBox(id);
	if(value!=""){
		var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName + "&value=" + value + "&id=" + id;
		var sendTo = "/ALAnew/DataAnalysis/Scripts/consolidateListShowForNew.php";
		pingServer(send, sendTo);
	}
}

//Generic Functions
function pingServer(send, sendTo){
	var xmlhttpObject;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttpObject=new XMLHttpRequest();
	}
	else{// code for IE6, IE5
		xmlhttpObject=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttpObject.onreadystatechange=function(){
		if (xmlhttpObject.readyState==4 && xmlhttpObject.status==200){
			if(xmlhttpObject.responseText!=""){
				alert(xmlhttpObject.responseText);
			}
			eval(xmlhttpObject.responseText);
		}
	}
	xmlhttpObject.open("POST",sendTo,true);
	xmlhttpObject.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttpObject.send(send);
}

function deselectSelectBox(id){
	var elements = document.getElementById(id).options;

    for(var i = 0; i < elements.length; i++){
		elements[i].selected = false;
    }
}

function hideSection(id){
	document.getElementById(id).style.display= "none";
}

function showSection(id){
	document.getElementById(id).style.display= "table";
}

function removeNodeById(id){
	var element = document.getElementById(id);
	element.parentNode.removeChild(element);
}

function addOption(id, text, value){
	var selectBox = document.getElementById(id);
	var newOption = document.createElement("option");
	newOption.value = value;
    newOption.innerHTML = text;
	selectBox.add(newOption);
}

function getSelectedValue(id){
	var selectBox = document.getElementById(id);
	var value = selectBox.options[selectBox.selectedIndex].value;
	return value;
}

function clone(obj) {
    var result = {};
    for (var key in obj) {
        result[key] = obj[key];
    }
    return result;
}

function clearSelectBox(id){
	var select = document.getElementById(id);
	var length = select.options.length-1;
	for (i = length; i >= 0; --i) {
	  select.options[i] = null;
	}
}