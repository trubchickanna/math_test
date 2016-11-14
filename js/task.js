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
	
	getNextTask: function(сurrentTask){
		this.nextId = сurrentTask.id+1;
		if (this.nextId <= this._data.length){
			return this.getTaskById(this.nextId);
		}else{
			return false;
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
		if (!this._model.getNextTask(this.currentTask)){
			alert("Конец теста");
		} else{
			while(this.elemTaskAnswers.firstChild){
				this.elemTaskAnswers.removeChild(this.elemTaskAnswers.firstChild);
			}
			this.currentTask = this._model.getNextTask(this.currentTask);
			this.renderTask(this.currentTask);
		}
	}
	
	this.init();
};

var myTask=new task.ViewTask(1);