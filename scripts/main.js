let Scene, Load;

function letsPlay() {
	init();
	animate();
}

async function init() {
	Scene = new SceneInit();
	Scene.createScene();
	Scene.createControls();

	Load = new LoadInit();
	await Load.loadGltf("assets/models/chair.glb");

	window.addEventListener('resize', onWindowResize, false);
	document.body.appendChild(Scene.renderer.domElement);
}

function onWindowResize() {
	Scene.camera.aspect = window.innerWidth / window.innerHeight;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	Scene.renderer.render(Scene.scene, Scene.camera);
}

letsPlay();