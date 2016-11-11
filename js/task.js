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
	
	this.init = function(){
		this.renderTask(this.currentTask);
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
	
	/*this.getTaskFromModelById = function(id){
		return this._model.getTaskById(id);
	};
	
	var self = this;
	this.reRender = function(){
		while(self.elemTaskAnswers.firstChild){
			self.elemTaskAnswers.removeChild(self.elemTaskAnswers.firstChild);
		}
		self._taskId = self._taskId + 1;
		var nextQ = self._model.getTaskById(self._taskId);
		self.renderTask(nextQ);
	}
	
	this.elemNextQuestionButton.addEventListener("click",this.reRender);*/
	
	this.init();
};

var myTask=new task.ViewTask(3);
//myTask.getTaskFromModelById();