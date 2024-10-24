/*
  Voeg event listeners toe om de waarde van de input velden uit te lezen en weg te schrijven
  Gebruik localStorage om de waarden in de lokale opslag weg te schrijven / uit te lezen
*/

const minSizeEl = document.getElementById("minSize")
const maxSizeEl = document.getElementById("maxSize")
const newDotsAmountEl = document.getElementById("newDotsAmount")

if (localStorage.getItem("minSize")) {
  minSize = parseInt(localStorage.getItem("minSize"), 10)
}

if (localStorage.getItem("maxSize")) {
  maxSize = parseInt(localStorage.getItem("maxSize"), 10)
}

if (localStorage.getItem("newDotsAmount")) {
  newDotsAmount = parseInt(localStorage.getItem("newDotsAmount"), 10)
}


minSizeEl.value = minSize
maxSizeEl.value = maxSize
newDotsAmountEl.value = newDotsAmount

minSizeEl.addEventListener("change", e => {
  const target = e.target
  minSize = target.value * 1
  target.setAttribute("max", maxSize)
  localStorage.setItem("minSize", minSize)
  regenerateDots()
})


maxSizeEl.addEventListener("change", e => {
  const target = e.target
  maxSize = target.value * 1
  localStorage.setItem("maxSize", maxSize)
  target.setAttribute("min", minSize)
  regenerateDots()
})

newDotsAmountEl.addEventListener("change", e => {
  const target = e.target
  newDotsAmount = target.value * 1
  localStorage.setItem("newDotsAmount", newDotsAmount)
  target.setAttribute("newDotsAmount", newDotsAmount)
  regenerateDots()
})