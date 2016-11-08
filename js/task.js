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
    this._template = null;
    this._model = task.modelTask;
    this._taskId = taskId;
    this._templateId = 'taskTemplate';
    this._row = null;

    this.init = function() {
        this.getTemplate('taskTemplate');
        this.render();
    };

    this.render = function() {
        return this.taskTemplate(this._taskId);
    };

    this.getTemplate = function(templateId){
        this._template = document.getElementById(templateId).innerHTML;

        return this._template;
    };

    this.parseTemplate = function(markup){
        if (markup.toLowerCase().trim().indexOf('<!doctype') === 0) {
            var doc = document.implementation.createHTMLDocument("");
            doc.documentElement.innerHTML = markup;
            return doc;
        } else if ('content' in document.createElement('template')) {
            // Template tag exists!
            var el = document.createElement('template');
            el.innerHTML = markup;
            return el.content;
        } else {
            // Template tag doesn't exist!
            var docfrag = document.createDocumentFragment();
            var el = document.createElement('body');
            el.innerHTML = markup;
            for (var i = 0; 0 < el.childNodes.length;) {
                docfrag.appendChild(el.childNodes[i]);
            }
            return docfrag;
        }
    };

    this.taskTemplate = function(id) {
        var task = this._model.getTaskById(id);
        var template = this._template;
        var templateHTML;

        this._row = document.createElement('li');
        this._row.className = 'list-group-item';

        for(var key in task) {
            template = template.replace( new RegExp('\{\{' + key + '\}\}'), task[key]);
        }
        templateHTML = this.parseTemplate(template);

        this._row.appendChild(templateHTML);

        return this._row;
    };

};