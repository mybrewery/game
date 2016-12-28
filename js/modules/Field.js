'use strict';
define(['config/field', 'modules/Cell'], function(config, Cell) {

	console.log(config);

    var Field = function(/*obj*/ parent) {
        this.element = document.createElement('div');
        this.element.classList.add('field');

        this.cellsPull = [];
        this.cellsMatrix = [];

        for (var a = 0; a < config.grid; a++) {
            this.cellsMatrix[a] = [];
            for (var b = 0; b < config.grid; b++) {
                this.cellsMatrix[a][b] = new Cell({
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
            if (this.cellsMatrix[x] && this.cellsMatrix[x][y]){            
                return this.cellsMatrix[x][y];
            } else {
                return false;
            }
        },
        /*методы для работы с пулом*/
        moveToPull : function(/*obj*/cell){
            this.cellsPull.push(cell);
            cell.detach();
            this.cellsMatrix[cell.x][cell.y] = false;
        },
        addFromPull : function(/*func*/callback){
            callback(this.cellsMatrix.pop());
        },
        /*Методы вовлеченные в алгоритм поиска соседей*/
        sibsIterate : function(/*obj*/cell, /*arr*/result){
            var sibCell;

            for (var a = 0; a < config.directions.length; a++){
                sibCell = this.getCell(cell.x + config.directions[a].x, cell.y + config.directions[a].y);

                if (sibCell && sibCell.color == cell.color && !this.sibsAlreadyFound(sibCell, result)){
                    result.push(sibCell);
                    this.sibsIterate(sibCell, result);
                }
            }
        },
        /*проверяет найден ли уже такое сосед*/
        sibsAlreadyFound : function(/*obj*/cell, /*arr*/result){
            for (var a = 0; a < result.length; a++){
                if (result[a].x == cell.x && result[a].y == cell.y){
                    return true;
                }
            }

            return false;
        },
        sibsGet : function(/*obj*/cell){
            var result = [cell];

            this.sibsIterate(cell, result);

            return result;
        }
    };

    return Field;

});