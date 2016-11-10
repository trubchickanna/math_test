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

task.ViewTask = function(taskId) {
	this._taskId = taskId;
	this._model = task.modelTask;
	this.elemTask = document.getElementById("task");
	this.elemTaskNumber = this.elemTask.querySelector(".task_number");
	this.elemTaskQuestion = this.elemTask.querySelector(".task_question");
	this.elemAnswers = document.querySelectorAll("label");
	
	this.renderTask = function(taskObj){
		this.elemTaskNumber.innerHTML = '<p> Задача № '+taskObj.id+'.</p>';
		this.elemTaskQuestion.innerHTML = '<p>'+taskObj.question+'</p>';
		for(i = 0; i < this.elemAnswers.length; i++){
			this.answerText = document.createElement("p");
			this.answerText.innerHTML = taskObj.answers[i].decision;
			this.elemAnswers[i].appendChild(this.answerText);
		}
	};
	
	this.getTaskFromModelById = function(){
		var taskById = this._model.getTaskById(this._taskId);
		this.renderTask(taskById);
	};
};

var myTask=new task.ViewTask(1);
myTask.getTaskFromModelById();