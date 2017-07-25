
var store = [];
var listdiv = document.getElementById("item");
var inputnew = document.getElementById("new-todo-item");
var todos = document.getElementById("todos");




makebutton = function(type){
	var but = '<button' + " class='" + type + "'" + 'type="button">' + type + '</button>';
	return  but;
}

displaychanges = function(){
	//clear what is dia already
	todos.innerHTML = "";
	//fetch from store
	for (var i = store.length - 1; i >= 0; i--) {
		displayitem(store[i]);
	}

	//ddisplayitem(isplay
}

displayitem = function(item){
	todos.innerHTML += "<li>" + "<span class='status'>UNDONE</span>"  + item + makebutton("Delete") + makebutton("Edit") +  makebutton("MarkAsDone") + "</li>";
}

document.getElementById('form').onsubmit = function(event){
	event.preventDefault();
	if((inputnew.value == "") || (inputnew.value.length < 1)){
		alert("Todo item must not be blank and it must be longer than two characters.");
		return;
	}
	store.push( inputnew.value.trim());
	inputnew.value = "";
	displaychanges();
	putEventListeners();
}

function putEventListeners(){
	//mark as done
	var btnMark = document.getElementsByClassName("MarkAsDone");
	var btnDelete = document.getElementsByClassName("Delete");
	var btnEdit = document.getElementsByClassName("Edit");
	for (var i = btnMark.length - 1; i >= 0; i--) {
		btnMark[i].addEventListener('click', markDone);
		btnDelete[i].addEventListener('click', deleteTask);
		btnEdit[i].addEventListener('click', editTask(i));
	}
}

function markDone(event){
	event.target.previousElementSibling.previousElementSibling.previousElementSibling.style.color = "Green"
	event.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText = "Done ";
	event.target.style.display = "none";
	event.target.previousElementSibling.style.display = "none";
}

deleteTask = function(event){
	store.splice(store.indexOf(event.target.previousSibling.textContent),1);
	//console.log(store);
	displaychanges();
	putEventListeners();
}

editTask = function(i){
	return function(event){
	var greg = event.target.previousSibling.previousSibling.textContent;
	document.getElementById("btnSubmit").innerText = "Edit Task";
	inputnew.value = greg.toString();
	actuallyedit(greg);
	document.getElementById("btnSubmit").innerText = "Create";
	
	//console.log(i);
	}
}

actuallyedit = function(greg){
	store[store.indexOf(greg)] = inputnew.value.trim();
	store.splice(store.indexOf(greg),1);
}
