const calc = {
  DISPLAY_WIDTH: 9,
  displayVal: '0',
  valA: null,
  valB: null,
  operator: null,
  waitingForA: true,
};

// TODO: add backspace function

// TODO: add fixed screen size with num.toExponential(n)

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
  if (calc.displayVal.length === calc.DISPLAY_WIDTH) return;
  // prevent 0 from appearing before numbers
  if (calc.displayVal === '0') {
    calc.displayVal = num;
  } else {
    calc.displayVal += num;
  }
  updVals();
  updScreen();
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
  calc.waitingForA = false;
  calc.displayVal = '0';
}

function clear(e) {
  calc.displayVal = '0';
  calc.valA = null;
  calc.valB = null;
  calc.operator = null;
  calc.waitingForA = true;
  updScreen();
}

function operate(e) {
  if (!calc.operator) return;
  let result = calc.operator(calc.valA, calc.valB);
  if (!isInt(result)) {
    result = result.toFixed(2);
  }
  calc.displayVal = result.toString();
  updScreen();
  calc.valA = result === 'ERROR' ? 0 : result;
  calc.displayVal = '';
  calc.operator = null;
  calc.waitingForA = true;
}

function flipSign(e) {
  const num = +calc.displayVal * -1;
  calc.displayVal = num.toString();
  updVals();
  updScreen();
}

function floatMode(e) {
  if (calc.displayVal.includes('.')) return;
  calc.displayVal += '.';
  updScreen();
}

function updScreen() {
  const screen = document.getElementById('displayVal');
  screen.textContent = calc.displayVal;
}

function updVals() {
  const num = +calc.displayVal;
  if (calc.waitingForA) {
    calc.valA = num;
  } else {
    calc.valB = num;
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
