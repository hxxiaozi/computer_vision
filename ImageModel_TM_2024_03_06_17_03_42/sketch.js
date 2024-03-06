// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'model/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

let col;
let posX = 0;
let posY = 0;
let i = 1;
let tt = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  
  fill(255);

  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  // fill(col);
  text(tt,posX+30*sin(0.1*i),posY+30*cos(0.1*i));
  text("thing",posX,posY);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;


  if (label == "nothing" ) {
    i++;
    tt="no";
  col = color(255,0,0);
  posX = width / 2+100*cos(0.15*i);
  posY = height / 2+100*sin(0.1*i);
  


  }else if(label == "something"){
    col = color(0,0,0,0);
    tt = "some";
  }
  
  console.log(results);
  // Classifiy again!
  classifyVideo();
}