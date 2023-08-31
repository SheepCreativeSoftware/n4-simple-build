"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDateTimeString = exports.getCurrentDateString = void 0;
/**
 * Adds a leading zero to numbers below 10 and converst to string
 * @returns converted string number
 */
const addLeadingZero = function (currentNumber) {
    const withoutLeadingZero = 10;
    if (currentNumber < withoutLeadingZero)
        return '0' + currentNumber;
    return String(currentNumber);
};
/**
 * Creates a date string of the current date
 * @returns current date string as YYYY-MM-DD
 */
const getCurrentDateString = function () {
    const dateNow = new Date();
    const offsetForMonth = 1;
    const currentYear = dateNow.getUTCFullYear().toString();
    const currentMonth = addLeadingZero(dateNow.getUTCMonth() + offsetForMonth);
    const currentDay = addLeadingZero(dateNow.getUTCDate());
    return `${currentYear}-${currentMonth}-${currentDay}`;
};
exports.getCurrentDateString = getCurrentDateString;
const getCurrentDateTimeString = function () {
    const dateNow = new Date();
    return dateNow.toISOString();
};
exports.getCurrentDateTimeString = getCurrentDateTimeString;
