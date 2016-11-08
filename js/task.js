var task = task || {};

task.modelTask = {
    _data: null,
	
	init: function(data){
        this.setDataFromJson(data);
    },

    setDataFromJson: function(data) {
       this._data = data;
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

task.modelTask.init(TaskData);

task.ViewTask = function(taskId) {
    this._taskId = taskId;
	console.log(_taskId);
};