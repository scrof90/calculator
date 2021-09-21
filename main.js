const calc = {
  DISPLAY_WIDTH: 9,
  a: 0,
  b: 0,
  operator: null,
  floatMode: false,
};

// TODO: add backspace function

function initBtns() {
  const numBtns = Array.from(document.querySelectorAll('.num'));
  numBtns.forEach((btn) => (btn.onclick = inputNum));

  const opBtns = Array.from(document.querySelectorAll('.op'));
  opBtns.forEach((btn) => (btn.onclick = inputOperator));

  const equalsBtn = document.getElementById('equals');
  equalsBtn.onclick = operate;

  const clearBtn = document.getElementById('clear');
  clearBtn.onclick = clear;

  const signBtn = document.getElementById('flipSign');
  signBtn.onclick = flipSign;

  const floatBtn = document.getElementById('point');
  floatBtn.onclick = floatMode;
}

function inputNum(e) {
  const num = e.target.textContent;
  const operand = !calc.operator ? 'a' : 'b';
  if (calc.floatMode) {
    if (isInt(calc[operand])) {
      calc[operand] = +`${calc[operand]}.${num}`;
    } else {
      calc[operand] = +`${calc[operand].toFixed(1)}${num}`;
    }
  } else {
    calc[operand] = +`${calc[operand]}${num}`;
  }
  updScreen(calc[operand]);
}

function inputOperator(e) {
  if (calc.operator) operate();
  const op = e.target.textContent;
  switch (op) {
    case '/':
      calc.operator = divide;
      break;
    case '*':
      calc.operator = multiply;
      break;
    case '-':
      calc.operator = subtract;
      break;
    case '+':
      calc.operator = add;
      break;
    case 'xy':
      calc.operator = exp;
      break;
    case '%':
      calc.operator = percent;
      break;
  }
  if (calc.floatMode) calc.floatMode = false;
}

function clear(e) {
  calc.a = 0;
  calc.b = 0;
  calc.operator = null;
  calc.floatMode = false;
  updScreen(0);
}

function operate(e) {
  if (!calc.operator) return;
  let a = calc.operator(calc.a, calc.b);
  updScreen(a);
  calc.a = a === 'ERROR' ? 0 : a;
  calc.b = 0;
  calc.operator = null;
  calc.floatMode = false;
}

function flipSign(e) {
  const operand = !calc.operator ? 'a' : 'b';
  calc[operand] = calc[operand] * -1;
  updScreen(calc[operand]);
}

function floatMode(e) {
  if (!calc.floatMode) calc.floatMode = true;
}

function updScreen(n) {
  const screen = document.getElementById('displayVal');
  let output = n;
  if (output === 'ERROR') {
    screen.textContent = output;
    return;
  }
  if (!isInt(output)) {
    output = output.toFixed(2);
  }
  if (output.toString().length > calc.DISPLAY_WIDTH) {
    screen.textContent = output.toExponential(3);
  } else {
    screen.textContent = output;
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

function exp(a, b) {
  return a ** b;
}

function isInt(n) {
  return n % 1 === 0;
}

(function () {
  initBtns();
})();
