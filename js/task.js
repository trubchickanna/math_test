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
		}
    },

    setDataFromJson: function(data) {
	   this._data = JSON.parse(data);
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
	this.elemTaskNumber = this.elem.querySelector(".task-number");
	this.elemTaskQuestion = this.elem.querySelector(".task-question");
	this.elemTaskAnswers = document.getElementById("answers");
	this.elemNextQuestionButton = document.getElementById("next-question-btn");
	this.currentTaskId = id;
	this._data = this._model._data;
	var taskId = null;
	var ansId = null;
	this.page = document.getElementById("page");
	var self = this;
	
	this.init = function(){
		if (this.currentTask != undefined){
			this.renderTask(this.currentTask);
		}
		
		this.elemNextQuestionButton.addEventListener("click",function(){
			answersUser.setAnswer(taskId,ansId);
			self.reRender();
		});
	}
	
	this.renderTask = function(taskObj){
		this.elemTaskNumber.innerText = 'Задача № '+taskObj.id+'.';
		this.elemTaskQuestion.innerText = taskObj.question;
		for(var key in taskObj.answers){
			elemListItem = document.createElement("li");
			elemListItem.className = "radio";			
			elemLabel = document.createElement("label");									
			elemInput = document.createElement("input");
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
		}
	};
	
	this.renderLastPage = function(){
		this.elemTaskNumber.innerText = "Результат";
		this.elemTaskQuestion.innerHTML = answersUser.getAnswersUser();
		this.elemNextQuestionButton.remove();
	};
	
	this.reRender = function(){
		if (!this._model.getNextTask(this.currentTaskId)){
			while(this.elemTaskAnswers.firstChild){
				this.elemTaskAnswers.removeChild(this.elemTaskAnswers.firstChild);
			}
			this.renderLastPage();
		} else{
			while(this.elemTaskAnswers.firstChild){
				this.elemTaskAnswers.removeChild(this.elemTaskAnswers.firstChild);
			}
			this.currentTask = this._model.getNextTask(this.currentTaskId);
			this.currentTaskId = this.currentTask.id;
			this.renderTask(this.currentTask);
			this.elemNextQuestionButton.setAttribute("disabled","disabled");
		}
	};
	
	this.init();
};

var myTask=new task.ViewTask(1);

answersUser = {
	_answersArr:[],
	
	setAnswer: function (qId,aId){
		var answ = {};
		answ[qId] = aId;
		this._answersArr.push(answ);
	},
	
	getAnswersUser: function(){
		var str = "";
		for (i = 0; i < this._answersArr.length; i++){
			for (var key in this._answersArr[i]){
				str += key +":"+this._answersArr[i][key]+"<br>";
			}
		}
		return str;
	}
};