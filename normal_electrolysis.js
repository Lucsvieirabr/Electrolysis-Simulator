function play_normal_electrolysis(){
    setInterval(update_normal_electrolysis, 1000/60);
}

w = 400
h = 400

electrolyts = {
  
   'cathode':{
    'name': "cathode",
    'accumulatedMass': 0,
    'x': 80,
    'y': 220,
    'centerX': 87.5, // X + Width /2
    'lowestY': 360, // Y + Height
    'width': 15,
    'height': 140,
    'color':'rgb(189,189,189)'
  },
  
  'anode':{
    'name': "anode",
    'accumulatedMass': 0,
    'x': 295,
    'y': 220,
    'centerX': 302.5, // X + Width /2
    'lowestY': 360, // Y + Height
    'width': 15,
    'height': 140,
    'color':'rgb(189,189,189)'
  }
}

class Atom{
  constructor(type){
    this.x = random(160, 200);
    this.y = random(220, 345);
    this.text = type;
    this.electrode = type === 'C+'? electrolyts.cathode : electrolyts.anode;
    this.toGoX = this.electrode.x 
    this.iterator = 1;
  }
  show(){
    noStroke()
    fill('black')
    textSize(15)
    text(this.text, this.x, this.y)
  }
  move(){
    let regression = linearRegression(this.x, this.y,this.electrode.centerX, this.electrode.lowestY) 
    if(this.text != 'C+'){
      this.x = this.x + 0.5
    }else{
      this.x = this.x - 0.5
    }
    this.y =regression(this.x) + 0.4

  }
}
let atoms;
function setup() {
  createCanvas(w, h).parent('allCanvasDiv');
  background("#e6e6e6");
  atoms = [new Atom('C+'),new Atom('C+'),new Atom('A-'),new Atom('A-')]
}
function setup_eletrolysis(){
    background("#e6e6e6");
    drawnBecker()
    drawnElectrolyts()
}
function update_normal_electrolysis() {
    setup_eletrolysis()
    atoms.forEach((atom) => {
        atom.show()
        atom.move()
      });
      checkColissonWithElectrode(atoms)
}

function checkColissonWithElectrode(atoms){
  for(i=0; i < atoms.length; i++){
    if(atoms[i].x > atoms[i].electrode.x + 10 && atoms[i].text != "C+" || atoms[i].x < atoms[i].electrode.x + 10 && atoms[i].text ==="C+"){
      
      if(atoms[i].electrode.accumulatedMass < 40){
        atoms.push(new Atom(atoms[i].text))
      }
      atoms[i].electrode.accumulatedMass += 2
      atoms.splice(i, 1)
    }
  }
}

function linearRegression(x1, y1, x2, y2){
  let m = (y1 - y2) / (x1 - x2)
  let b = y1 - m * x1
  let func = (x) => { return m * x + b };
  return func
}
function drawnBecker(){
  //Drawn Becker 
  fill('white')
  stroke('black')
  rect(40, 220, 320, 180)
  
  //Drawn a White line to make it "open"
  stroke('white')
  line(41, 220, 359, 220)
}
function drawnCathodeAccumulatedMass(){
  noStroke()
  fill('#DD6D10')
  circle(electrolyts.cathode.centerX, electrolyts.cathode.lowestY -15, electrolyts.cathode.accumulatedMass)
  fill('#DD6D10')
  circle(electrolyts.cathode.centerX +5, electrolyts.cathode.lowestY -15, electrolyts.cathode.accumulatedMass)
  fill('#DD6D10')
  circle(electrolyts.cathode.centerX +5, electrolyts.cathode.lowestY -5, electrolyts.cathode.accumulatedMass)
  fill('#DD6D10')
  circle(electrolyts.cathode.centerX -5, electrolyts.cathode.lowestY -5, electrolyts.cathode.accumulatedMass)
  
  if(electrolyts.anode.accumulatedMass > 0){
    fill('rgb(23,221,23)')
    textSize(15)
    text('A + ' + electrolyts.anode.accumulatedMass/2 +'e', electrolyts.anode.centerX -20, electrolyts.cathode.lowestY + 20)
  }
}

function drawnElectrolyts(){
  //Drawn the electrolytes
  fill(electrolyts.cathode.color)
  stroke(electrolyts.cathode.color)
  rect(electrolyts.cathode.x, electrolyts.cathode.y,           electrolyts.cathode.width, electrolyts.cathode.height)
  
  drawnCathodeAccumulatedMass()
  
  fill(electrolyts.anode.color)
  stroke(electrolyts.anode.color)
  rect(electrolyts.anode.x, electrolyts.anode.y,                 electrolyts.anode.width, electrolyts.anode.height)
  
}