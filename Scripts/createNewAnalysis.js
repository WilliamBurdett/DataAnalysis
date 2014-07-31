
function clearArray(cArray){
	while(cArray.length > 0) {
		cArray.pop();
	}
}

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
				//alert(xmlhttpObject.responseText);
				//document.getElementById("lastText").innerHTML = xmlhttpObject.responseText;
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

function removeOption(id, value){
	var selectBox = document.getElementById(id);
	var index=-1;
	for(var i=0;i<selectBox.length;i++){
		if(selectBox[i].value==value){
			index=i;
		}
	}
	if(index!=-1){
		selectBox.remove( index);
	}
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