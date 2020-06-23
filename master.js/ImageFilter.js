var oImage = null;
var grayImage = null;
var redImage = null;
var negative = null;
var sepia = null;
var xRay = null;
var blur = null;
var canvas = document.getElementById("can");

function loadImage () {
  var file = document.getElementById ("fileIn");
  oImage = new SimpleImage (file);
  grayImage = new SimpleImage (file);
  redImage = new SimpleImage (file);
  negative = new SimpleImage (file);
  sepia = new SimpleImage (file);
  xRay = new SimpleImage (file);
  blur = new SimpleImage (file);
  oImage.drawTo(canvas);
}

function imageIsLoaded(img) {
  if (img == null || !img.complete()) {
    alert("Image not loaded");
    return false;
  } else {
    return true;
  }
}

function doGray() {
  if (imageIsLoaded(grayImage)) {
    filterGray();
    grayImage.drawTo(canvas);
  }
}

function filterGray() {
  for (var pixel of grayImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

function doRed () {
    if (imageIsLoaded(redImage)) {
    filterRed();
    redImage.drawTo(canvas);
  }
}

function filterRed () {
  for (var pixel of redImage.values()){
    var avg = (pixel.getRed() + pixel.getGreen () + pixel.getBlue())/3; 
    if (avg < 127) {
      pixel.setRed (2 * avg);
      pixel.setGreen (0);
      pixel.setBlue (0);
    }  else {
      pixel.setRed (255);
      pixel.setGreen (2 * avg - 255);
      pixel.setBlue (2 * avg - 255);
    }
  }
}

function doNeg(){
  if (imageIsLoaded(negative)){
    filterNeg();
    negative.drawTo(canvas);
  }
}

function filterNeg (){
  for (var pixel of negative.values()){
    var r = (255 - pixel.getRed());
    var g = (255 - pixel.getGreen());
    var b = (255 - pixel.getBlue());
    
    pixel.setRed (r);
    pixel.setGreen (g);
    pixel.setBlue (b);
  }
}


function doSepia(){
	if (imageIsLoaded(sepia)){
		filterSepia();
		sepia.drawTo(canvas);}
}
    		
function filterSepia() {
    for (var pixel of sepia.values()){
    var r = (140 + pixel.getRed());
    var g = (110 + pixel.getGreen());
    var b = (45 + pixel.getBlue());
    
    pixel.setRed (r);
    pixel.setGreen (g);
    pixel.setBlue (b);
  }
}

function doXray() {
	if (imageIsLoaded(xRay)){
		filterXray();
		xRay.drawTo(canvas); }
}
    		
function filterXray() {
    for (var pixel of xRay.values()){
    var r = (120 - pixel.getRed());
    var g = (100 - pixel.getGreen());
    var b = (180 - pixel.getBlue());
    
    pixel.setRed (r);
    pixel.setGreen (g);
    pixel.setBlue (b);
  }
}
function doBlur(){
  if(imageIsLoaded(blur)) {
    filterBlur();
    blur.drawTo(canvas);
  }
}

function filterBlur() {
    for(var pixel of blur.values()){
      var x= pixel.getX();
      var y= pixel.getY();
      rand= Math.random();
      if(rand < .5) {
        blur.setPixel(x,y,pixel);
      }
    else {
      nearByPixel(x,y);
    }   
  }
}  

function nearByPixel(x,y) {
  var w = blur.getWidth();
  var h = blur.getHeight();
  var tempx = x + Math.floor(20*rand);
  var tempy = y + Math.floor(10*rand);
  if (tempx >= w) {
    tempx = w - Math.floor(10*rand) - 1;
  }
  if (tempy >= h) {
    tempy = h- Math.floor(10*rand) - 1;
  }
  var newPixel = blur.getPixel(tempx, tempy);
  blur.setPixel(x,y,newPixel);
}

function reset() {
  if (imageIsLoaded(oImage)) {
    grayImage = new SimpleImage(oImage);
    redImage = new SimpleImage(oImage);
    negative = new SimpleImage(oImage);
    sepia = new SimpleImage(oImage);
    xRay = new SimpleImage(oImage);
    blur = new SimpleImage(oImage);
    oImage.drawTo(canvas);
  }
}
  
function doClear(){
  var context = canvas.getContext ("2d");
  context.clearRect (0,0,canvas.width,canvas.height);
}

