var renderer, scene, camera;
var cubes = []; //cubes[] needs to be globally declared so that we can access them from any function

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(40, W / H, .1, 1000);//this changes the size of blocks to large blocks RBS
  camera.position.set(0, 110, 0);// changed camera angle from 0,55,85 so the wall is vertical RBS
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -45; x <= 45; x += 5) { // Start from -45 and sequentially add one every 5 pixels
    for (var y = -30; y <= 30; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 6, 3);
      //Random number generation - *3 for three variations
      var randomNumber = Math.floor(Math.random()*3);
      //Assign material based on random number
      switch (randomNumber)
      {
        case 0:
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
          break;
        case 1:
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0x00FF00});
          break;
        case 2:
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0x0000FF});
          break;
        break;

      }
  }

  document.body.appendChild(renderer.domElement);
}

//Create two variables to store the direction of the motion
var rot1 = 1;// set rotation RBS
var rot2 = 0;

function drawFrame(){
  requestAnimationFrame(drawFrame);
  rot1 += 0.01;
  rot2 -= 0.01;

  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
    if (i%2==0){ //On the even rows and colums use rot1, and on even rot2
      c.rotation.x = rot1;
    } else {
      c.rotation.x = rot2;
    }
  });

  renderer.render(scene, camera);
}

init();
drawFrame();
