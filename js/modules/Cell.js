'use strict';

define([
    'config/field',
    'postal'
    ], function(config, postal) {

    var Cell = function(/*obj*/options, /*obj*/parent) {
        this.parent = parent;

        this.element = document.createElement('div');
        this.element.classList.add('cell');

        this.x = options.x;
        this.y = options.y;
        this.color = options.color;
        this.size = options.size;

        this.setSize(options.size);
        this.setColor(options.color);
        this.setXY(options.x, options.y);

        this.element.addEventListener('click', function(evt) {
            this.onClick(evt);
        }.bind(this), false);

        this.state = 'default';

        this.attach();
    };

    Cell.prototype = {
        /*методы для прикрепления и открпеления целла к родительскому контейнеру*/
        attach : function(){
            this.parent.appendChild(this.element);
        },
        detach : function(){
            this.parent.removeChild(this.element);
        },
        /*мгновенная установка позиции*/
        setXY: function(x, y) {
            this.x = x;
            this.y = y;

            this.element.style.left = ((100 / this.size) * x) + '%';
            this.element.style.top = ((100 / this.size) * y) + '%';
        },
        setSize: function(size) {
            this.element.style.width = (100 / size) + '%';
            this.element.style.height = (100 / size) + '%';
        },
        setColor: function(/*num*/id) {
            this.color = id;
            this.element.style.backgroundColor = config.colors[id];
        },
        /*состояния - добавляет к ячейке класс с именем, которое передеается в качестве аргумента
          сбрасывая все предыдущие состояния*/
        setState : function(/*str*/stateName){
            this.resetState();
            this.element.classList.add(stateName);
            this.state = stateName;
        },
        resetState : function(){
            for (var a = 0; a < config.cellStyles; a++){
                this.element.classList.remove(config.cellStyles[a]);
            }

            this.state = 'default';
        },
        /*действие при клике*/
        onClick: function( /*obj*/ evt){
            postal.publish({
                channel : 'cells',
                topic : 'clicked',
                data : {
                    evt : evt,
                    cell : this
                }
            });
        }
    };

    return Cell;

});