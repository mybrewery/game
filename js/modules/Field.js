'use strict';
define(['config/field', 'modules/Cell'], function(config, Cell) {

	console.log(config);

    var Field = function(/*obj*/ parent) {
        this.element = document.createElement('div');
        this.element.classList.add('field');

        this.cells = [];

        for (var a = 0; a < config.grid; a++) {
            this.cells[a] = [];
            for (var b = 0; b < config.grid; b++) {
                this.cells[a][b] = new Cell({
                    size: config.grid,
                    x: a,
                    y: b,
                    color: Math.floor(Math.random() * config.colors.length)
                }, this.element);
            }
        }

        this.resize();
        window.addEventListener('resize', this.resize.bind(this));

        parent.appendChild(this.element);
    };

    Field.prototype = {
        resize: function() {
            var value = 0;
            if (window.innerWidth > window.innerHeight) {
                value = (config.size * window.innerHeight) + 'px';
            } else {
                value = (config.size * window.innerWidth) + 'px';
            }

            this.element.style.width = this.element.style.height = value;
        },
        getCell: function(x, y) {
            return this.cells[x][y];
        }
    };

    return Field;

});