/**
 *  This function calculates total price of a new order
 * @param {Array} priceArray cartProduct: Array of prices
 * @returns {number}
 */

export const totalPrice = (priceArray) => {
    return priceArray.reduce( (total, price) => total + price, 0).toFixed(2);
}