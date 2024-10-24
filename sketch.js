const dots = []
let minSize = 8
let maxSize = 16
let newDotsAmount = 5
const spacer = 32
const angleNoise = 45

const backgroundColor = "#ffbc02"
const fillColor = "#010101"
const canvasWidth = 1024
const canvasHeight = 768

// Dit is een object ter referentie, wordt niet daadwerkelijk gebruikt
const dot = {
  x: 0,
  y: 0,
  radius: 5,
  spacer: 2
}


// Helper functies
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function doCirclesOverlap(circle1, circle2) {
  const x1 = circle1.x
  const y1 = circle1.y
  const r1 = circle1.spacer/2

  const x2 = circle2.x
  const y2 = circle2.y
  const r2 = circle2.spacer/2
  // Bereken de afstand tussen twee punten (met behulp van de stelling van Pythagoras)
  const distanceBetweenCenters = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  // Als er een fout in de berekening zit, return false om eem infinite loop te voorkomen  
  if (isNaN(distanceBetweenCenters)) {
    return false
  }
  // Check of de afstand groter is dan de twee twee cirkels bij elkaar
   return distanceBetweenCenters <= (r1 + r2);
}


// Recursieve functie voor het toevoegen van nieuwe stippen
const generateNewDots = function(dot, dots) {
  const newDots = []
  const amount = newDotsAmount
  
  for (let index = 0; index < amount; index++) {
    let hoek = 360/amount * index 
    hoek = hoek + Math.random() * angleNoise

    const newDot = getNewDot(dot, hoek, dots)
    if (newDot) {
      newDots.push(newDot)
      dots.push(newDot)
    }
  }
  if (newDots.length > 0) {
    newDots.forEach(newDot => {
      generateNewDots(newDot, dots)
    })
  }
  return newDots
}

// Genereert een nieuwe stip, en checkt of de stip past
const getNewDot = function(targetDot, angle, dots) {
  const offset = targetDot.spacer
  
  const newX = targetDot.x + (targetDot.spacer + offset) * cos(toRadians(angle))
  const newY = targetDot.y + (targetDot.spacer + offset) * sin(toRadians(angle))
  const radius = random(minSize, maxSize)

  if (newX > width || newX < 0 || isNaN(newX)) {
    return false
  }
  if (newY > height || newY < 0 || isNaN(newY)) {
    return false
  }

  // Check of de nieuwe cirkel overlapt met alle andere cirkels
  const test = dots.map(dot => {
    return doCirclesOverlap({x: newX, y:newY, spacer: spacer}, dot)
  })
  
  // Filter alle overlappende cirkels eruit, en check of het totaal aantal overlappende cirkels groters is dan
  const overlappingPoints = test.filter((v) => { return v })
  if (overlappingPoints.length > 0) {
    return false
  }

  return {
    x: newX,
    y: newY,
    radius: radius,
    spacer: spacer + radius
  }
}

// Genereert een nieuwe stip, en checkt of de stip past
function regenerateDots() {
  dots.length = 0
  const radius = random(minSize, maxSize)
  dots.push({
    x: width/2,
    y: height/2,
    radius: radius,
    spacer: radius + random(minSize, maxSize)
  })
  
  generateNewDots(dots[dots.length-1], dots)
}


// P5 functies voor het initialiseren en tekenen
function setup() {
  createCanvas(canvasWidth, canvasHeight).parent("container")
  regenerateDots()
}

function draw() {
  background(backgroundColor);
  noStroke()
  dots.forEach(dot => {
    // fill("white")
    // circle(dot.x, dot.y, dot.spacer)
    fill(fillColor)
    circle(dot.x, dot.y, dot.radius)
  })
}
