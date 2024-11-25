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
        if(displayValue.indexOf(".") >= 0) {
            secondDecimal = true;
            console.log("second decimal true");
        }
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
    // skips operation if display blank or equal just called
    if (displayValue.length == 0 || justEqualed) {
        console.log("skip nothing to operate");
        return;
    };
    // makes an array of values and operator
    numberPair = displayValue.join("").split(/(\+|\-|\/|\*)/);
    let sum = 0;
    operator = true;

    // does leftmost operation until no mor operation are to be done
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
    // rounds float values
    if (numberPair % 1 != 0) {
        console.log(numberPair.toString())
        // console.log(numberPair[0].indexOf('.') + 1);
        // console.log(numberPair[0].slice(numberPair[0].indexOf('.') + 1));
        console.log(numberPair.toString().slice(numberPair.toString().indexOf('.') + 1).length);
        const decimalLength = numberPair.toString().slice(numberPair.toString().indexOf('.') + 1).length;
        if(!decimalLength == 16) {
            numberPair = Number(numberPair).toFixed(3);
        } else {
            numberPair = Number(numberPair).toFixed(decimalLength);
        };
    }
    addDisplay(" = " + numberPair);
    previusValue = numberPair;
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
