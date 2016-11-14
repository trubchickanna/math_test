var task = task || {};

task.modelTask = {
    _data: null,
	
	init: function(data){
        this.setDataFromJson(data);
    },

    setDataFromJson: function(data) {
	   this._data = JSON.parse(data);
    },

    getTaskById: function(id) {
        for(var i = 0; i < this._data.length; i++) {
            for(var key in this._data[i]) {
                if(key === 'id' && this._data[i][key] == id) {
                   return this._data[i];
                }
            }
        }
    },
	
	getNextId: function(id){
		return this.nextId = id + 1;
	}
};

task.modelTask.init(taskData);

task.ViewTask = function(id) {
	this._model = task.modelTask;
	this.currentTask = this._model.getTaskById(id);
	this.elem = document.getElementById("task");
	this.elemTaskNumber = this.elem.querySelector(".task-number");
	this.elemTaskQuestion = this.elem.querySelector(".task-question");
	this.elemTaskAnswers = document.getElementById("answers");
	this.elemNextQuestionButton = document.getElementById("next-question-btn");
	var self = this;
	
	this.init = function(){
		this.renderTask(this.currentTask);
		
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
			elemInput.setAttribute("name","optionsRadios");
			elemInput.setAttribute("value",taskObj.answers[i].decision);			
			elemLabel.appendChild(elemInput);
			elemLabel.insertAdjacentText("beforeEnd",taskObj.answers[i].decision);			
			elemListItem.appendChild(elemLabel);			
			this.elemTaskAnswers.appendChild(elemListItem);
		}
	};
	
	this.reRender = function(){
		var nextTaskId = this._model.getNextId(id);
		id = nextTaskId;
		if (id <= this._model._data.length){
			while(this.elemTaskAnswers.firstChild){
				this.elemTaskAnswers.removeChild(this.elemTaskAnswers.firstChild);
			}
			var nextTask = this._model.getTaskById(id);
			this.renderTask(nextTask);
		} else{
			alert("Конец теста");
		}
	}
	
	this.init();
};

var myTask=new task.ViewTask(1);