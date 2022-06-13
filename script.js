const numbers = document.querySelectorAll(".number");
const current = document.querySelector("output");
const res = document.querySelector(".res");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".eq");
const dot = document.querySelector(".dot");
const clear = document.querySelector(".long");

function Calc(op1 = 0, op2 = 0, operator = '+'){
    this.op1 = op1;
    this.op2 = op2;
    this.operator = operator;
}

let calc = new Calc();

numbers.forEach(number => number.addEventListener('click', () => {
    let temp;
    temp = current.textContent === "0" ? number.textContent : current.textContent + number.textContent;
    current.textContent = temp;
    calc.op2 = Number(temp);
    number.classList.add('pressed');
}));

function triggerCalc(calcObj){
    switch(calcObj.operator){
        case '+':
            res.textContent = calcObj.op1 + calcObj.op2;
            break;
        case '-':
            res.textContent = calcObj.op1 - calcObj.op2;
            break;
        case '*':
            res.textContent = calcObj.op1 * calcObj.op2;
            break;
        case '/':
            if (calcObj.op2 == 0){
                alert('Hey! No dividing by 0!');
                reset();
                return;
            }
            res.textContent = calcObj.op1 / calcObj.op2;
            break;
    }
}

operators.forEach(op =>op.addEventListener('click', ()=>{
    triggerCalc(calc);
    current.textContent = 0;
    calc = new Calc(Number(res.textContent), 0, op.textContent);
    op.classList.add('pressed');
}));

equal.addEventListener('click',() => {
    triggerCalc(calc);
    current.textContent = 0;
    calc = new Calc();
    equal.classList.add('pressed');
});

dot.addEventListener('click', ()=>{
    if(current.textContent.includes('.')) return;
    current.textContent = current.textContent + '.';
    dot.classList.add('pressed');
});

clear.addEventListener('click', reset);

function reset(){
    current.textContent = 0;
    res.textContent = 0;
    calc = new Calc();
    clear.classList.add('pressed');
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('transitionend',(e) => {
    if (e.propertyName != 'transform') return;
    button.classList.remove('pressed');
}))

//window.addEventListener('keydown', );