// import mathJs from "../../node_modules/math.js/index"


const WIDTH = 720
const HEIGHT = 736
const my_function = (x) => {
  const ans = (x) => {
    if (Math.floor(x/0.5)%2==0) {return 1}
    else {return 0}
  }
  return [ans(x), 0]
}

const fourier_transform = (func, n, delta_t=0.01) => {
  sum = [0,0]
  for (let i=0; i<1/delta_t; i++) {
    t=i*delta_t
    let ans = func(t)
    sum[0] += (Math.cos(-2*Math.PI * n * t) * ans[0] - Math.sin(-2*Math.PI * n * t) * ans[1])* delta_t
    sum[1] += (Math.cos(-2*Math.PI * n * t) * ans[1] + Math.sin(-2*Math.PI * n * t) * ans[0])* delta_t
  }
  if (Math.abs(sum[0])<10**-5) sum[0]=0
  if (Math.abs(sum[1])<10**-5) sum[1]=0
  return sum
}
class fourier_element {
  constructor (A, n) {
    this.A =A
    this.n =n
  }
}

class fourier {
  constructor (omega, arr) {
    this.omega = omega
    this.data = arr
  }
}
const n=50
const my_fourier = new fourier((n/50), [
])
// console.log(my_fourier.data[0].A)
for (let i=-n; i<n+1; i++) {
    my_fourier.data.push(
        new fourier_element(fourier_transform(my_function, i, 0.01), i)
      )
  }
let toShow = []
let time=0
function setup() {
  createCanvas(WIDTH, HEIGHT);
}
const createRotatingPoint= (pos, radius, frequency, final=false, phase = 0) => {
  
  stroke(50)
  noFill()
  let x=pos[0] + radius[0]*cos(frequency*time+phase) - radius[1]*sin(frequency*time+phase)
  let y=pos[1] + radius[0]*sin(frequency*time+phase) + radius[1]*cos(frequency*time+phase)
  ellipse(pos[0],pos[1],2*((x-pos[0])**2+(y-pos[1])**2)**0.5)
  if (final) {
    fill(255)
  }
  else {
    fill(50)
  }
  ellipse(x,y,10)
  return [x,y]
}

const draw_fourier = (series, multiplier) => {
  let [x,y] = [100, HEIGHT/2]
  for (let i=0; i<series.data.length; i++) {
    if (i==series.data.length-1) {
      [x,y] = createRotatingPoint([x,y], series.data[i].A.map((item)=> {return item*multiplier}), series.data[i].n * series.omega, true, 0)
    }
    else {
    [x,y] = createRotatingPoint([x,y], series.data[i].A.map((item)=> {return item*multiplier}), series.data[i].n * series.omega, false, 0)
    }

  }
  return [x,y] 
}


const trail = (toShow) => {
  beginShape()
  stroke(255)
  noFill()
  for (let i=0; i<toShow.length; i++) {
    vertex(toShow[i][0], toShow[i][1])
  }
  endShape()
}
function draw() {
  background(0);
  
  let final = draw_fourier(my_fourier, 200)
  toShow.push(final)
  if (toShow.length>369) toShow.shift()
  
  
  // trail(toShow)
  beginShape()
  stroke(255)
  noFill()
  for (let i=0; i<toShow.length; i++) {
    vertex(toShow[toShow.length-i-1][1]+i, toShow[toShow.length-i-1][0])
  }
  endShape()
  stroke(255)
  fill(255)
  // line(0,HEIGHT/2,   WIDTH, HEIGHT/2)
  

  time+=0.01
}
