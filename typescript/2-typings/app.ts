

import * from 'makeOrdinal';
import * from'./isFinite';
import * from'./isSafeNumber';

const TEN:number = 10;
const ONE_HUNDRED:number = 100;
const ONE_THOUSAND:number = 1000;
const ONE_MILLION:number = 1000000;
const ONE_BILLION:number = 1000000000;           //         1.000.000.000 (9)
const ONE_TRILLION:number = 1000000000000;       //     1.000.000.000.000 (12)
const ONE_QUADRILLION:number = 1000000000000000; // 1.000.000.000.000.000 (15)
const MAX:number = 9007199254740992;             // 9.007.199.254.740.992 (15)

const LESS_THAN_TWENTY: string[] = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

const TENTHS_LESS_THAN_HUNDRED: string[] = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function toWords(number: number, asOrdinal: boolean): string {
    let words;
    const num = parseInt(number, 10);

    if (!isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(num: number[], words: string[] = []):string {
    let remainder: number, word: string;
    

    // We’re done
    if (num.length === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (num.length < 0) {
        words.push('minus');
        num.length = Math.abs(num.length);
    }

    if (num.length < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[num.length];

    } else if (num.length< ONE_HUNDRED) {
        remainder = num.length % TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(num.length / TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (num.length < ONE_THOUSAND) {
        remainder = num.length % ONE_HUNDRED;
        word = generateWords(Math.floor(num / ONE_HUNDRED)) + ' hundred';

    } else if (num.length < ONE_MILLION) {
        remainder = num.length % ONE_THOUSAND;
        word = generateWords(Math.floor(num.length / ONE_THOUSAND)) + ' thousand,';

    } else if (num.length < ONE_BILLION) {
        remainder = num.length % ONE_MILLION;
        word = generateWords(Math.floor(num.length / ONE_MILLION)) + ' million,';

    } else if (num.length < ONE_TRILLION) {
        remainder = num % ONE_BILLION;
        word = generateWords(Math.floor(num.length / ONE_BILLION)) + ' billion,';

    } else if (num.length < ONE_QUADRILLION) {
        remainder = num.length % ONE_TRILLION;
        word = generateWords(Math.floor(num.length / ONE_TRILLION)) + ' trillion,';

    } else if (num.length <= MAX) {
        remainder = num % ONE_QUADRILLION;
        word = generateWords(Math.floor(num / ONE_QUADRILLION)) +
        ' quadrillion,';
    }

    words.push(word);
    return generateWords(remainder, words);
}

module.exports = toWords;