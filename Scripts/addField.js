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

function addNewField(){
	var tableName = getSelectedValue("newTable");
	var fieldName = getSelectedValue("newField");
	var send="tableName="+tableName+"&fieldName="+fieldName;
	var sendTo = "/ALAnew/DataAnalysis/Scripts/addNewField.php";
}

function removeCurrentField(){
	for(i=0;i<tableList.length;++i){
		if(tableList[i].tableName==tableName){
			tableList.splice((i+1), 1);
			break;
		}
	}
	var table_id = getSelectedValue("currentFields");
	var send="table_id="+table_id;
	var sendTo = "/ALAnew/DataAnalysis/Scripts/removeCurrentField.php";
}

function fillTableList(){
	var send = "";
	var sendTo = "/ALAnew/DataAnalysis/Scripts/fillTableList.php";
	pingServer(send, sendTo);
}

function fillCurrentTableList(){
	var send = "id=currentFields";
	var sendTo = "/ALAnew/DataAnalysis/Scripts/fillCurrentTableList.php";
	pingServer(send, sendTo);
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
		addOption("newField", table.fieldList[i],table.fieldList[i]);
	}
}