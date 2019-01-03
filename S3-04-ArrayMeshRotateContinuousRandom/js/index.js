var renderer, scene, camera;
var cubes = [];
var randomRotation1 = [];
var randomRotation2 = [];
var rot1 = [];
var rot2 = [];

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 00); //changing to 00 creates a flutter effect works at line 14 RBS
  camera.position.set(0, 80, 0);
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
      var boxGeometry = new THREE.BoxGeometry(9, 3, 9);//change 3 6 3 to 3 3 3 RBS
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      var box = new THREE.Mesh(boxGeometry, boxMaterial);

      //box.castShadow = true;

      box.position.x = x;
      box.position.z = y;
      box.scale.y = 0.5;

      box.rotation.x = Math.random() * 2 * Math.PI;;
      box.rotation.y = Math.random() * 2 * Math.PI;;
      box.rotation.z = Math.random() * 2 * Math.PI;;

      var randomValue1 = (Math.random() * 1) - 0.5;
      randomRotation1.push(randomValue1);
      rot1.push(0);

      var randomValue2 = (Math.random() * 1) - 0.5;
      randomRotation2.push(randomValue2);
      rot2.push(0);

      scene.add(box);
      cubes.push(box);
    }
  }
  //console.log(randomRotation);
  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);

  cubes.forEach(function(c, i) {
    rot1[i] += randomRotation1[i]/10;
    rot2[i] += randomRotation2[i]/10;
    c.rotation.x = rot1[i];
    c.rotation.y = rot2[i];
  });

  renderer.render(scene, camera);
}

init();
drawFrame();
