var consolidateList = [];
var table_id=0;

function setup(){
	fillCurrentTableList();
}

function fillCurrentTableList(){
	var send = "id=currentFields";
	var sendTo = "/ALAnew/DataAnalysis/Scripts/SkipAndConsolidate/fillCurrentFieldList.php";
	pingServer(send, sendTo);
}

function chooseField(){
	clearSelectBox("distinctValues");
	clearSelectBox("skipListPossibleValues");
	clearSelectBox("skipListCurrentValues");
	clearSelectBox("consolidateListViewNewMatchList");
	clearSelectBox("consolidateListCurrentValue");
	clearSelectBox("consolidateListCurrentMatchList");
	clearArray(consolidateList);
	document.getElementById("consolidateListREGEXP").value="";
	
	table_id=getSelectedValue("currentFields");
	resetLists();
}

function resetLists(){
	fillDistinctValues();
	fillSkipListCurrentValues();
	fillSkipListPossibleValues();
	fillConsolidateArray();
	clearSelectBox("consolidateListCurrentMatchList");
}

function consolidateListViewNew(){
	var regexp = document.getElementById("consolidateListREGEXP").value;
	if(regexp!=""){
		var id = "consolidateListViewNewMatchList";
		var send = "regexp=" + regexp + "&table_id=" + table_id + "&id=" + id;
		var sendTo="/ALAnew/DataAnalysis/Scripts/SkipAndConsolidate/consolidateListViewNew.php";
		pingServer(send, sendTo);
	}
}

function addToConsolidateList(){
	var matchListSelectBox = document.getElementById('consolidateListViewNewMatchList');
	
	var test=false;
	var i;
	var j;
	var k;
	for(i=0;i<consolidateList.length;++i){
		for(j=0;j<Object.keys(consolidateList[i].matchList).length;++j){
			for(k=0;k<matchListSelectBox.length;k++){
				if(matchListSelectBox[k].value==consolidateList[i].matchList[j]){
					test=true;
				}
			}
		}
	}
	if(test===false){
		var regexp = document.getElementById("consolidateListREGEXP").value;
		var send = "regexp=" + regexp + "&table_id=" + table_id;
		var sendTo="/ALAnew/DataAnalysis/Scripts/SkipAndConsolidate/addToConsolidateList.php";
		pingServer(send, sendTo);
	}
	else{
		alert("Consolidate values must not overlap.");
	}
}

function removeFromConsolidateList(){
	if(document.getElementById("consolidateListCurrentValue").selectedIndex!=-1){
		var value=getSelectedValue("consolidateListCurrentValue");
		
		var send = "value=" + value + "&table_id=" + table_id;
		var sendTo="/ALAnew/DataAnalysis/Scripts/SkipAndConsolidate/removeFromConsolidateList.php";
		pingServer(send, sendTo);
		
		deselectSelectBox("consolidateListCurrentValue");
	}
}

function addToSkipList(){
	if(document.getElementById("skipListPossibleValues").selectedIndex!=-1){
		var value=getSelectedValue("skipListPossibleValues");
		
		var send = "value=" + value + "&table_id=" + table_id;
		var sendTo="/ALAnew/DataAnalysis/Scripts/SkipAndConsolidate/addToSkipList.php";
		pingServer(send, sendTo);
		
		addOption("skipListCurrentValues", value, value);
		var possibleSelectBox = document.getElementById("skipListPossibleValues");
		possibleSelectBox.removeChild(possibleSelectBox[possibleSelectBox.selectedIndex]);
	}
}

function removeFromSkipList(){
	if(document.getElementById("skipListCurrentValues").selectedIndex!=-1){
		var value=getSelectedValue("skipListCurrentValues");
		
		var send = "value=" + value + "&table_id=" + table_id;
		var sendTo="/ALAnew/DataAnalysis/Scripts/SkipAndConsolidate/removeFromSkipList.php";
		pingServer(send, sendTo);
		
		addOption("skipListCurrentValues", value, value);
		var currentSelectBox = document.getElementById("skipListCurrentValues");
		currentSelectBox.removeChild(currentSelectBox[currentSelectBox.selectedIndex]);
	}
}

function fillDistinctValues(){
	var id = "distinctValues";
	clearSelectBox(id);
	var send = "table_id=" + table_id + "&id=" + id;
	var sendTo="/ALAnew/DataAnalysis/Scripts/SkipAndConsolidate/fillDistinctValues.php";
	pingServer(send, sendTo);
}

function consolidateListViewCurrentREGEXP(){
	if(document.getElementById("consolidateListCurrentValue").selectedIndex!=-1){
		var value = getSelectedValue("consolidateListCurrentValue");
		var consolidate;
		for(i=0;i<consolidateList.length;++i){
			if(consolidateList[i].value==value){
				consolidate = consolidateList[i];
			}
		}
		clearSelectBox("consolidateListCurrentMatchList");
		for(i=0;i<Object.keys(consolidate.matchList).length;++i){
			addOption("consolidateListCurrentMatchList", consolidate.matchList[i],consolidate.matchList[i]);
		}
	}
}

function fillSkipListPossibleValues(){
	var id = "skipListPossibleValues";
	clearSelectBox(id);
	var send = "table_id=" + table_id + "&id=" + id;
	var sendTo="/ALAnew/DataAnalysis/Scripts/SkipAndConsolidate/fillSkipListPossibleValues.php";
	pingServer(send, sendTo);
}

function fillSkipListCurrentValues(){
	var id = "skipListCurrentValues";
	clearSelectBox(id);
	var send = "table_id=" + table_id + "&id=" + id;
	var sendTo = "/ALAnew/DataAnalysis/Scripts/SkipAndConsolidate/fillSkipListCurrentValues.php";
	pingServer(send, sendTo);
}
function fillConsolidateArray(){
	var send = "table_id=" + table_id;
	var sendTo = "/ALAnew/DataAnalysis/Scripts/SkipAndConsolidate/fillConsolidateArray.php";
	pingServer(send, sendTo);
}

function fillConsolidateListValues(){
	clearSelectBox("consolidateListCurrentValue");
	var i;
	for(i=0;i<consolidateList.length;++i){
		addOption("consolidateListCurrentValue", consolidateList[i].value, consolidateList[i].value);
	}
}