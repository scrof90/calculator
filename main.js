const calc = {
  DISPLAY_WIDTH: 9,
  result: 0,
  input: 0,
  operator: null,
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
  if (!calc.operator) {
    calc.result = +(calc.result.toString() + num);
    updScreen(calc.result);
  } else {
    calc.input = +(calc.input.toString() + num);
    updScreen(calc.input);
  }
}

function inputOperator(e) {
  /*   if (calc.operator) operate(); */
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
}

function clear(e) {
  calc.result = 0;
  calc.input = 0;
  calc.operator = null;
  updScreen(0);
}

function operate(e) {
  if (!calc.operator) return;
  let result = calc.operator(calc.result, calc.input);
  updScreen(result);
  calc.result = result === 'ERROR' ? 0 : result;
  calc.input = 0;
  calc.operator = null;
}

function flipSign(e) {
  if (!calc.operator) {
    calc.result = calc.result * -1;
    updScreen(calc.result);
  } else {
    calc.input = calc.input * -1;
    updScreen(calc.input);
  }
}

function floatMode(e) {
  if (isInt(calc.input)) return;
  calc.input = calc.input.toString() + '.';
  updScreen(calc.input);
}

function updScreen(num) {
  const screen = document.getElementById('displayVal');
  let display = num;
  if (display === 'ERROR') {
    screen.textContent = display;
    return;
  }
  if (!isInt(display)) {
    display = display.toFixed(2);
  }
  if (display.toString().length > calc.DISPLAY_WIDTH) {
    screen.textContent = display.toExponential(3);
  } else {
    screen.textContent = display;
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
