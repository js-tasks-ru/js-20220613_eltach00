/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    return Object.fromEntries(
        fields.map( item => { 
            for (let [key, value] of Object.entries(obj)) {
                if (item === key) return [key, value];
            } return [];
         } )
        );
};
