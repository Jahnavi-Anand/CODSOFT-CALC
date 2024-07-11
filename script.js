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
          try {
            display.value = eval(display.value);
          } catch (error) {
            display.value = 'Error';
          }
          evaluateOnNextEquals = false;
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
  
    function handleScientificOperation(operation) {
      switch (operation) {
        case 'sqrt':
          display.value = Math.sqrt(parseFloat(display.value));
          break;
        case 'deg':
          display.value = parseFloat(display.value) * (180 / Math.PI);
          break;
        case 'π':
          display.value += Math.PI.toFixed(5);
          break;
        case '^':
          display.value += '**'; // Use ** for exponentiation in JavaScript
          break;
        case 'sin':
          display.value = Math.sin(parseFloat(display.value));
          break;
        case 'cos':
          display.value = Math.cos(parseFloat(display.value));
          break;
        case 'tan':
          display.value = Math.tan(parseFloat(display.value));
          break;
        case 'ln':
          display.value = Math.log(parseFloat(display.value));
          break;
        case 'log':
          display.value = Math.log10(parseFloat(display.value));
          break;
        case 'e':
          display.value += Math.E.toFixed(5);
          break;
        case '!':
          display.value = factorial(parseInt(display.value));
          break;
        case '.':
          if (!display.value.includes('.')) {
            display.value += '.';
          }
          break;
        case '%':
          display.value = parseFloat(display.value) / 100;
          break;
        default:
          break;
      }
    }
  
    function factorial(num) {
      if (num < 0) return -1;
      else if (num === 0) return 1;
      else {
        let result = 1;
        for (let i = 1; i <= num; i++) {
          result *= i;
        }
        return result;
      }
    }
  });
  