function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const exprWithoutSpace = expr.replace(/\s/g, '');
    let result = calc(exprWithoutSpace);
    return result;
}

function calc(exprWithoutSpace){
    let result = "";

    let arrayNumbers = [];
    let arrayOperators = [];

    let number = "";
    let isOneLevel = false;
    let isTwoLevel = false;
    let isStart = true;

    for (let i = 0; i < exprWithoutSpace.length; i++) {
        let simvol = exprWithoutSpace.substring(i, i + 1);
        if (simvol == "+" || (simvol== "-" && !isStart)) {
            isTwoLevel = true;
            arrayNumbers.push(number);
            arrayOperators.push(simvol);
            number = "";
            isStart = true;
        } else if (simvol=="*" || simvol=="/") {
            isOneLevel = true;
            arrayNumbers.push(number);
            arrayOperators.push(simvol);
            number = "";
            isStart = true;
        } else {
            number += simvol;
            isStart = false;
        }
    }

    let isOtherLevel = isOneLevel && isTwoLevel;
    if (arrayOperators.length == 0) {
        return +number;
    }
    
    arrayNumbers.push(number);

    let isOperator = false;
    let isStartOperator = false;
    let plus = 0;

    for (let i = 0; i < arrayOperators.length; i++) {
        if (i == arrayOperators.length - 1) {
            isStartOperator = true;
        }
        let operator = arrayOperators[i];
        if (operator=="+") {
            if (i == 0 && isOtherLevel) {
                result += arrayNumbers[i] + "+";
            } else {
                if (isOperator || isOtherLevel) {
                    result += isStartOperator ? "+" + arrayNumbers[i + plus] : arrayNumbers[i + plus] + "+";
                }
                if (!isOperator && !isOtherLevel) {
                    result += +arrayNumbers[i] + +arrayNumbers[i + 1];
                    isOperator = true;
                    isStartOperator = true;
                    plus=1;
                }
            }
        }
        if (operator == "-") {
            if (i == 0 && isOtherLevel) {
                result += arrayNumbers[i] + "-";
            } else {
                if (isOperator || isOtherLevel) {
                    result += isStartOperator ? "-" + arrayNumbers[i + plus] : arrayNumbers[i + plus] + "-";
                }
                if (!isOperator && !isOtherLevel) {
                    result += arrayNumbers[i] - arrayNumbers[i + 1];
                    isOperator = true;
                    isStartOperator = true;
                    plus=1;
                }
            }
        }
        if (operator=="*") {
            if (isOperator) {
                result += "*" + arrayNumbers[i + 1];
            } else {
                result += arrayNumbers[i] * arrayNumbers[i + 1];
                isOperator = true;
                isStartOperator = true;
                plus = 1;
            }
        }
        if (operator=="/") {
            if (arrayNumbers[i + 1] == 0) {
                throw new Error("TypeError: Division by zero.");
            }

            if (isOperator) {
                result += "/" + arrayNumbers[i + 1];
            } else {
                result += arrayNumbers[i] / arrayNumbers[i + 1];
                isOperator = true;
                isStartOperator = true;
                plus = 1;
            }
        }
    }

    return +calc(result);   
}

module.exports = {
    expressionCalculator
}