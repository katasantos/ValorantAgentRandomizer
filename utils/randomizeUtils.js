function randomizeArray(array) {
    var randomNumber = Math.floor(Math.random() * array.length);
    return randomNumber;
  }
  
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  module.exports = { randomizeArray, capitalize };