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
			console.log(xhr);
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
	},
	
	setUserAnswer: function(){
		console.log("ok");
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
	var self = this;
	
	this.init = function(){
		if (this.currentTask != undefined){
			this.renderTask(this.currentTask);
		}
		
		this.elemNextQuestionButton.addEventListener("click",function(){
			self.reRender();
		});
	}
	
	this.renderTask = function(taskObj){
		this.elemTaskNumber.innerText = 'Задача № '+taskObj.id+'.';
		this.elemTaskQuestion.innerText = taskObj.question;
		for(i = 0; i < taskObj.answers.length; i++){
			elemListItem = document.createElement("li");
			elemListItem.className = "radio";			
			elemLabel = document.createElement("label");									
			elemInput = document.createElement("input");
			elemInput.setAttribute("type","radio");
			elemInput.addEventListener("click",function(){
				self._model.setUserAnswer();
			});
			elemInput.setAttribute("name","optionsRadios");
			elemInput.setAttribute("value",taskObj.answers[i].decision);			
			elemLabel.appendChild(elemInput);
			elemLabel.insertAdjacentText("beforeEnd",taskObj.answers[i].decision);			
			elemListItem.appendChild(elemLabel);			
			this.elemTaskAnswers.appendChild(elemListItem);
		}
	};
	
	this.reRender = function(){
		if (!this._model.getNextTask(this.currentTaskId)){
			alert("Конец теста");
		} else{
			while(this.elemTaskAnswers.firstChild){
				this.elemTaskAnswers.removeChild(this.elemTaskAnswers.firstChild);
			}
			this.currentTask = this._model.getNextTask(this.currentTaskId);
			this.currentTaskId = this.currentTask.id;
			this.renderTask(this.currentTask);
		}
	}
	
	this.init();
};

var myTask=new task.ViewTask(1);