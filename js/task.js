var task = task || {};

task.modelTask = {
    _data: null,
	
	init: function(data){
        this.setDataFromJson(data);
    },

    setDataFromJson: function(data) {
	   this._data = JSON.parse(data);
	   console.log(this._data[1].question);
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
	
	this.elem = document.getElementById("task");
	
	this.renderTask = function(id){
		console.log(id);
	};
	
	this.getTaskFromModel = function(){
		var taskById = this._model.getTaskById(this._taskId);
	};
};

var myTask=new task.ViewTask(5);