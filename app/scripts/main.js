function calculator() {
  var inputVal = '',
  latestEntry = [],
  operatorBoolean = true,
  periodBoolean = false,
  canUndo = false,
  /* cache jQuery refs */
  $inputScreen = $('#inputScreen'),
  $undo = $('.undo'),
  $equals = $('.equals'),
  $operator = $('.operator'),
  $numkey = $('.numKey'),
  $period = $('.period'),
  $clear = $('.clear');

  function updateDOM(){
    $inputScreen.html(inputVal);
  }

  function appendToInput(input) {
    input = input.toString();
    inputVal += input;
    latestEntry.push(input);
    updateDOM();
  }

  function undo() {
    if (canUndo) {
      var latestEntryLength = latestEntry.length - 1,
      lastEntry = latestEntry[latestEntryLength],
      lengthDifference = inputVal.length - lastEntry.length;

      if (lastEntry === '.') {
        periodBoolean = false;
      } else if (isOperator(lastEntry)) {
        operatorBoolean = false;
      }
      inputVal = inputVal.slice(0, lengthDifference);
      latestEntry.pop();
      if (latestEntryLength === 0) {
        canUndo = false;
      }
    }
  }

  function isOperator(input) {
    if (input === '+' || input === '-' || input === '*' || input === '/') {
      return true;
    } else {
      return false;
    }
  }

  function clear() {
    inputVal = '';
    latestEntry = [];
  }

  function equals() {
    /* eslint no-eval: 0 */
    inputVal = eval(inputVal);
    inputVal = inputVal.toString();
  }

  function turnOnUndo() {
    canUndo = true;
    $undo.removeClass('disabled');
  }

  function setupDOM() {

    $numkey.click(function handleNumKey() {

      operatorBoolean = false;
      turnOnUndo();
      appendToInput($(this).html());

    });
    $operator.click(function handleOperator() {

      if (operatorBoolean === true) {

        return;

      } else {

        operatorBoolean = true;
        turnOnUndo();
        appendToInput($(this).html());
        periodBoolean = false;

      }
    });
    $period.click(function handlePeriod() {

      if (periodBoolean === true) {

        return;

      } else {

        periodBoolean = true;
        appendToInput($(this).html());

      }
    });

    $clear.click(function handleClear() {

      clear();
      periodBoolean = false;
      operatorBoolean = true;
      updateDOM();

    });

    $undo.click(function handleUndo() {

      undo();
      updateDOM();

    });
    $equals.click(function handleEquals() {

      if (inputVal) {

        equals();
        updateDOM();
        canUndo = false;
        $undo.addClass('disabled');

      }
    });
  }

  var publicApi = {
    setupDOM: setupDOM
  };

  return publicApi;

}

$(document).ready(calculator().setupDOM());
