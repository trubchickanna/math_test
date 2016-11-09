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
	
	this.renderTask = function(id){
		this.task_number.innerHTML = '<p> Задача № '+(id+1)+'.</p>';
		this.task_question.innerHTML = '<p>'+this._model.getTaskById(id).question+'</p>';
	};
	
	this.getTaskFromModel = function(){
		var taskById = this._model.getDataFromJson(this._taskId);
	};
};

var myTask=new task.ViewTask(0);
myTask.renderTask(1);