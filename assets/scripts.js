/*
Authors : John Laryn Corsino
          Thea Isabelle Langit
          Glenn Patrick Mariano

*/
var x
var y
var x0
var y0
var x1
var y1
var x2
var y2
var x3
var y3
var b0
var b1
var b2
var b3

//Variables used for Desmos API
var elt = document.getElementById('calculator')
var calculator = Desmos.GraphingCalculator(elt);

//style to be inherited by some elements generated by the script
var style=
  `.forms{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }`

//This function generates the input fields depending on the value of selection "orderOption"
function generateForms(){
    document.getElementById("sol").style.display = "none"
    document.getElementById("answer").style.display = "none"
    switch(document.getElementById("orderOption").value) {
        case "Order 1":
          document.getElementById("formTwo").style.display = "none"
          document.getElementById("formThree").style.display = "none"
          break;
        case "Order 2":
          document.getElementById("formTwo").style = style
          document.getElementById("formThree").style.display = "none"
          break;
        case "Order 3":
          document.getElementById("formTwo").style = style
          document.getElementById("formThree").style = style
          break;
        }
}

//This function calculates all the necessary values to compute for the interpolation
function calculate(){
  document.getElementById("answer").style.display = "none"
  x0 = parseFloat(document.getElementById("x0").value)
  y0 = parseFloat(document.getElementById("y0").value)
  x1 = parseFloat(document.getElementById("x1").value)
  y1 = parseFloat(document.getElementById("y1").value)
  x2 = parseFloat(document.getElementById("x2").value)
  y2 = parseFloat(document.getElementById("y2").value)
  x3 = parseFloat(document.getElementById("x3").value)
  y3 = parseFloat(document.getElementById("y3").value)
  b0 = y0
  b1 = Math.round((eval("(y1 - y0)/(x1-x0)") + Number.EPSILON) * 10000) / 10000
  b2 = Math.round((eval("(((y2-y1)/(x2-x1)) - b1)/(x2-x0)") + Number.EPSILON) * 10000) / 10000
  b3 =  Math.round((eval("(((((y3-y2)/(x3-x2)) - ((y2-y1)/(x2-x1)))/(x3-x1)) - ((((y2-y1)/(x2-x1)) - ((y1-y0)/(x1-x0)))/(x2-x0)))/(x3-x0)") + Number.EPSILON) * 10000) / 10000
  switch(document.getElementById("orderOption").value) {
  case "Order 1":
    document.getElementById("sol").getElementsByClassName("left")[0].innerHTML =  `<h2>f(x) = ((${y1}) - (${y0})/(${x1}) - (${x0}) )(x - (${x0})) + (${y0})</h2>`
    document.getElementById("sol").style.display = "flex";
    break;
  case "Order 2":
    document.getElementById("sol").getElementsByClassName("left")[0].innerHTML =  `<h2>f(x) = ${b0} + ${b1} (x - ${x0}) + ${b2}(x - ${x0})(x - ${x1})</h2>`
    document.getElementById("sol").style.display = "flex";
    break;
  case "Order 3":
    document.getElementById("sol").getElementsByClassName("left")[0].innerHTML =  `<h2>f(x) = ${b0} + ${b1} (x - ${x0}) + ${b2}(x - ${x0})(x - ${x1})+${b3}(x - ${x0})(x - ${x1})(x - ${x2})</h2>`
    document.getElementById("sol").style.display = "flex";
    break;
  }
  document.getElementById("answer").style.display = "block"
  findX()
}

//This function computes y depending on the order and the value of x which is taken from the input field "x"
function findX(){
    x = parseFloat(document.getElementById("x").value)
    switch(document.getElementById("orderOption").value) {
      case "Order 1":
      y =  Math.round((eval("((y1-y0)/(x1-x0))*(x-x0)+y0") + Number.EPSILON) * 10000) / 10000
      break;
      case "Order 2":
        y =  Math.round((eval("b0 + b1*(x - x0) + b2*(x - x0)*(x - x1)") + Number.EPSILON) * 10000) / 10000
        break;
      case "Order 3":
        y = Math.round((eval("b0 + b1 *(x - x0) + b2*(x - x0)*(x - x1)+ b3*(x - x0)*(x - x1)*(x - x2)") + Number.EPSILON) * 10000) / 10000
        break;
  }
  document.getElementById("xtext").innerText = `f(${x}) = ${y}`
  renderGraph()
}

//This function generates a graph with plotted points based on values entered and the computed interpolation
function renderGraph(){
  var graphExpression
  calculator.removeExpression({ id: 'line'});
  calculator.removeExpression({ id: 'first' });
  calculator.removeExpression({ id: 'second' });
  calculator.removeExpression({ id: 'third' });
  calculator.removeExpression({ id: 'fourth' });
  calculator.removeExpression({ id: 'interpolation'});
  switch (document.getElementById("orderOption").value) {
    case "Order 1":
        graphExpression = `f(x) = ((${y1}-${y0})/(${x1}-${x0}))*(x-${x0})+${y0}`
        calculator.setExpression({ id: 'line', latex: graphExpression });
        calculator.setExpression({ id: 'first', latex: `(${x0},${y0})` });
        calculator.setExpression({ id: 'second', latex: `(${x1},${y1})` });
        calculator.setExpression({ id: 'interpolation', latex: `(${x},${y})` });
      break;
    case "Order 2":
        graphExpression = `f(x) = ${b0} + ${b1} (x - ${x0}) + ${b2}(x - ${x0})(x - ${x1})`
        calculator.setExpression({ id: 'line', latex: graphExpression });
        calculator.setExpression({ id: 'first', latex: `(${x0},${y0})` });
        calculator.setExpression({ id: 'second', latex: `(${x1},${y1})` });
        calculator.setExpression({ id: 'third', latex: `(${x2},${y2})` });
        calculator.setExpression({ id: 'interpolation', latex: `(${x},${y})` });
      break;
      case "Order 3":
          graphExpression = `f(x) = ${b0} + ${b1} (x - ${x0}) + ${b2}(x - ${x0})(x - ${x1})+${b3}(x - ${x0})(x - ${x1})(x - ${x2})`
          calculator.setExpression({ id: 'line', latex: graphExpression });
          calculator.setExpression({ id: 'first', latex: `(${x0},${y0})` });
          calculator.setExpression({ id: 'second', latex: `(${x1},${y1})` });
          calculator.setExpression({ id: 'third', latex: `(${x2},${y2})` });
          calculator.setExpression({ id: 'fourth', latex: `(${x3},${y3})` });
          calculator.setExpression({ id: 'interpolation', latex: `(${x},${y})` });
        break;
  }
}

//Functions bellow this are for element functionalites, they do not contribute to any of the computations




//This function allows a button to appear when the user scrolls down 50px from the top of the page
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("backToTop").style.display = "block";
  } else {
    document.getElementById("backToTop").style.display = "none";
  }
}
