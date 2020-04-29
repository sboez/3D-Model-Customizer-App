let Scene, Load;
let activeOption = 'legs', loaded = false;
const CTA = document.getElementById('js-cta-notice');

/* Select Option */
const options = document.querySelectorAll(".option");
for (const option of options) {
	option.addEventListener('click', selectOption);
}

function selectOption(e) {
	let option = e.target;
	activeOption = e.target.dataset.option;
	for (const otherOption of options) {
		otherOption.classList.remove('--is-active');
	}
	option.classList.add('--is-active');
}

/* Go ! */
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

	let Interface = new InterfaceInit();
	Interface.createSwatch(colors);

	let Slide = new SlideInit();
	Slide.createSlide(slider, sliderItems);

	const swatches = document.querySelectorAll(".tray__swatch");
	for (const swatch of swatches) {
		swatch.addEventListener('click', Interface.selectSwatch);
	}

	window.addEventListener('resize', onWindowResize, false);
	document.body.appendChild(Scene.renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
	Scene.renderer.render(Scene.scene, Scene.camera);
	if (Load.model != null && loaded == false) {
	 	Load.modelRotation();
	 	CTA.classList.add('start');
	}
}

function onWindowResize() {
	Scene.camera.aspect = window.innerWidth / window.innerHeight;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}

letsPlay();
