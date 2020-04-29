const colors = [
{ color: '66533C' },
{ color: '173A2F' },
{ color: '153944' },
{ color: '27548D' },
{ color: '438AAC' }]

const TRAY = document.getElementById('js-tray-slide');

class InterfaceInit {
	buildColors(colors) {
		for (let [i, color] of colors.entries()) {
			let swatch = document.createElement('div');
			swatch.classList.add('tray__swatch');
			swatch.style.background = "#" + color.color;
			swatch.setAttribute('data-key', i);
			TRAY.append(swatch);
		}
	}
	/* build a new PhongMaterial out of the color */
	selectSwatch(e) {
		let color = colors[parseInt(e.target.dataset.key)];

		let new_mtl = new THREE.MeshPhongMaterial({
			color: parseInt('0x' + color.color),
			shininess: color.shininess ? color.shininess : 10
		});
		setMaterial(Load.model, 'legs', new_mtl);
		/* checks for the nameID, if it's the same as the parameter type, it adds the material to it */
		function setMaterial(parent, type, mtl) {
			parent.traverse((o) => {
				if (o.isMesh && o.nameID != null) {
					if (o.nameID == type) {
						o.material = mtl;
					}
				}
			});
		}
	}
}