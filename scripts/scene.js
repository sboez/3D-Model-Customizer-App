class SceneInit {
	createScene() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xf1f1f1);
		this.scene.fog = new THREE.FogExp2(0xf1f1f1, 0.0005);

		this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.set(0, 30, 120);

		const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), new THREE.MeshPhongMaterial({ color: 0xeeeeee, shininess: 0 }));
		plane.rotation.x = -Math.PI / 2;
		plane.position.y = -1;
		plane.receiveShadow = true;
		this.scene.add(plane);

		this.createLights();
		this.createRenderer();
	}
	createLights() {
		const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61); 
		hemLight.position.set(0, 50, 0);
		this.scene.add(hemLight);

		const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
		dirLight.position.set(-80, 100, 40);
		dirLight.castShadow = true;
		dirLight.shadow.camera.left = -40;
		dirLight.shadow.camera.right = 40;
		dirLight.shadow.camera.top = 40;
		dirLight.shadow.camera.bottom = -40;

		this.targetObject = new THREE.Object3D();
		this.scene.add(this.targetObject);
		dirLight.target = this.targetObject;
	    this.scene.add(dirLight);
	}
	createControls() {
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.maxPolarAngle = Math.PI / 2;
		this.controls.minPolarAngle = Math.PI / 3;
		this.controls.enableDamping = true;
		this.controls.enablePan = false;
		this.controls.dampingFactor = 0.3;
		this.controls.maxDistance = 300;
		this.controls.target = new THREE.Vector3(0, 15, 0);
		this.controls.update();
	}
	createRenderer() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.shadowMap.enabled = true;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}
