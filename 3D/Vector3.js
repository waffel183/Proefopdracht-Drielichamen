class Vector3{
  constructor(dx, dy, dz,){
    this._dx = dx;
    this._dy = dy;
    this._dz = dz;
    //this.color = color || context.strokeStyle;
    this._r = Math.sqrt(Math.pow(this.dx,2) + Math.pow(this.dy,2));
    this._angle = Math.atan2(this.dy, this.dx);
  }

  get dx(){
    return this._dx;
  }

  get dy(){
    return this._dy;
  }

  get dz(){
    return this._dz;
  }

  set dx(dx_in){
    this._dx = dx_in;
    this._r = Math.sqrt(Math.pow(this.dx,2) + Math.pow(this.dy,2));
    this._angle = Math.atan2(this.dy, this.dx);
  }

  set dy(dy_in){
    this._dy = dy_in;
    this._r = Math.sqrt(Math.pow(this.dx,2) + Math.pow(this.dy,2));
    this._angle = Math.atan2(this.dy, this.dx);
  }

  set dz(dz_in){
    this._dz = dz_in;
    this._r = Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2));
    this._angle = Math.atan2(this.dy,this.dx);
  }

  get r(){
    return Math.sqrt(Math.pow(this.dx,2) + Math.pow(this.dy,2));
  }

  get angle(){
    return Math.atan2(this.dy,this.dx)
  }

  set angle(angle_in){
    this._angle = angle_in;
    this._dx = this._r*Math.cos(this._angle);
    this._dy = this._r*Math.sin(this._angle);
  }

  set r(r_in){
    if(r_in<0){
      this._angle += Math.PI
    }
    this._r = Math.abs(r_in);
    this._dx = this._r*Math.cos(this._angle);
    this._dy = this._r*Math.sin(this._angle);
  }

  add(vector){
    this._dx += vector.dx;
    this._dy += vector.dy;
    this._dz += vector.dz;
  }

  draw(context,x,y,scale){
    context.beginPath();
    context.strokeStyle = this.color;
    context.save();
    context.translate(x,y);
    context.rotate(this._angle);
    context.moveTo(0,0);
    context.lineTo(this._r*scale,0);
    context.stroke();
    context.closePath();
    context.restore();
  }

  sumVector(a,b){
    this.dx = a.dx + b.dx;
    this.dy = a.dy + b.dy;
    this.dz = a.dz + b.dz;
  }

  diffVector(a,b){
    this.dx = a.dx - b.dx;
    this.dy = a.dy - b.dy;
    this.dz = a.dz - b.dz;
  }

  scalair(num){
    this.dx = this.dx*num;
    this.dy = this.dy*num;
    this.dz = this.dz*num;
  }

  calcBiSector(diff_bc){
    this.dx = diff_bc.dx/2;
    this.dy = diff_bc.dy/2;
    this.dz = diff_bc.dz/2;
  }

  dotProduct(vector){
    return this.dx * vector.dx + this.dy * vector.dy + this.dz * vector.dz;
  }
}
