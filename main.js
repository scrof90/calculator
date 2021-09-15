const settings = {
  displayValue: '0',
  valueA: 0,
  valueB: 0,
  operator: null,
  waitingForA: true,
};

function initBtns() {
  const numBtns = Array.from(document.querySelectorAll('.num'));
  numBtns.forEach((btn) => (btn.onclick = evalNum));

  const opBtns = Array.from(document.querySelectorAll('.op'));
  opBtns.forEach((btn) => (btn.onclick = evalOperator));

  const equalsBtn = document.getElementById('equals');
  equalsBtn.onclick = operate;

  const clearBtn = document.getElementById('clear');
  clearBtn.onclick = clear;

  const signBtn = document.getElementById('flipSign');
  signBtn.onclick = flipSign;
}

function evalNum(e) {
  const num = e.target.textContent;
  // prevent 0 from appearing before numbers
  if (settings.displayValue === '0') {
    settings.displayValue = '';
  }
  settings.displayValue += num;
  updValues();
  updScreen();
}

function evalOperator(e) {
  const op = e.target.textContent;
  switch (op) {
    case '/':
      settings.operator = divide;
      break;
    case '*':
      settings.operator = multiply;
      break;
    case '-':
      settings.operator = subtract;
      break;
    case '+':
      settings.operator = add;
      break;
    case 'xy':
      settings.operator = exp;
      break;
    case '%':
      settings.operator = percent;
      break;
  }
  settings.waitingForA = false;
  settings.displayValue = '0';
}

function clear(e) {
  settings.displayValue = '0';
  settings.valueA = 0;
  settings.valueB = 0;
  settings.operator = null;
  settings.waitingForA = true;
  updScreen();
}

function updScreen() {
  const screen = document.getElementById('screen');
  screen.textContent = settings.displayValue;
}

function updValues() {
  if (settings.waitingForA) {
    settings.valueA = +settings.displayValue;
  } else {
    settings.valueB = +settings.displayValue;
  }
}

function operate(e) {
  if (!settings.operator) return;
  let result = settings.operator(settings.valueA, settings.valueB);
  if (!isInt(result)) {
    result = result.toFixed(2);
  }
  settings.displayValue = result.toString();
  updScreen();
  settings.valueA = result === 'ERROR' ? 0 : result;
  settings.displayValue = settings.valueA;
  settings.waitingForA = true;
}

function flipSign() {
  let num = +settings.displayValue;
  num *= -1;
  settings.displayValue = num.toString();
  updValues();
  updScreen();
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
