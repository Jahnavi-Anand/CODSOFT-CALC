document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.calculator .keys button');
  
    let evaluateOnNextEquals = false; // Flag to indicate whether to evaluate on next '=' press
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const buttonText = button.textContent;
  
        if (buttonText === 'AC') {
          display.value = '';
        } else if (buttonText === 'C') {
          display.value = display.value.slice(0, -1);
        } else if (buttonText === '=') {
          evaluateExpression();
        } else {
          if (button.classList.contains('scientific')) {
            handleScientificOperation(buttonText);
          } else {
            if (evaluateOnNextEquals) {
              display.value = buttonText;
              evaluateOnNextEquals = false;
            } else {
              display.value += buttonText;
            }
          }
        }
      });
    });
  
    function evaluateExpression() {
      try {
        // Handling factorial operation
        let expression = display.value.replace(/(\d+)!/g, match => factorial(parseInt(match)));
        // Implementing BODMAS logic
        expression = expression.replace('π', Math.PI).replace('e', Math.E);
        display.value = eval(expression);
      } catch (error) {
        display.value = 'Error';
      }
      evaluateOnNextEquals = false;
    }
  
    function handleScientificOperation(operation) {
      switch (operation) {
        case 'sqrt':
          display.value = `Math.sqrt(${display.value})`;
          break;
        case 'deg':
          display.value = `(${display.value} * (180 / Math.PI))`;
          break;
        case 'π':
          display.value += 'Math.PI';
          break;
        case '^':
          display.value += '**';
          break;
        case 'sin':
          display.value += 'Math.sin((Math.PI / 180) * ';
          break;
        case 'cos':
          display.value += 'Math.cos((Math.PI / 180) * ';
          break;
        case 'tan':
          display.value += 'Math.tan((Math.PI / 180) * ';
          break;
        case 'ln':
          display.value += 'Math.log(';
          break;
        case 'log':
          display.value += 'Math.log10(';
          break;
        case 'e':
          display.value += 'Math.E';
          break;
        case '!':
          display.value += '!';
          break;
        case '.':
          if (!display.value.includes('.')) {
            display.value += '.';
          }
          break;
        case '%':
          display.value = `(${display.value} / 100)`;
          break;
        case '(':
          display.value += '(';
          break;
        case ')':
          display.value += ')';
          break;
        default:
          break;
      }
    }
  
    function factorial(num) {
      if (num < 0) return 'Error';
      else if (num === 0) return 1;
      else return num * factorial(num - 1);
    }
  });
  