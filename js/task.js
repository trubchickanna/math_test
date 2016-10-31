var app = app || {};

app.modelTask = {
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

cinema.modelTask.init(TaskData);