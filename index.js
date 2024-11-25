let displayValue = [];
const displayDiv = document.querySelector(".display");
let secondDecimal = false
let previusValue = [];
let justEqualed = false;


const updateDisplay = function() {
    displayDiv.textContent = displayValue.join("");
    justEqualed = false;
    previusValue = [];
    // console.log(displayValue.join(""));
};

const addDisplay = function(input) {
    console.log(input);
    console.log(previusValue);
    console.log(previusValue.length);
    if (previusValue.length > 0) {
        displayValue = previusValue;
        console.log(displayValue);
        if(displayValue.indexOf(".")) {
            secondDecimal = true;
        }
    }
    if(input == ".") {
        if (secondDecimal) {
            console.log("skip decimal")
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
    // console.log(displayValue.length);
    // console.log(justEqualed);
    if (displayValue.length == 0 || justEqualed) {
        console.log("skip nothing to operate");
        return;
    };
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
            const arrayEnding = numberPair.slice(3);
            numberPair = sum.concat(arrayEnding)
        };
    };
    addDisplay(" = " + numberPair);
    previusValue = numberPair;
    console.log(previusValue);
    justEqualed = true;
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
