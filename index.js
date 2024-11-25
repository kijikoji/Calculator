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
    if (previusValue.length > 0) {
        displayValue = previusValue;
        console.log(displayValue);
        console.log(displayValue.indexOf("."));
        // if(displayValue.indexOf(".") >= 0) {
        //     secondDecimal = true;
        //     console.log("second decimal true");
        // }
    }
    if(input == ".") {
        if (secondDecimal) {
            console.log("skip decimal")
            return;
        };
        secondDecimal = true;
        console.log("second decimal true");
    };
    if (displayDiv.textContent == "ERROR DIVIDING BY ZERO") {
        clearDisplay();
    }
    if(input == "/" || input == "*" || input == "-" || input == "+") {
        secondDecimal = false
        console.log("second decimal false");
    }
    displayValue.push(input);
    updateDisplay();
};

const clearDisplay = function() {
    displayValue = [];
    secondDecimal = false;
    console.log("second decimal false");
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
    // console.log(numberPair);
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
                if (Number(numberPair[2]) == 0) {
                    clearDisplay();
                    addDisplay("ERROR DIVIDING BY ZERO");
                    justEqualed = true;
                    secondDecimal = true;
                    return;
                }
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
    if (numberPair % 1 != 0) {
        console.log(numberPair[0].length);
        console.log(numberPair[0]);
        if(!numberPair[0].length) {
            numberPair = Number(numberPair).toFixed(3);
        };
    }
    addDisplay(" = " + numberPair);
    previusValue = numberPair;
    console.log(previusValue.slice(previusValue.indexOf('.') + 1));
    justEqualed = true;
    if(previusValue[0] % 1 != 0) {
        secondDecimal = true;
        console.log("second decimal true");
    } else {
        secondDecimal = false;
        console.log("second decimal false");
    }
    
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
