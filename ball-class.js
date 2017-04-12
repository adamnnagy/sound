class Ball {

  constructor(diameter, x, y, xspeed, yspeed) {
    this.x = x+diameter;
    this.y = y+diameter;
    this.diameter = diameter;
    this.xspeed = xspeed;
    // *floor(random(-2, 1));
    this.yspeed = yspeed;
    // *floor(random(-1, 1));
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

bounce() {
    if (this.x < 0 + this.diameter/2 || this.x > width - this.diameter/2) {
      this.xspeed = this.xspeed*-1;
    return true;
    } else if (this.y < 0 + this.diameter/2 || this.y > height - this.diameter/2) {
      this.yspeed *= -1;
      return true;
    } else {
      return false;
    }

  }

 display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
