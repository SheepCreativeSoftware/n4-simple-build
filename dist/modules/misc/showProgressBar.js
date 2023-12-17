import { buntstift } from 'buntstift';
const zero = 0;
const spareCharacters = 5;
const theEntireLine = 0;
const startPosition = 0;
const maxPercentage = 100;
const twoDigitsAfterDecimal = 2;
const map = (inputValue, inputMin, inputMax, outputMin, outputMax) => {
    // eslint-disable-next-line no-extra-parens
    return ((inputValue - inputMin) * (outputMax - outputMin)) / ((inputMax - inputMin) + outputMin);
};
const showProgressBar = (header, current, maxNumber) => {
    const percentage = map(current, zero, maxNumber, zero, maxPercentage);
    let output = `${header}: ${percentage.toFixed(twoDigitsAfterDecimal)}% `;
    if (current < maxNumber) {
        const consoleWidth = process.stdout.columns - spareCharacters - output.length;
        const numberOfSigns = map(current, zero, maxNumber, zero, consoleWidth);
        output += '>[';
        for (let index = 0; index < numberOfSigns; index++)
            output += '=';
        for (let index = 0; index < consoleWidth - numberOfSigns; index++)
            output += ' ';
        output += ']';
        process.stdout.clearLine(theEntireLine);
        process.stdout.cursorTo(startPosition);
        process.stdout.write(output);
    }
    else {
        process.stdout.clearLine(theEntireLine);
        process.stdout.cursorTo(startPosition);
        buntstift.success(`${header} finished: ${percentage.toFixed(twoDigitsAfterDecimal)}%`);
    }
};
export { showProgressBar };
