let width = window.innerWidth;
let height = window.innerHeight;

let scene, camera, renderer, light;

let A = {};
let B = {};
let C ={};

var controls;

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 20;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.TrackballControls( camera );
controls.target.set( 0, 0, 0 )

  let Random_Pos = new Vector3(Math.floor(Math.random()*5),Math.floor(Math.random()*5),Math.floor(Math.random()*5));
  let Random_Vel = new Vector3(Math.floor(Math.random()),Math.floor(Math.random()),Math.floor(Math.random()));
  A.geometry = new THREE.SphereGeometry(0.25,32,32);
  A.material = new THREE.MeshBasicMaterial({color:"red"});
  A.mesh = new THREE.Mesh(A.geometry,A.material);
  A.pos = Random_Pos;
  A.vel = Random_Vel;
  A.acc = new Vector3(0,0,0);

  Random_Pos = new Vector3(Math.floor(Math.random()*5),Math.floor(Math.random()*5),Math.floor(Math.random()*5));
  Random_Vel = new Vector3(Math.floor(Math.random()),Math.floor(Math.random()),Math.floor(Math.random()));
  B.geometry = new THREE.SphereGeometry(0.25,32,32);
  B.material = new THREE.MeshBasicMaterial({color:"blue"});
  B.mesh = new THREE.Mesh(B.geometry,B.material);
  B.pos = Random_Pos;
  B.vel = Random_Vel;
  B.acc = new Vector3(0,0,0);

  Random_Pos = new Vector3(Math.floor(Math.random()*5),Math.floor(Math.random()*5),Math.floor(Math.random()*5));
  Random_Vel = new Vector3(Math.floor(Math.random()),Math.floor(Math.random()),Math.floor(Math.random()));
  C.geometry = new THREE.SphereGeometry(0.25,32,32);
  C.material = new THREE.MeshBasicMaterial({color:"green"});
  C.mesh = new THREE.Mesh(C.geometry,C.material);
  C.pos = Random_Pos;
  C.vel = Random_Vel;
  C.acc = new Vector3(0,0,0);

  scene.add(A.mesh);
  scene.add(B.mesh);
  scene.add(C.mesh);

  animate();
}

function updateForce(){
  var Delta_AB = new Vector3(0,0,0);
  Delta_AB.diffVector(A.pos,B.pos);
  var Delta_AC = new Vector3(0,0,0);
  Delta_AC.diffVector(A.pos,C.pos);

  var Delta_BA = new Vector3(0,0,0);
  Delta_BA.diffVector(B.pos,A.pos);
  var Delta_BC = new Vector3(0,0,0);
  Delta_BC.diffVector(B.pos,C.pos);

  var Delta_CA = new Vector3(0,0,0);
  Delta_CA.diffVector(C.pos,A.pos);
  var Delta_CB = new Vector3(0,0,0);
  Delta_CB.diffVector(C.pos,B.pos);

  A.Force = new Vector3(-(Delta_AB.dx+Delta_AC.dx)/100,-(Delta_AB.dy+Delta_AC.dy)/100,-(Delta_AB.dz+Delta_AC.dz)/100);
  B.Force = new Vector3(-(Delta_BA.dx+Delta_BC.dx)/100,-(Delta_BA.dy+Delta_BC.dy)/100,-(Delta_BA.dz+Delta_BC.dz)/100);
  C.Force = new Vector3(-(Delta_CA.dx+Delta_CB.dx)/100,-(Delta_CA.dy+Delta_CB.dy)/100,-(Delta_CA.dz+Delta_CB.dz)/100);
}

function gravity(){
  A.acc = A.Force;
  B.acc = B.Force;
  C.acc = C.Force;
}

function onDocumentMouseMove( event ) {

    event.preventDefault();

    if ( isMouseDown ) {

        theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 )
                + onMouseDownTheta;
        phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 )
              + onMouseDownPhi;

        phi = Math.min( 180, Math.max( 0, phi ) );

        camera.position.x = radious * Math.sin( theta * Math.PI / 360 )
                            * Math.cos( phi * Math.PI / 360 );
        camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
        camera.position.z = radious * Math.cos( theta * Math.PI / 360 )
                            * Math.cos( phi * Math.PI / 360 );
        camera.updateMatrix();

    }

    mouse3D = projector.unprojectVector(
        new THREE.Vector3(
            ( event.clientX / renderer.domElement.width ) * 2 - 1,
            - ( event.clientY / renderer.domElement.height ) * 2 + 1,
            0.5
        ),
        camera
    );
    ray.direction = mouse3D.subSelf( camera.position ).normalize();

    interact();
    render();

}

function updateObject(object){
  object.vel.add(object.acc);
  object.pos.add(object.vel);
  object.mesh.position.x = object.pos.dx;
  object.mesh.position.y = object.pos.dy;
  object.mesh.position.z = object.pos.dz;
}

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();

  updateObject(A);
  updateObject(B);
  updateObject(C);

  updateForce();
  gravity();

}
init();
