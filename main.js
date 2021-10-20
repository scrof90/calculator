const calc = {
  DISPLAY_WIDTH: 8,
  a: 0,
  b: 0,
  operator: null,
  floatMode: false,
};

function initBtns() {
  const numBtns = Array.from(document.querySelectorAll('.js-btn-num'));
  numBtns.forEach((btn) => (btn.onclick = inputNum));

  const opBtns = Array.from(document.querySelectorAll('.js-btn-operator'));
  opBtns.forEach((btn) => (btn.onclick = inputOperator));

  const equalsBtn = document.querySelector('.js-btn-equals');
  equalsBtn.onclick = operate;

  const clearBtn = document.querySelector('.js-btn-clear');
  clearBtn.onclick = clear;

  const signBtn = document.querySelector('.js-btn-flip-sign');
  signBtn.onclick = flipSign;

  const floatBtn = document.querySelector('.js-btn-point');
  floatBtn.onclick = floatMode;
}

function inputNum(e) {
  const num = e.target.textContent;
  const operand = !calc.operator ? 'a' : 'b';
  if (calc.floatMode) {
    if (isInt(calc[operand])) {
      calc[operand] = Number(`${calc[operand]}.${num}`);
    } else {
      calc[operand] = Number(`${calc[operand].toFixed(1)}${num}`);
    }
  } else {
    calc[operand] = Number(`${calc[operand]}${num}`);
  }
  updateDisplayValue(calc[operand]);
}

function inputOperator(e) {
  const op = e.target.dataset.operator;
  switch (op) {
    case 'divide':
      calc.operator = divide;
      break;
    case 'multiply':
      calc.operator = multiply;
      break;
    case 'subtract':
      calc.operator = subtract;
      break;
    case 'add':
      calc.operator = add;
      break;
    case 'exponent':
      calc.operator = exponent;
      break;
    case 'percent':
      calc.operator = percent;
  }
  if (calc.floatMode) calc.floatMode = false;
}

function clear(e) {
  calc.a = 0;
  calc.b = 0;
  calc.operator = null;
  calc.floatMode = false;
  updateDisplayValue(0);
}

function operate(e) {
  if (!calc.operator) return;
  const result = calc.operator(calc.a, calc.b);
  calc.a = result === 'ERROR' ? 0 : result;
  calc.b = 0;
  calc.operator = null;
  calc.floatMode = false;
  updateDisplayValue(result);
}

function flipSign(e) {
  const operand = !calc.operator ? 'a' : 'b';
  calc[operand] *= -1;
  updateDisplayValue(calc[operand]);
}

function floatMode(e) {
  if (!calc.floatMode) calc.floatMode = true;
}

function updateDisplayValue(n) {
  const displayValue = document.querySelector('.js-display-value');
  if (n === 'ERROR') {
    displayValue.textContent = n;
    return;
  }
  const output = isInt(n) ? Number(n) : Number(n.toFixed(2));
  if (output.toString().length > calc.DISPLAY_WIDTH) {
    displayValue.textContent = output.toExponential(2);
  } else {
    displayValue.textContent = output;
  }
}

function percent(a, b) {
  return (b / 100) * a;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return 'ERROR';
  return a / b;
}

function exponent(a, b) {
  return a ** b;
}

function isInt(n) {
  return n % 1 === 0;
}

(function () {
  initBtns();
})();
