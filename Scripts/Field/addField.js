var tableList = [];

function setup(){
	fillTableList();
}

function fillTableNames(){
	var i;
	for(i=0;i<tableList.length;++i){
		addOption("newTable", tableList[i].tableName, tableList[i].tableName);
	}
}

function fillTableList(){
	var send = "id=currentFields";
	var sendTo = "/ALAnew/DataAnalysis/Scripts/Field/fillTableList.php";
	pingServer(send, sendTo);
}

function fillCurrentTableList(){
	var send = "id=currentFields";
	var sendTo = "/ALAnew/DataAnalysis/Scripts/Field/fillCurrentTableList.php";
	pingServer(send, sendTo);
}

function markUnused(tableName, fieldName){
	var i;
	var j;
	var fieldList = 0;
	for(i=0;i<tableList.length;++i){
		if(tableList[i].tableName==tableName){
			fieldList = tableList[i].fieldList;
		}
	}
	for(j=0;j<Object.keys(fieldList).length;++j){
		if(fieldList[j].fieldName==fieldName){
			fieldList[j].used=false;
		}
	}
}

function addNewField(){
	var tableName = getSelectedValue("newTable");
	var fieldName = getSelectedValue("newField");
	var send = "tableName=" + tableName + "&fieldName=" + fieldName;
	var sendTo = "/ALAnew/DataAnalysis/Scripts/Field/addNewField.php";
	pingServer(send, sendTo);
	markUsed(tableName, fieldName);
	chooseTableName();
}

function removeCurrentField(){
	if(document.getElementById("currentFields").selectedIndex!=-1){
		var id = getSelectedValue("currentFields");
		var send = "table_id=" + id;
		var sendTo = "/ALAnew/DataAnalysis/Scripts/Field/removeCurrentField.php";
		pingServer(send, sendTo);
		removeOption("currentFields", id);
	}
}

function markUsed(tableName, fieldName){
	var i;
	var j;
	var fieldList = 0;
	for(i=0;i<tableList.length;++i){
		if(tableList[i].tableName==tableName){
			fieldList = tableList[i].fieldList;
		}
	}
	for(j=0;j<Object.keys(fieldList).length;++j){
		if(fieldList[j].fieldName==fieldName){
			fieldList[j].used=true;
		}
	}
}

//Choose table and field functions
function chooseTableName(){
	clearSelectBox("newField");
	var tableName = getSelectedValue("newTable");
	var table = 0;
	var i;
	for(i=0;i<tableList.length;++i){
		if(tableList[i].tableName==tableName){
			table = tableList[i];
		}
	}
	for(i=0;i<Object.keys(table.fieldList).length;++i){
		if(table.fieldList[i].used===false){
			addOption("newField", table.fieldList[i].fieldName,table.fieldList[i].fieldName);
		}
	}
	document.getElementById("newField").selectedIndex=0;
	document.getElementById("newField").selectedIndex=-1;
}