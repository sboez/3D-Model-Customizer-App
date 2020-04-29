let Scene, Load;
let activeOption = 'legs', loaded = false;
const canvas = document.querySelector('#c');
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

	document.body.appendChild(Scene.renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
	Scene.renderer.render(Scene.scene, Scene.camera);

	if (resizeRendererToDisplaySize(Scene.renderer)) {
	    const canvas = Scene.renderer.domElement;
	    Scene.camera.aspect = canvas.clientWidth / canvas.clientHeight;
	    Scene.camera.updateProjectionMatrix();
	}

	if (Load.model != null && loaded == false) {
	 	Load.modelRotation();
	 	CTA.classList.add('start');
	}
}

function resizeRendererToDisplaySize(renderer) {
	const canvas = Scene.renderer.domElement;
	var width = window.innerWidth;
	var height = window.innerHeight;
	var canvasPixelWidth = canvas.width / window.devicePixelRatio;
	var canvasPixelHeight = canvas.height / window.devicePixelRatio;

	const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
	if (needResize) Scene.renderer.setSize(width, height, false);
	return needResize;
}

letsPlay();
