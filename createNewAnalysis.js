var maxJoinSQLList = 1;
var bracketOpen=false;
var lastStep="start";
var globalTableName="";
var globalFieldName="";
var tableList = [];

function setup(){
	//fillTableList();
	showSection("joinSQL");
	showSection("functionSQL");
	showSection("skipList");
	showSection("consolidateList");
	//fillCurrentFunctionSQL();
	fillAggregateFunctionSQL();
	fillArithmeticFunctionSQL();
	resetFunctionSQL();
	switchTitles("functionSQLAggregateTitle", "functionSQLAggregateTitle");
}

function resetTableNameAndField(){
	resetBelowJoinSQL();
	removeExtraJoinSQLTables(1);
	resetTableList();
	clearSelectBox("joinSQLFieldList1");
	document.getElementById("selectTableNameAndField").disabled=true;
}

function resetTableList(){
	var i;
	for(i=0;i<tableList.length;++i){
		tableList[i].used=false;
	}
}

function resetFunctionSQL(){
	bracketOpen=false;
	lastStep="start";
}

function fillTableNames(){
	var i;
	for(i=0;i<tableList.length;++i){
		addOption("joinSQLTableList1", tableList[i].tableName, tableList[i].tableName);
	}
}

function fillTableList(){
	var send = "";
	var sendTo = "/ALANew/DataVisualization/Scripts/fillTableList.php";
	pingServer(send, sendTo);
}

//Choose table and field functions
function chooseTableName(idNum){
	clearSelectBox("joinSQLFieldList" + idNum);
	var tableName = getSelectedValue("joinSQLTableList" + idNum);
	var table = 0;
	var i;
	for(i=0;i<tableList.length;++i){
		if(tableList[i].tableName==tableName){
			table = tableList[i];
		}
	}
	for(i=0;i<table.fieldList.length;++i){
		addOption("joinSQLTableList" + idNum, table.fieldList[i],table.fieldList[index]);
	}
	if(idNum==1){
		globalTableName=tableName;
	}
}

function chooseFieldName(idNum){
	if(fieldBox.selectedIndex>=0){
		var tableName = getSelectedValue("joinSQLTableList" + idNum);
		var fieldName = getSelectedValue("joinSQLFieldList" + idNum);
		document.getElementById("joinSQLTableList" + idNum).disabled=true;
		document.getElementById("joinSQLFieldList" + idNum).disabled=true;
		if(tableName!="AR_InvoiceHistoryHeader"){
			
			//add new html for new select boxes
			var stepRow = document.getElementById("joinSQL");
			var newIdNum = idNum+1;
			var base = document.getElementById("joinSQLList1");
			var newStucture = base.cloneNode(true);
			newStructure.setAttribute("id", "joinSQLList" + newIdNum);
			newStructure.getElementById("joinSQLTableList" + idNum).setAttribute("onchange", "chooseTableName(" + newIdNum + ");");
			newStructure.getElementById("joinSQLFieldList" + idNum).setAttribute("onchange", "chooseFieldName(" + newIdNum + ");");
			newStructure.getElementById("joinSQLTableList" + idNum).setAttribute("id", "joinSQLTableList" + newIdNum);
			newStructure.getElementById("joinSQLFieldList" + idNum).setAttribute("id", "joinSQLFieldList" + newIdNum);
			clearSelectBox("joinSQLTableList" + newIdNum);
			clearSelectBox("joinSQLFieldList" + newIdNum);
			stepRow.appendChild(newStructure);
			
			//loops through to find tables with that field
			var i;
			var j;
			var check=false;
			for(i=0;i<tableList.length;++i){
				for(j=0;j<tableList[i].fieldList.length;++j){
					if(tableList[i].fieldList[j]==fieldName){
						if(tableList[i].tableName!=tableName){
							check=true;
						}
					}
				}
				if(check===true){
					addOption("joinSQLTableList" + newIdNum, tableList[i].tableName,tableList[i].tableName);
					check=false;
				}
			}
		}
		else{
			document.getElementById("selectTableNameAndField").disabled=false;
		}
		if(idNum=='1'){
			globalFieldName=fieldName;
		}
	}
}

function resetBelowJoinSQL(){
	deselectSelectBox("functionSQLList");
	deselectSelectBox("skipListNewValues");
	deselectSelectBox("skipListCurrentValues");
	deselectSelectBox("consolidateListForNewREGEXP");
	deselectSelectBox("consolidateListCurrentREGEXP");
	deselectSelectBox("consolidateListCurrentReplacedValues");
	document.getElementById("functionLSQLSelected").innerHTML="";
	hideSection("functionSQL");
	hideSection("skipList");
	hideSection("consolidateList");
}

function removeExtraJoinSQLTables(idNum){
	for(var i=idNum+1;i<=maxJoinSQLList;i++){
		removeNodeById("joinSQLList" + idNum);
	}
}

//Build SQL Functions
function chooseAggregateFunctionSQL(){
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
	addOption(id, "Count", "COUNT");
}

function chooseCurrentFunctionSQL(){
	var functionSQLList = document.getElementById("functionSQLList");
	var functionSQL = functionSQLList.options[functionSQLList.selectedIndex].value;
	var functionSQLSelected = document.getElementById("functionLSQLSelected");
	functionSQLSelected.innerHTML = functionSQL;
	lastStep="finished";
}

function fillCurrentFunctionSQL(){
	var id = "functionSQLList";
	var sendTo = "/ALAnew/DataVisualization/Scripts/fillCurrentFunctions.php";
	var send = "id=" + id;
	pingServer(send, sendTo);
}

function appendToFunctionSQL(text){
	var functionSQLSelected = document.getElementById("functionLSQLSelected");
	var functionSQL=functionSQLSelected.innerHTML;
	functionSQL+=text;
	functionSQLSelected.innerHTML = functionSQL;
}

function chooseFieldNameFunctionSQL(){
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

function chooseArithmeticFunctionSQL(){
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
	var sendTo = "/ALANew/DataVisualization/Scripts/fillSkipListCurrentValues.php";
	pingServer(send, sendTo);
}

function fillSkipListNewValues(){
	var id = "skipListNewValues";
	clearSelectBox(id);
	var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName + "&id=" + id;
	var sendTo = "/ALANew/DataVisualization/Scripts/fillSkipListNewValues.php";
	pingServer(send, sendTo);
}

function fillConsolidateList(){
	var id = "consolidateListCurrentREGEXP";
	clearSelectBox(id);
	var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName + "&id=" + id;
	var sendTo = "/ALANew/DataVisualization/Scripts/fillConsolidateList.php";
	pingServer(send, sendTo);
}

function addToSkipList(){
	var value = getSelectedValue("skipListNewValues");
	var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName + "&value=" + value;
	var sendTo = "/ALANew/DataVisualization/Scripts/addToSkipList.php";
	pingServer(send, sendTo);
	setupSkipAndConsolidateList();
}

function removeFromSkipList(){
	var value = getSelectedValue("skipListCurrentValues");
	var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName + "&value=" + value;
	var sendTo = "/ALANew/DataVisualization/Scripts/removeFromSkipList.php";
	pingServer(send, sendTo);
	setupSkipAndConsolidateList();
}

function addToConsolidateList(){
	var value = document.getElementById("consolidateListREGEXP").value;
	var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName + "&value=" + value;
	var sendTo = "/ALANew/DataVisualization/Scripts/addToConsolidateList.php";
	pingServer(send, sendTo);
	setupSkipAndConsolidateList();
}

function removeFromConsolidateList(){
	var value = getSelectedValue("consolidateListCurrentREGEXP");
	var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName + "&value=" + value;
	var sendTo = "/ALANew/DataVisualization/Scripts/removeFromConsolidateList.php";
	pingServer(send, sendTo);
	setupSkipAndConsolidateList();
}

function consolidateListShowForNew(){
	var value = document.getElementById("consolidateListREGEXP").value;
	var id = "consolidateListForNewREGEXP";
	var send = "tableName=" + globalTableName + "&fieldName=" + globalFieldName + "&value=" + value + "&id=" + id;
	var sendTo = "/ALANew/DataVisualization/Scripts/addToConsolidateList.php";
	pingServer(send, sendTo);
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
	newOption = document.createElement("option");
	newOption.text = text;
	newOption.setAttribute("value", value);
	document.getElementById(id).add(newOption);
}

function getSelectedValue(id){
	var selectBox = document.getElementById(id);
	var value = selectBox.options[selectBox.selectedIndex].value;
	return value;
}

function clearSelectBox(id){
	var select = document.getElementById(id);
	var length = select.options.length;
	for (i = 0; i < length; i++) {
	  select.options[i] = null;
	}
}