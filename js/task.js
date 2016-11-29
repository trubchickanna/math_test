"use strict";

var task = task || {};

task.modelTask = {
    _data: null,
	_nextId: null,
	_userAnswer: null,
	
	init: function(data){
        var xhr = new XMLHttpRequest();
		var taskData;
		xhr.open('GET', '../json/taskData.json', false);
		xhr.send();
		
		if (xhr.status != 200) {
			alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
		} else {
			taskData = JSON.parse(JSON.stringify(xhr.responseText).replace(/\\n/g,"\\n"));
			this.setDataFromJson(taskData);
		};
    },
	
	setDataFromJson: function(data) {
	   var _data = JSON.parse(data);
	   Object.defineProperty(task.modelTask, "_data", { value: _data, enumerable: true, writable: false });
    },

    getTaskById: function(id) {
		if (id <= this._data.length){
			var result = _.findWhere(this._data, {id : id});
			return result;
		} else{
			return;
		}
	},
	
	getNextTask: function(id){
		this._nextId = ++id;
		if (this._nextId <= this._data.length){
			return this.getTaskById(this._nextId);
		}
	},
	
	getData: function(i){
		if (i < this._data.length){
			return this._data[i];
		} else{
			return;
		}
	},
	
	getDataLength: function(){
		return this._data.length;
	}
};

task.modelTask.init();

task.ViewTask = function(id) {
	this._model = task.modelTask;
	this.currentTask = this._model.getTaskById(id);
	this.elemContainer = document.getElementById("container");
	this.elemTaskContainer = document.getElementById("taskContainer");
	this.elemAnswersContainer = document.getElementById("answersContainer");
	this.elemAnswersContainer = document.getElementById("answersContainer");
	this.elemButtonContainer = document.getElementById("buttonContainer");
	this.currentTaskId = id;
	this.elemTemplateTasks = document.getElementById("templateTasks");
	this.elemResult = document.getElementById("testResult");
	var taskId = null;
	var ansId = null;
	var self = this;
	
	this.init = function(){
		if (this.currentTask != undefined){
			this.renderTask(this.currentTask);
		}
		
		/*this.elemNextQuestionButton.addEventListener("click",function(){
			answersUser.setAnswer(taskId,ansId);
			self.reRender();
		});*/
	};
	
	this.renderTask = function(taskObj){
		var taskTemplate = _.template(this.elemTaskContainer.innerHTML);
		var task = {
				taskTitle: taskObj.id,
				taskQuestion: taskObj.question
		}
		this.elemContainer.insertAdjacentHTML("afterBegin",taskTemplate(task));
		var elemPanel = document.getElementById("panel");
		var answersTemplate = _.template(this.elemAnswersContainer.innerHTML);
		var ans = {
			answers: taskObj.answers
		}
		elemPanel.insertAdjacentHTML("beforeEnd",answersTemplate(ans));
		var buttonTemplate = _.template(this.elemButtonContainer.innerHTML);
		var but = {
			buttonText: "Следующий вопрос"
		}
		if (taskObj.id === this._model.getDataLength()){
			but.buttonText = "Завершить тест";
		}
		elemPanel.insertAdjacentHTML("beforeEnd",buttonTemplate(but));
		/*
		_.each(taskObj.answers,function(num,key){
			var elemListItem = document.createElement("li");
			elemListItem.className = "radio";			
			var elemLabel = document.createElement("label");									
			var elemInput = document.createElement("input");
			elemInput.setAttribute("type","radio");
			elemInput.setAttribute("name","optionsRadios");
			elemInput.setAttribute("value",key);
			elemInput.addEventListener("click",function(){
				self.elemNextQuestionButton.removeAttribute("disabled");
				ansId = this.value;
				ansId = Number(ansId);
				taskId = taskObj.id;
			});
			elemLabel.appendChild(elemInput);
			elemLabel.insertAdjacentText("beforeEnd",taskObj.answers[key]);			
			elemListItem.appendChild(elemLabel);			
			this.elemTaskAnswers.appendChild(elemListItem);
		},this);*/
	};
	
	this.renderResults = function(){
		console.log("finish");
		/*this.elemTaskTitle.innerText = "Результат";
		this.elemTaskQuestion.innerText = "";
		var correctAnswersUser = 0;
		var idAnswerUser;
		var templateTasks = _.template(this.elemTemplateTasks.innerHTML);
		var resultValues = {
			color : "green",
			id : this._model.getData(i).id,
			question : this._model.getData(i).question,
			answer : this._model.getData(i).answers[idAnswerUser]
		}
		for (var i = 0; i < answersUser._answersArr.length; i++){
			_.each(answersUser._answersArr[i],function(num,key){
				idAnswerUser = answersUser._answersArr[i][key];
				if (answersUser.comparisonAnswersUser(i,idAnswerUser) === true){					
					correctAnswersUser++;
				} else{
					resultValues.color = "red";
				}
			});
		}

		this.elemTaskQuestion.insertAdjacentHTML("beforeEnd",templateTasks(resultValues));		
		var templateResult = _.template(this.elemResult.innerHTML);
		var result = {
			correctAnswers : correctAnswersUser
		}		
		this.elemTaskQuestion.insertAdjacentHTML("beforeEnd",templateResult(result));
		this.elemNextQuestionButton.remove();*/
	};
	
	this.reRender = function(){
		while(this.elemTaskAnswers.firstChild){
			this.elemTaskAnswers.removeChild(this.elemTaskAnswers.firstChild);
		}
		if (!this._model.getNextTask(this.currentTaskId)){
			this.renderResults();
		} else{
			this.currentTask = this._model.getNextTask(this.currentTaskId);
			this.currentTaskId = this.currentTask.id;
			this.renderTask(this.currentTask);
			this.elemNextQuestionButton.setAttribute("disabled","disabled");
		}
	};
	
	this.init();
};

var myTask=new task.ViewTask(1);

var answersUser = {
	_answersArr:[],
	
	setAnswer: function (qId,aId){
		var answ = {};
		answ[qId] = aId;
		this._answersArr.push(answ);
	},
	
	comparisonAnswersUser: function(q,a){
		if (a === task.modelTask._data[q].correctAnswer){
			return true;
		} else {
			return false;
		}
	}
};