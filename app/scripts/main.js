(function () {
    'use strict';

    function calculator() {
        return {
            inputVal: "",
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

                    if (lastEntry === ".") {
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
                if (input === '+' || input === "-" || input === '*' || input === '/') {
                    return true;
                } else {
                    return false;
                }
            },
            clear: function () {
                this.inputVal = "";
                this.latestEntry = [];
            },
            equals: function () {
                this.inputVal = eval(this.inputVal);
                this.inputVal = this.inputVal.toString();
            },
            setupDOM: function () {
                var _this = this;

                $(".numKey").click(function () {
                    _this.operatorBoolean = false;
                    _this.canUndo = true;
                    $('.undo').removeClass('disabled');
                    _this.appendToInput($(this).html());
                });
                $(".operator").click(function () {
                    if (_this.operatorBoolean === true) {
                        return;
                    } else {
                        _this.operatorBoolean = true;
                        _this.appendToInput($(this).html());
                        _this.periodBoolean = false;
                    }
                });
                $(".period").click(function () {
                    if (_this.periodBoolean === true) {
                        return;
                    } else {
                        _this.periodBoolean = true;
                        _this.appendToInput($(this).html());
                    }
                });

                $('.clear').click(function () {
                    _this.clear();
                    _this.periodBoolean = false;
                    _this.operatorBoolean = true;
                    _this.updateDOM();
                });

                $(".undo").click(function () {
                    _this.undo();
                    _this.updateDOM();
                });
                $(".equals").click(function () {
                    if (_this.inputVal) {
                        _this.equals();
                        _this.updateDOM();
                        _this.canUndo = false;
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