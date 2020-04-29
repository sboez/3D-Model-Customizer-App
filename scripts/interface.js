const colors = [
{
    texture: './assets/img/wood_.jpg',
    size: [2,2,2],
    shininess: 60
},
{
    texture: './assets/img/denim_.jpg',
    size: [3, 3, 3],
    shininess: 0
},
{ color: '66533C' },
{ color: '173A2F' },
{ color: '153944' },
{ color: '27548D' },
{ color: '438AAC' }]

const TRAY = document.getElementById('js-tray-slide');

class InterfaceInit {
	createSwatch(colors) {
		for (let [i, color] of colors.entries()) {
			let swatch = document.createElement('div');
			swatch.classList.add('tray__swatch');

			if (color.texture) swatch.style.backgroundImage = "url(" + color.texture + ")";   
			else swatch.style.background = "#" + color.color;
			swatch.setAttribute('data-key', i);
			TRAY.append(swatch);
		}
	}
	/* check if texture and build one or build a new PhongMaterial out of the color */
	selectSwatch(e) {
		let color = colors[parseInt(e.target.dataset.key)];
		let new_mtl;

		if (color.texture) {
			let txt = new THREE.TextureLoader().load(color.texture);
			txt.repeat.set(color.size[0], color.size[1], color.size[2]);
			txt.wrapS = THREE.RepeatWrapping;
			txt.wrapT = THREE.RepeatWrapping;

			new_mtl = new THREE.MeshPhongMaterial( {
				map: txt,
				shininess: color.shininess ? color.shininess : 10
			});
		} else {
			new_mtl = new THREE.MeshPhongMaterial({
				color: parseInt('0x' + color.color),
				shininess: color.shininess ? color.shininess : 10
			});
		}
		setMaterial(Load.model, activeOption, new_mtl);
		/* check for the nameID, if it's the same as the parameter type, it adds the material to it */
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