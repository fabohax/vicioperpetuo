var columns = 100;
var rows = 300;
var xSpace = 10;
var ySpace = 20;
var pivot;
var radiusNoise;
var noiseSpeed;
let pgTextSize;
let currentpgTextSize;
var record = false;
var lineCount = 3;
var leading = 0.8;
var currentLeading;
var input;
var splitInput = [];
var iT = [];
var currentInput;
var foreCol, backCol;

function preload(){
  font1 = loadFont('assets/KeplerStd-Medium.otf');
}

      function setup() {
   
         createCanvas(windowWidth, windowHeight, WEBGL);
      
         frameRate(48);
         noSmooth();
      
         noiseSpeedSlider = createSlider(1,100,15, 0.01); noiseSpeedSlider.position(width/2-150,10); noiseSpeedSlider.style('display','none');
      
         radiusNoiseSlider = createSlider(0,1,0.01,0.01); radiusNoiseSlider.position(width/2-150,40); radiusNoiseSlider.style('display','none');
         tumultSlider = createSlider(0,6*PI,6*PI,0.1); tumultSlider.position(width/2-150,60); tumultSlider.style('display','none');
      
         columnSlider = createSlider(1,150,45); columnSlider.position(width/2+10,40); columnSlider.style('display','none');
         rowSlider = createSlider(1,75,45); rowSlider.position(width/2+10,60); rowSlider.style('display','none');
      
         inp = createInput('vicio perpetuo|vicio perfecto');
         inp.position(0, height);
         inp.style('width', '100%');
         inp.style('height', '5vh');
         inp.style('textAlign', 'center');
         inp.style('outline', 'none');
         inp.style('border', 'none');
         inp.style('overflow', 'hidden');
         inp.style('display', 'none');
      
         fontSizeSlider = createSlider(1,500,170); fontSizeSlider.position(width/2 + 20,height - 80); fontSizeSlider.style('display','none');
         leadingSlider = createSlider(0,2,0.8,0.01); leadingSlider.position(width/2 + 20,height - 60); leadingSlider.style('display','none');
      
         sel = createSelect(); sel.position(width/2 - 215,height - 80);
         sel.option('KeplerStd-Medium',0);
         sel.selected(0);
         sel.changed(createSplits);
      
         sel.style('display','none');
      
         foreCol = color('#000');
         bkgdCol = color('#fff');
      }
 

function draw() {
  clear()



  background(bkgdCol);

  noiseSpeed = noiseSpeedSlider.value()/1000;
  radiusNoise = radiusNoiseSlider.value() * map(fontSizeSlider.value(),0,1,0,2);
  tumult = tumultSlider.value();
  columns = columnSlider.value();
  rows = rowSlider.value();
  input = inp.value();
  pgTextSize = fontSizeSlider.value();
  leading = leadingSlider.value();

  if(input != currentInput || leading != currentLeading || pgTextSize != currentpgTextSize){
    createSplits();
    currentInput = input;
    currentLeading = leading;
    currentpgTextSize = pgTextSize;
  }

  for(var z = 0; z<splitInput.length; z++){
    push();
  //  rotateZ(pivot);
    var stripS = iT[z];
    textureMode(NORMAL);

    xSpace = stripS.width/columns;
    ySpace = stripS.height/rows;

    texture(stripS);
    translate(-stripS.width/2,-stripS.height/2 - stripS.height*leading*(splitInput.length-1)/2 + stripS.height*z*leading);

    for(var y = 0; y<rows; y++){
      beginShape(TRIANGLE_STRIP);
      for(var x = 0; x<=columns; x++){
        let baseSpot = dist(0,stripS.height,stripS.width,-stripS.height/0.5);
        let currentSpot = dist(x*xSpace,y*ySpace, stripS.width, -stripS.height/0.5);
        let distMap = map(currentSpot,0,baseSpot,1,0);
        let radiusMap = easer(distMap)*radiusNoise;

        let nextSpot = dist(x*xSpace,(y+1)*ySpace, stripS.width, -stripS.height/0.5);
        let distMapNext = map(nextSpot,0,baseSpot,1,0);
        let radiusMapNext = easer(distMapNext)*radiusNoise;

        let noiseAngle = map(noise((x - (noiseSpeed*15)*frameCount) * 0.1, (y + z*rows + (noiseSpeed*5)*frameCount) * 0.1,frameCount*noiseSpeed),0,1,-tumult,tumult);
        let noiseAngleNext = map(noise((x - (noiseSpeed*15)*frameCount) * 0.1, (y+1  + z*rows + (noiseSpeed*5)*frameCount) * 0.1,frameCount*noiseSpeed),0,1,-tumult,tumult);

        let u = map(x*xSpace + sin(noiseAngle)*radiusMap, 0, stripS.width, 0, 1);
        let vTop = map(y*ySpace + cos(noiseAngle)*radiusMap, 0, stripS.height, 0, 1);
        let vBottom = map((y+1)*ySpace + cos(noiseAngleNext)*radiusMapNext, 0, stripS.height, 0, 1);

        vertex(x*xSpace,y*ySpace,u,vTop);
        vertex(x*xSpace,(y+1)*ySpace,u,vBottom);
      }
      endShape();
    }
    pop();
  }

  if(record){
    saveCanvas('stg_danger', 'png');
    record = false;
    print("done?");
  }

  push();
  translate(-width/2,-height/2);

  fill(foreCol);
  textAlign(RIGHT);
  textSize(10);
  textFont(font1);
  
  textAlign(LEFT);
  
  
  noFill();
  stroke(foreCol);
  
  pop();
}

function createSplits(){


  splitInput = input.split('|');

  for(var i=0; i<splitInput.length; i++){
    createIndTexture(i,splitInput[i]);
  }
}

function easer(step){
  var p = 4;
  return pow(step,p)/(pow(step,p) + pow(1-step,p));
}

function resetPreset(){
  noiseSpeedSlider.value(30); //50
  radiusNoiseSlider.value(0.1); //1
  tumultSlider.value(3*PI); // 6*PI
  columnSlider.value(45); rowSlider.value(45); //150
  inp.value('vicio perpetuo|vicio perfecto');
  fontSizeSlider.value(170); //500
  leadingSlider.value(0.6); //2
  sel.value(0); //4
   
}

function createIndTexture(i,indInput){
  let selectedFont;

  if(sel.value() == 0){
    selectedFont = font1;
  }

  textSize(pgTextSize);
  textFont(selectedFont);
  repeatSize = textWidth(indInput)*1.015;

  var textureWidth = repeatSize*1.4;
  var textureHeight = pgTextSize*1.2;

  var textNudgeDown = pgTextSize*0.7/2;

  if(sel.value()==3){
    textureHeight = pgTextSize*1.75;
    textureWidth = repeatSize*1.75;
    textNudgeDown = pgTextSize*0.7/4;
  }

  iT[i] = createGraphics(textureWidth,textureHeight);
//  iT[i].background(0,0,255);
  iT[i].fill(foreCol);
  iT[i].noStroke();
  iT[i].textAlign(CENTER);
  iT[i].textSize(pgTextSize);
  iT[i].textFont(selectedFont);
  iT[i].translate(textureWidth/2,textureHeight/2 + textNudgeDown);
//  v1.rotate(-PI/64);
  iT[i].text(indInput,0,0);
}
