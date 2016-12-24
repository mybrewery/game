'use strict';

define(['config/field'], function(config) {

    var Cell = function( /*obj*/ options, /*obj*/ parent) {
        this.element = document.createElement('div');
        this.element.classList.add('cell');

        this.options = options;

        this.setSize(options.size);
        this.setColor(options.color);
        this.setPosition(options.x, options.y);

        this.element.addEventListener('click', function(evt) {
            this.onClick(evt);
        }.bind(this), false);

        parent.appendChild(this.element);
    };

    Cell.prototype = {
        setPosition: function(x, y) {
            this.element.style.left = ((100 / this.options.size) * x) + '%';
            this.element.style.top = ((100 / this.options.size) * y) + '%';
        },
        setSize: function(size) {
            this.element.style.width = (100 / size) + '%';
            this.element.style.height = (100 / size) + '%';
        },
        setColor: function( /*num*/ id) {
            this.options.color = id;
            this.element.style.backgroundColor = config.colors[id];
        },
        getColor: function() {
            return this.options.color;
        },
        sameColor: function( /*obj*/ cell) {
            return (cell.options.color === this.options.color);
        },
        setSelected: function( /*bool*/ isSelected) {
            if (isSelected) {
                this.element.classList.add('selected');
            } else {
                this.element.classList.remove('selected')
            }
        },
        getSelected: function() {
            return this.element.classList.contains('selected');
        },
        /*on-click callback*/
        onClick: function( /*obj*/ evt) {
            onCellClick(this, field);
        }
    };

    return Cell;

});