let displayValue = '0';
let valueA = '';
let valueB = '';
let operator = null;
let waitingForA = true;

const numBtns = Array.from(document.querySelectorAll('.num'));
numBtns.forEach((btn) => (btn.onclick = evalNum));

const opBtns = Array.from(document.querySelectorAll('.op'));
opBtns.forEach((btn) => (btn.onclick = evalOperator));

const equalsBtn = document.getElementById('equals');
equalsBtn.onclick = operate;

const clearBtn = document.getElementById('clear');
clearBtn.onclick = clear;

// TODO: refactor the whole thing to make an array of numbers and operators

function evalNum(e) {
  const num = e.target.textContent;
  if (displayValue === '0' && num === '0') {
    displayValue = '0';
  } else if (displayValue === '0' && num !== '0') {
    displayValue = num;
  } else {
    displayValue += num;
  }
  if (waitingForA) {
    valueA = displayValue;
  } else {
    valueB = displayValue;
  }
  updateScreen();
}

function evalOperator(e) {
  const op = e.target.textContent;
  switch (op) {
    case '/':
      operator = divide;
      break;
    case '*':
      operator = multiply;
      break;
    case '-':
      operator = subtract;
      break;
    case '+':
      operator = add;
      break;
    case 'x<sup>y</sup>':
      operator = exponent;
      break;
  }
  waitingForA = false;
  displayValue = '';
}

function clear(e) {
  displayValue = '0';
  valueA = '0';
  valueB = '0';
  operator = null;
  waitingForA = true;
  updateScreen();
}

function updateScreen() {
  const screen = document.getElementById('screen');
  screen.textContent = displayValue;
}

function operate(e) {
  if (!operator) return;
  const a = +valueA;
  const b = +valueB;
  if (operator === divide && b === 0) {
    displayValue = 'NO';
    valueA = '';
  } else {
    const result = operator(a, b);
    displayValue = result;
    valueA = result;
  }
  updateScreen();
  waitingForA = true;
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
  return a / b;
}

function exponent(a, b) {
  return a ** b;
}
