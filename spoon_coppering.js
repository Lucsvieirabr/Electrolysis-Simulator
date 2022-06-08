let copper_Electrode_mass = 140;
let copper_RBG_Color = [204, 141, 45];
let spoon_RGB_color = [232, 230, 227];
let spoon_real_color = [232, 230, 227];

function play_coppering(){
    setInterval(update_coppering, 1000/60);
}

class CopperAtom{
    constructor(){
        this.x = 340;
        this.y = 230 + copper_Electrode_mass;
        this.radius = 5;
        this.color = copper_RBG_Color;
    }
    show(){
        // GET OLD FILL COLOR
        let old = canvasContext.fillStyle;
        canvasContext.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        canvasContext.fill();

        canvasContext.fillStyle = 'black';
        canvasContext.font = "10px Arial";
        canvasContext.fillText("Cu2", this.x -this.radius, this.y - 10);
        canvasContext.fillStyle = old;
    }
    move(){
        let regression = linearRegresion(this.x, this.y, 55, 290)
        this.x =  this.x - 2;
        this.y = regression(this.x) + 0.5;
    }
}

let copperAtom = new CopperAtom();

function setup_coppering_spoon(){
    let old = canvasContext.fillStyle;
    canvasContext.fillStyle = '#e6e6e6';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = old;
    drawn_electrochemical_vat()
    drawn_Copper_Electrode()
    drawn_Spoon()
    drawn_Eletric_Cable_Gerator()
}
function update_coppering() {
    
    //Canvas 
    setup_coppering_spoon()
    //Atom Functions
    if(copper_Electrode_mass > 0){
        copperAtom.show()
        copperAtom.move()
        if(check_collide_with_spoon(copperAtom)){
            change_spoon_color_to_copper()
            copper_Electrode_mass -= 5.6;
            copperAtom = new CopperAtom();  
        }
    }else{
        copper_Electrode_mass=0;
    }
}

function check_collide_with_spoon(atom){
    let distance = Math.sqrt(Math.pow(atom.x - 55, 2) + Math.pow(atom.y - 278, 2));
    if(distance <= 20){
        return true;
    }
    return false;
}

function drawn_Eletric_Cable_Gerator(){

    let old = canvasContext.fillStyle;
    canvasContext.strokeStyle = 'black';
    canvasContext.beginPath();
    canvasContext.moveTo(55, 230);
    canvasContext.lineTo(55, 125);
    canvasContext.moveTo(55, 125);
    canvasContext.lineTo(155, 125);

    canvasContext.moveTo(340, 230);
    canvasContext.lineTo(340, 125);
    canvasContext.moveTo(340, 125);
    canvasContext.lineTo(240, 125);
    canvasContext.stroke()

    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(155, 105, 2, 40);
    canvasContext.fillRect(240, 95, 2, 60);

    canvasContext.fillStyle = old;



}
function change_spoon_color_to_copper(){
    //1.12
    spoon_real_color[0] -= 1.12 ;
    spoon_RGB_color[0] = parseInt(spoon_real_color[0]);

    //3.56
    spoon_RGB_color[1] -= 3.56 ;
    spoon_RGB_color[0] = parseInt(spoon_real_color[1]);

    //7.28
    spoon_RGB_color[2] -= 7.28 ;
    spoon_RGB_color[0] = parseInt(spoon_real_color[2]);
}

function drawn_Spoon(){

    let old = canvasContext.fillStyle;
    //Spoon Rectangle
    canvasContext.fillStyle = `rgb(${spoon_RGB_color[0]},${spoon_RGB_color[1]},${spoon_RGB_color[2]})`;
    canvasContext.fillRect(50, 230, 10, 40);  
    // fill elipse
    canvasContext.beginPath();  

    //Spoon Ellipse
    canvasContext.ellipse(55, 278, 20, 12.5, 33, 0, 2 * Math.PI);
    canvasContext.fill();

    // return old
    canvasContext.fillStyle = old;

}

function drawn_Copper_Electrode(){

    let old = canvasContext.fillStyle;
    canvasContext.fillStyle = `rgb(${copper_RBG_Color[0]},${copper_RBG_Color[1]},${copper_RBG_Color[2]})`;
    canvasContext.fillRect(330, 230, 20, copper_Electrode_mass);
    canvasContext.fillStyle = old;
}

function drawn_electrochemical_vat(){

    let old = canvasContext.fillStyle;
    //Electrochemical Vat Border
    canvasContext.strokeStyle = 'black';
    canvasContext.strokeRect(20, 200, 360, 200);
    
    //Electrochemical Vat
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(20, 199, 360, 200);

    //Electrochemical Vat water
    canvasContext.fillStyle = '#96a4ff';
    canvasContext.fillRect(20, 220, 360, 179);

    canvasContext.fillStyle = old;

}

function linearRegresion(x1, y1, x2, y2){
    let m = (y2 - y1) / (x2 - x1);
    let b = y1 - m * x1;
    let func = (x) => m * x + b;
    return func;
}