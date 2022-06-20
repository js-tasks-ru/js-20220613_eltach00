/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
        return (param === 'asc') ? arr.slice().sort((a, b) => a.normalize().localeCompare(b, 'ru', { sensitivity: 'variant', caseFirst: 'upper' } )) :
        (param === 'desc') ? arr.slice().sort((a, b) => b.normalize().localeCompare(a, 'ru', { sensitivity: 'variant', caseFirst: 'upper' })) :
        undefined;
}
