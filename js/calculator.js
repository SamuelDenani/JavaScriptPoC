let operationChosen = false,
operation = '',
firstNum = '',
secondNum = '',
allOperations = {
    sum (a, b) {
        return a + b;
    },
    subtraction (a, b) {
        return a - b;
    },
    multiply (a, b) {
        return a * b;
    },
    divide (a, b) {
        return (a / b).toFixed(1);
    },
    power (a, b) {
        return a ** b;
    }
},
operationsSymbols = {
    sum: '+',
    subtraction: '-',
    divide: '/',
    multiply: 'x',
    power: '^'
},
$operation = document.querySelector('.operation'),
$message = document.querySelector('.standby-message')

let eventHandlers = () => {
    var calcBtns = document.querySelectorAll('.calculator-keyboard button');
    calcBtns.forEach(function (el) {
        el.addEventListener('click', function () {
            var typeOfBtn = this.getAttribute('data-type')
            validateInput(typeOfBtn, this)
        })
    })
}

let validateInput = (typeOfBtn, btn) => {
    if (typeOfBtn == 'equals' && !secondNum) {
        alert('Faltam argumentos')
    } else if (typeOfBtn != 'number' && typeOfBtn != 'equals' && !firstNum) {
        alert('Falta o primeiro número')

    } else if (typeOfBtn != 'number' && typeOfBtn != 'equals' && firstNum && !operationChosen) {
        operation = typeOfBtn;
        operationChosen = true;
        $operation.textContent += operationsSymbols[operation]

    } else if (typeOfBtn != 'number' && typeOfBtn != 'equals' && !secondNum && operationChosen) {
        alert('A operação já foi selecionada')
    }
     else if (typeOfBtn == 'number' && operationChosen) {
        secondNum += btn.textContent;
        $operation.textContent += btn.textContent;

    } else if (typeOfBtn == 'number' && !operationChosen) {
        $message.classList.add('is--hidden');
        firstNum += btn.textContent;
        $operation.textContent += btn.textContent
        
    } else {
        var calc = allOperations[operation],
        result = calc(firstNum, secondNum),
        $result = document.querySelector('.result');
        
        operationChosen = false,
        operation = '',
        firstNum = '',
        secondNum = '';

        $operation.textContent = '';
        $result.textContent = result
    }
}


eventHandlers()