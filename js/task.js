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
	this.elemAnswers = document.getElementById("answers");
	
	this.renderTask = function(taskObj){
		this.elemTaskNumber.innerHTML = '<p> Задача № '+taskObj.id+'.</p>';
		this.elemTaskQuestion.innerHTML = '<p>'+taskObj.question+'</p>';
		for(i = 0; i < taskObj.answers.length; i++){
			this.li = document.createElement("li");
			this.li.className = "radio";
			
			this.label = document.createElement("label");
									
			this.input = document.createElement("input");
			this.input.setAttribute("type","radio");
			this.input.setAttribute("name","optionsRadios");
			this.input.setAttribute("value",taskObj.answers[i].decision);
			
			this.label.appendChild(this.input);			
			this.label.insertAdjacentText("beforeEnd",taskObj.answers[i].decision);
			
			this.li.appendChild(this.label);
			
			this.elemAnswers.appendChild(this.li);
		}
	};
	
	this.getTaskFromModelById = function(){
		var taskById = this._model.getTaskById(this._taskId);
		this.renderTask(taskById);
	};
};

var myTask=new task.ViewTask(2);
myTask.getTaskFromModelById();