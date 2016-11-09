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
	this.task_number = document.getElementById("task_number");
	this.task_question = document.getElementById("task_question");
	
	this.renderTask = function(taskObj){
		this.task_number.innerHTML = '<p> Задача № '+(taskObj.id+1)+'.</p>';
		this.task_question.innerHTML = '<p>'+taskObj.question+'</p>';
	};
	
	this.getTaskFromModelById = function(){
		var taskById = this._model.getTaskById(this._taskId);
		this.renderTask(taskById);
	};
};

var myTask=new task.ViewTask(1);
myTask.getTaskFromModelById();