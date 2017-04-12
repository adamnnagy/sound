var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 400;
// Where are we now and where were we?
var current;
var previous;

var d = 80;
var y = 300;
var speed = 3;
var mic;
var balls = [];
var bg;

function setup(){

  createCanvas(windowWidth,windowHeight);

  current = createVector(0,0);
    previous = createVector(0,0);

  mic = new p5.AudioIn();
  mic.start();

  ball = new Ball(20, random(width), random(height), random(2, 3), random(1, 3));

}

function draw() {

  // fill(240, 187, 249);
  // rect(0,0,windowWidth,windowHeight);
  // background(bg);

  micLevel = mic.getLevel();
  // console.log(micLevel);

  fill(255);
  ball.y = map(micLevel, 0,1, windowHeight/2, windowHeight);



  ball.bounce();
  ball.move();
  ball.display();

  if (millis() > next && painting) {

      // Grab mouse position
      current.x = ball.x;
      current.y = ball.y;

      // New particle's force is based on mouse movement
      var force = p5.Vector.sub(current, previous);
      force.mult(0.05);

      // Add new particle
      paths[paths.length - 1].add(current, force);

      // Schedule next circle
      next = millis() + random(200);

      // Store mouse values
      previous.x = current.x;
      previous.y = current.y;
    }

    // Draw all paths
    for( var i = 0; i < paths.length; i++) {
      paths[i].update();
      paths[i].display();
    }
    next = 0;
    painting = true;
    previous.x = ball.x;
    previous.y = ball.y;
    paths.push(new Path());
    // something();
  }


//replace this!

function something() {
  next = 0;
  painting = true;
  previous.x = ball.x;
  previous.y = ball.y;
  paths.push(new Path());
}

//using https://p5js.org/examples/hello-p5-drawing.html


function Path() {
  this.particles = [];
  this.hue = random(100);
}

Path.prototype.add = function(position, force) {
  // Add a new particle with a position, force, and hue
  this.particles.push(new Particle(position, force, this.hue));
}

// Display plath
Path.prototype.update = function() {
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}

Path.prototype.display = function() {

  // Loop through backwards
  for (var i = this.particles.length - 1; i >= 0; i--) {
    // If we shold remove it
    if (this.particles[i].lifespan <= 0) {
      this.particles.splice(i, 1);
    // Otherwise, display it
    } else {
      this.particles[i].display(this.particles[i+1]);
    }
  }

}

// Particles along the path
function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 1.95;
  this.lifespan = 255;
}

Particle.prototype.update = function() {
  // Move it
  this.position.add(this.velocity);
  // Slow it down
  this.velocity.mult(this.drag);
  // Fade it out
  this.lifespan--;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {
  stroke(0, this.lifespan);
  fill(0, this.lifespan/2);
  ellipse(this.position.x,this.position.y, 8, 8);
  // If we need to draw a line
  if (other) {
    line(this.position.x, this.position.y, other.position.x, other.position.y);
  }
}
