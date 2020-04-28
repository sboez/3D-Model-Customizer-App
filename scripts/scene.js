class SceneInit {
	createScene() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xf1f1f1);
		this.scene.fog = new THREE.Fog(0xf1f1f1, 20, 10);

		this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.set(0, 30, 120);

		this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), new THREE.MeshPhongMaterial({ color: 0xeeeeee, shininess: 0 }));
		this.plane.rotation.x = -Math.PI / 2;
		this.plane.position.y = -1;
		this.plane.receiveShadow = true;
		this.scene.add(this.plane);

		this.createLights();
		this.createRenderer();
	}
	createLights() {
		this.hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61); 
		this.hemLight.position.set(0, 50, 0);
		this.scene.add(this.hemLight);

		this.dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
		this.dirLight.position.set(-80, 100, 40);
		this.dirLight.castShadow = true;
		this.dirLight.shadow.camera.left = -100;
		this.dirLight.shadow.camera.right = 100;
		this.dirLight.shadow.camera.top = 100;
		this.dirLight.shadow.camera.bottom = -100;

		this.targetObject = new THREE.Object3D();
		this.scene.add(this.targetObject);
		this.dirLight.target = this.targetObject;

		this.dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024); 
	    this.scene.add(this.dirLight);
	}
	createControls() {
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.maxPolarAngle = Math.PI / 2;
		this.controls.minPolarAngle = Math.PI / 3;
		this.controls.enableDamping = true;
		this.controls.enablePan = false;
		this.controls.dampingFactor = 0.3;
		this.controls.maxDistance = 300;
		this.controls.update();
	}
	createRenderer() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.shadowMap.enabled = true;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}
