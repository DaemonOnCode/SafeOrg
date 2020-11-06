let x = 0,AntipastoPro;

function preload() {
  AntipastoPro = loadFont('AntipastoPro-Light_trial.ttf');
}

function setup() {
  createCanvas(600,600);
  background(255);
}


S = 4

function draw() {
  
  textSize(10);
  textFont(AntipastoPro)

  // Big Box
  rect(30*S,30*S,240*S,150*S)

  //kitchen Pantry
  rect(30*S,30*S,150*S,140*S)

  //
  fill(255,40,80)
  //meeting space
  rect(30*S,30*S,80*S,70*S)
  //creative space
  rect(30*S,(30  + 70)*S,50*S,50*S)
  fill(255)

  rect(30*S,(30 + 120)*S,150*S,50*S)

  rect((30 + 150)*S,(30 + 120)*S,90*S,50*S)


  //Office Space
  rect((30 + 150)*S,30*S, 45*S, 60*S)
  rect((30 + 150 + 45)*S,30*S, 45*S, 60*S)

  rect((30 + 150)*S,(30 + 155)*S, 45*S, 15*S)
  rect((30 + 150 + 45)*S,(30+155)*S, 45*S, 15*S)

  rect((30 + 150 + 45 + 30)*S,(30+120)*S, 15*S, 35*S)

  rect((30 + 150 + 45 + 15)*S,(30+120)*S, 15*S, 15*S)
  
  
  fill(0);

  text('Meetings/\nCreative Space', 49*S/1.5, 60*S/1.5);

  text('Conference/\nLab', 49*S/1.5, 190*S/1.5);

  text('Kitchen and Pantry', 49*S/1.5 , 290*S/1.5)

  text('Support', 360*S/1.5 , 190*S/1.5)

  noloop(); 
}