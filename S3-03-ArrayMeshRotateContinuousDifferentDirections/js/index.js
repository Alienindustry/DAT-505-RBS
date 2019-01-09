var renderer, scene, camera;
var cubes = []; //cubes[] needs to be globally declared so that we can access them from any function

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(40, W / H, .1, 1000);//this changes the size of blocks to large blocks RBS changed again
  camera.position.set(0, 110, 0);// changed camera angle from 0,55,85 so the wall is vertical RBS
  camera.lookAt(scene.position);
  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add( listener );
  var camera, scene, renderer, spotLight, controls;// these new lines of code at 16-23 did not work obviously something missing to generate audio 

  var loader = new THREE.JSONLoader();
  var landscape, planetBig, planetMedium, planetSmall;

  var analyser, dataArray;
  var audioData = [];
  var stream = "https://cdn.rawgit.com/ellenprobst/web-audio-api-with-Threejs/57582104/lib/TheWarOnDrugs.m4a";// tried another audio code but preview screen went black at line23
  // create a global audio source
  var sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
  	sound.setBuffer( buffer );
  	sound.setLoop( true );
  	sound.setVolume( 0.5 );
  	sound.play();// tried to load this audio file to the code but with no effect line 13 to 27 RBS
  });
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x1db93f);// changed back ground colour to magenta line 20 RBS and to Lime green
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

   //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -45; x <= 45; x += 2) { // Start from -45 and sequentially add one every 5 pixels
    for (var y = -30; y <= 30; y += 2) {//changing the y to a smaller no creates oblongs rather than blocks RBS changing to 2 gives an interesting tiled effect
      var boxGeometry = new THREE.BoxGeometry(3, 1, 3);  // was 3 6 3
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random()* 0xFFFFFF});
      var box = new THREE.Mesh(boxGeometry, boxMaterial);

      //box.castShadow = true;

      box.position.x = x;
      box.position.z = y;
      box.scale.y = 100.5;// in creases and Decreases the size of bricks length RBS

      //box.rotation.x = Math.random() * 2 * Math.PI;;
      //box.rotation.y = Math.random() * 2 * Math.PI;;
      //box.rotation.z = Math.random() * 2 * Math.PI;;

      scene.add(box);
      cubes.push(box); //When we have our box object ready, add it to the array using push()
  44  }




  }// changed code back

  document.body.appendChild(renderer.domElement);
}

//Create two variables to store the direction of the motion
var rot1 = 10;// set rotation RBS
var rot2 = 10;

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
  });///

  renderer.render(scene, camera);
}

init();
drawFrame();
