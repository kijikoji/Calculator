let displayValue = [];
const displayDiv = document.querySelector(".display");
let secondDecimal = false


const updateDisplay = function() {
    displayDiv.textContent = displayValue.join("");
    // console.log(displayValue.join(""));
};

const addDisplay = function(input) {
    if(input == ".") {
        if (secondDecimal) {
            return;
        };
        secondDecimal = true;
    };
    if(input == "/" || input == "*" || input == "-" || input == "+") {
        secondDecimal = false
    }
    displayValue.push(input);
    updateDisplay();
};

const clearDisplay = function() {
    displayValue = [];
    updateDisplay();
};

const operate = function() {
    numberPair = displayValue.join("").split(/(\+|\-|\/|\*)/);
    console.log(numberPair);
    let sum = 0;
    operator = true;

    while(operator) {
        operator = numberPair.find((value) => {
            if (value == "*" || value == "/" || value == "+" || value == "-") {
                return value;
            };
        });            
        switch (operator) {
            case "*":
                sum = [Number(numberPair[0]) 
                    * Number(numberPair[2])];
                break;
            case "/":
                sum = [Number(numberPair[0]) 
                    / Number(numberPair[2])];
                break;
            case "+":
                sum = [Number(numberPair[0]) 
                    + Number(numberPair[2])];
                break;
            case "-":
                sum = [Number(numberPair[0]) 
                    - Number(numberPair[2])];
                break;
        };
        if(operator) {
            console.log(sum);
            const arrayEnding = numberPair.slice(3);
            numberPair = sum.concat(arrayEnding)
            console.log(numberPair);
        };
    };
    addDisplay(" = " + numberPair);
};

function main () {
    const inputs = Array.from(document.querySelectorAll(".input"));

    inputs.forEach(input => {
        input.addEventListener("click", () => addDisplay(input.textContent));
    })
    
    const equals = document.querySelector(".equals");
    equals.addEventListener("click", operate)

    const clear = document.querySelector(".clear");
    clear.addEventListener("click", clearDisplay)
        
    return 0;
};

main();
