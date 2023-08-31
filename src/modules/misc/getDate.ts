
/**
 * Adds a leading zero to numbers below 10 and converst to string
 * @returns converted string number
 */
const addLeadingZero = function(currentNumber: number): string {
	const withoutLeadingZero = 10;
	if(currentNumber < withoutLeadingZero) return '0' + currentNumber;
	return String(currentNumber);
};

/**
 * Creates a date string of the current date
 * @returns current date string as YYYY-MM-DD
 */
const getCurrentDateString = function(): string {
	const dateNow = new Date();
	const offsetForMonth = 1;
	const currentYear = dateNow.getUTCFullYear().toString();
	const currentMonth = addLeadingZero(dateNow.getUTCMonth() + offsetForMonth);
	const currentDay = addLeadingZero(dateNow.getUTCDate());
	return `${currentYear}-${currentMonth}-${currentDay}`;
};

const getCurrentDateTimeString = function() {
	const dateNow = new Date();
	return dateNow.toISOString();
};

export { getCurrentDateString, getCurrentDateTimeString };
