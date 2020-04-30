let Scene, Load;
let loaded = false;
const canvas = document.querySelector('#c');
const CTA = document.getElementById('js-cta-notice');

function letsPlay() {
	init();
	animate();
}

function init() {
	Scene = new SceneInit();
	Scene.createScene();
	Scene.createControls();

	Load = new LoadInit();
	Load.loadGltf("assets/model/chair.glb");

	let Swatches = new SwatchesInit();
	Swatches.createSwatch(colors);

	let Slide = new SlideInit();
	Slide.createSlide(slider, sliderItems);
	/* swatche selected */
	const swatches = document.querySelectorAll(".tray__swatch");
	for (const swatch of swatches) {
		swatch.addEventListener('click', Swatches.selectSwatch);
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
	/* CTA rotation model */
	if (Load.model != null && loaded == false) {
		Load.modelRotation();
		CTA.classList.add('start');
	}
}

function resizeRendererToDisplaySize(renderer) {
	const canvas = Scene.renderer.domElement;
	let width = window.innerWidth;
	let height = window.innerHeight;
	let canvasPixelWidth = canvas.width / window.devicePixelRatio;
	let canvasPixelHeight = canvas.height / window.devicePixelRatio;

	const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
	if (needResize) Scene.renderer.setSize(width, height, false);
	return needResize;
}

letsPlay();
