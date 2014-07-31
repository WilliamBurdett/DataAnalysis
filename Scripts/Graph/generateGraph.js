var graphSelected;
var formulaList = [];
	//formulaName
	//formula_id
	//tableNumber (default 0)

function setup(){
	fillGraphs();
	fillFields();
	fillFormulas();
}

function resetGraphAndField(){
	resetFormula();
	deselectSelectBox('currentGraphs');
	deselectSelectBox('currentFields');
}

function fillGraphs(){
	addOption("currentGraphs", "Line Graph", "line");
	addOption("currentGraphs", "Combo Graph", "combo");
	addOption("currentGraphs", "Bubble Graph", "bubble");
}

function fillFields(){
	var send = "";
	var sendTo = "/ALAnew/DataAnalysis/Scripts/Graph/fillFields.php";
	pingServer(send, sendTo);
}

function fillFormulaArray(){
	var send = "";
	var sendTo = "/ALAnew/DataAnalysis/Scripts/Graph/fillFormulaArray.php";
	pingServer(send, sendTo);
}

function setupFormulaTable(){
	for(i=0;i<formulaList.length;++i){
		if(formulaList[i].tableNumber==0){
			addOption('currentFormulas1', formulaList[i].formulaName, formulaList[i].formula_id);
		}
	}
}

function fillFormulaTable(id){
	var currentTableId = 'currentFormulas' + id;
	var nextId = id+1;
	var formula_id = getSelectedValue(currentTableId);
	
	var i;
	for(i=0;i<formulaList.length;++i){
		if(formulaList[i].tableNumber>=id){
			formulaList[i].tableNumber=0;
		}
	}
	for(i=0;i<formulaList.length;++i){
		if(formulaList[i].formula_id==formula_id){
			formulaList[i].tableNumber=id;
		}
	}
	for(i=id+1;i<=3;i++){
		clearSelectBox('currentFormulas'+i);
	}
	for(i=0;i<formulaList.length;++i){
		if(formulaList[i].tableNumber==0){
			addOption('currentFormulas'+nextId, formulaList[i].formulaName, formulaList[i].formula_id);
		}
	}
}

function resetFormula(){
	deselectSelectBox('currentFormulas1');
	for(i=0;i<formulaList.length;++i){
		formulaList[i].tableNumber=0;
	}
	for(i=2;i<=3;i++){
		clearSelectBox('currentFormulas'+i);
	}
	
}

function chooseGraph(){
	var graph = getSelectedValue("currentGraphs");
	if(graph=="bubble"){
		document.getElementById("formulaTwo").className="inlineBlockDiv";
		document.getElementById("formulaThree").className="inlineBlockDiv";
		document.getElementById("intervalSection").className="noDisplay";
		document.getElementById("formulaOneTitle").innerHTML="Horizontal Axis";
		
	}
	else{
		document.getElementById("formulaTwo").className="noDisplay";
		document.getElementById("formulaThree").className="noDisplay";
		document.getElementById("intervalSection").className="inlineBlockDiv";
		document.getElementById("formulaOneTitle").innerHTML="Formula";
	}
}

function generateGraph(){
	document.getElementById('form_formula_id').value = getSelectedValue('currentFormulas1');
	document.getElementById('form_formula_id2').value = getSelectedValue('currentFormulas2');
	document.getElementById('form_formula_id3').value = getSelectedValue('currentFormulas3');
	document.getElementById('form_startDate').value = getSelectedValue('currentFormulas1');
	document.getElementById('form_endDate').value = getSelectedValue('currentFormulas1');
	document.getElementById('form_type').value = getSelectedValue('currentFormulas1');
	document.getElementById('form_maxFields').value = getSelectedValue('currentFormulas1');
	document.getElementById('form_interval').value = getSelectedValue('currentFormulas1');
	document.getElementById('form_table_id').value = getSelectedValue('currentFields');
}