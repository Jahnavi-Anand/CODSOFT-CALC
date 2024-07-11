document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.calculator .keys button');
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        if (button.textContent === 'AC') {
          display.value = '';
        } else if (button.textContent === 'C') {
          display.value = display.value.slice(0, -1);
        } else if (button.textContent === '=') {
          try {
            display.value = eval(display.value);
          } catch (error) {
            display.value = 'Error';
          }
        } else {
          display.value += button.textContent;
        }
      });
    });
  });
  