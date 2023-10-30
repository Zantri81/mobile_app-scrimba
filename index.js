/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/
let cart = []

const inputFieldEL = document.getElementById("input-field")
const addBtnEL = document.getElementById("add-button")

addBtnEL.addEventListener("click", function() {
    cart.push(inputFieldEL.value)
    inputFieldEL.value =""
    console.log(cart)

})