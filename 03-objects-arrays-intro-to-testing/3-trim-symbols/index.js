/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (size === 0) return '';
    let counter = size;
    let arr = string.split('')
   .filter( (item, index, narr) => { 
    if ( !(narr.indexOf(item) === index) ) {
        --counter;
        if (item != narr[index-1]) counter = size;
        if ( counter <= 0 ) {
            counter = size;
            return false;
        }
        return true;
    } 
    return true;
   } )
   .join('');
   return arr;
}
