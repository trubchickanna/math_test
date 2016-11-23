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
	   var d = JSON.parse(data);
	   Object.defineProperty(task.modelTask, "_data", { value: d, enumerable: true, writable: false });
    },

    getTaskById: function(id) {
		if (id <= this._data.length){
			for(var i = 0; i < this._data.length; i++) {
				for(var key in this._data[i]) {
					if(key === 'id' && this._data[i][key] == id) {
						return this._data[i];
					}
				}
			}
		} else{
			return;
		}
	},
	
	getNextTask: function(id){
		this._nextId = ++id;
		if (this._nextId <= this._data.length){
			return this.getTaskById(this._nextId);
		}
	}
};

task.modelTask.init();

task.ViewTask = function(id) {
	this._model = task.modelTask;
	this.currentTask = this._model.getTaskById(id);
	this.elem = document.getElementById("task");
	this.elemTaskTitle = this.elem.querySelector(".task-title");
	this.elemTaskQuestion = this.elem.querySelector(".task-question");
	this.elemTaskAnswers = document.getElementById("answers");
	this.elemNextQuestionButton = document.getElementById("next-question-btn");
	this.currentTaskId = id;
	var taskId = null;
	var ansId = null;
	var self = this;
	
	this.init = function(){
		if (this.currentTask != undefined){
			this.renderTask(this.currentTask);
		}
		
		this.elemNextQuestionButton.addEventListener("click",function(){
			answersUser.setAnswer(taskId,ansId);
			self.reRender();
		});
	};
	
	this.renderTask = function(taskObj){
		if (taskObj.id === this._model._data.length){
			this.elemNextQuestionButton.innerText = "Завершить тест";
		}
		this.elemTaskTitle.innerText = 'Задача № '+taskObj.id+'.';
		this.elemTaskQuestion.innerText = taskObj.question;
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
		},this);
	};
	
	this.renderResults = function(){
		this.elemTaskTitle.innerText = "Результат";
		this.elemTaskQuestion.innerText = "";
		var correctAnswersUser = 0;
		var idAnswerUser;
		var elemTemplateTasks = document.getElementById("templateTasks");
		var templateTasks = _.template(elemTemplateTasks.innerHTML);
		for (var i = 0; i < answersUser._answersArr.length; i++){
			_.each(answersUser._answersArr[i],function(num,key){
				idAnswerUser = answersUser._answersArr[i][key];
				if (answersUser.comparisonAnswersUser(i,idAnswerUser) === true){
					var resultValues = {
						color : "green",
						id : this._model._data[i].id,
						question : this._model._data[i].question,
						answer : this._model._data[i].answers[idAnswerUser]
					}					
					this.elemTaskQuestion.insertAdjacentHTML("beforeEnd",templateTasks(resultValues));
					correctAnswersUser++;
				} else{
					var resultValues = {
						color : "red",
						id : this._model._data[i].id,
						question : this._model._data[i].question,
						answer : this._model._data[i].answers[idAnswerUser]
					}					
					this.elemTaskQuestion.insertAdjacentHTML("beforeEnd",templateTasks(resultValues));
				}
			},this);
		}
		
		var elemResult = document.getElementById("testResult");
		var templateResult = _.template(elemResult.innerHTML);
		var result = {
			correctAnswers : correctAnswersUser,
			length: this._model._data.length
		}		
		this.elemTaskQuestion.insertAdjacentHTML("beforeEnd",templateResult(result));
		this.elemNextQuestionButton.remove();
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