/* initial material to 3D model */
const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });
const LOADER = document.getElementById('js-loader');

const INITIAL_MAP = [
  {childID: "back", mtl: INITIAL_MTL},
  {childID: "base", mtl: INITIAL_MTL},
  {childID: "cushions", mtl: INITIAL_MTL},
  {childID: "legs", mtl: INITIAL_MTL},
  {childID: "supports", mtl: INITIAL_MTL},
];

let rotate = 0;

class LoadInit {
	loadGltf(path) {
		const loader = new THREE.GLTFLoader()
    	loader.load(path, (gltf) => {
			this.model = gltf.scene;
			this.model.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			this.model.scale.multiplyScalar(40);
			this.model.rotation.y = Math.PI;
			this.model.position.y = -1;
			for (let object of INITIAL_MAP) {
				this.initColor(this.model, object.childID, object.mtl);
			}
			Scene.scene.add(this.model);
			LOADER.remove();
		});
	}
	/* change material of all model's parts to have his shadow on the floor */
	initColor(parent, type, mtl) {
		parent.traverse((child) => {
			if (child.isMesh) {
				if (child.name.includes(type)) {
					child.material = mtl;
					child.nameID = type;
				}
			}
		});
	}
	modelRotation() {
		++rotate;
		if (rotate <= 120) this.model.rotation.y += Math.PI / 60;
		else loaded = true;
	}
}
