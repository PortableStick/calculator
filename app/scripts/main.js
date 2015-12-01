(function () {
    'use strict';

    function calculator() {
        return {
            inputVal: '',
            latestEntry: [],
            operatorBoolean: true,
            periodBoolean: false,
            canUndo: false,
            appendToInput: function (input) {
                input = input.toString();
                this.inputVal += input;
                this.latestEntry.push(input);
                this.updateDOM();
            },
            undo: function () {
                if (this.canUndo) {
                    var latestEntryLength = this.latestEntry.length - 1,
                        lastEntry = this.latestEntry[latestEntryLength],
                        lengthDifference = this.inputVal.length - lastEntry.length;

                    if (lastEntry === '.') {
                        this.periodBoolean = false;
                    } else if (this.isOperator(this.latestEntry[latestEntryLength])) {
                        this.operatorBoolean = false;
                    }
                    this.inputVal = this.inputVal.slice(0, lengthDifference);
                    this.latestEntry.pop();
                    if (latestEntryLength === 0) {
                        this.canUndo = false;
                    }
                }
            },
            isOperator: function (input) {
                if (input === '+' || input === '-' || input === '*' || input === '/') {
                    return true;
                } else {
                    return false;
                }
            },
            clear: function () {
                this.inputVal = '';
                this.latestEntry = [];
            },
            equals: function () {
                this.inputVal = eval(this.inputVal);
                this.inputVal = this.inputVal.toString();
            },
            setupDOM: function () {
                var context = this;

                $('.numKey').click(function () {
                    context.operatorBoolean = false;
                    context.canUndo = true;
                    $('.undo').removeClass('disabled');
                    context.appendToInput($(this).html());
                });
                $('.operator').click(function () {
                    if (context.operatorBoolean === true) {
                        return;
                    } else {
                        context.operatorBoolean = true;
                        context.appendToInput($(this).html());
                        context.periodBoolean = false;
                    }
                });
                $('.period').click(function () {
                    if (context.periodBoolean === true) {
                        return;
                    } else {
                        context.periodBoolean = true;
                        context.appendToInput($(this).html());
                    }
                });

                $('.clear').click(function () {
                    context.clear();
                    context.periodBoolean = false;
                    context.operatorBoolean = true;
                    context.updateDOM();
                });

                $('.undo').click(function () {
                    context.undo();
                    context.updateDOM();
                });
                $('.equals').click(function () {
                    if (context.inputVal) {
                        context.equals();
                        context.updateDOM();
                        context.canUndo = false;
                        $('.undo').addClass('disabled');
                    }
                });
            },
            updateDOM: (function () {
                return function () {
                    $('#inputScreen').html(this.inputVal);
                };
            }())
        };
}

var calc = calculator();
    calc.setupDOM();

}());
