let slider = document.getElementById('js-tray'), sliderItems = document.getElementById('js-tray-slide'), difference;

class SlideInit {
	createSlide(wrapper, items) {
		let posX1 = 0,
		posX2 = 0,
		posInitial,
		threshold = 20,
		posFinal,
		slides = items.getElementsByClassName('tray__swatch');

		items.onmousedown = dragStart;
		items.addEventListener('touchstart', dragStart);
		items.addEventListener('touchend', dragEnd);
		items.addEventListener('touchmove', dragAction);

		function dragStart (e) {
			e = e || window.event;
			posInitial = items.offsetLeft;
			difference = sliderItems.offsetWidth - slider.offsetWidth;
			difference = difference * -1;

			if (e.type == 'touchstart') {
				posX1 = e.touches[0].clientX;
			} else {
				posX1 = e.clientX;
				document.onmouseup = dragEnd;
				document.onmousemove = dragAction;
			}
		}

		function dragAction (e) {
			e = e || window.event;

			if (e.type == 'touchmove') {
				posX2 = posX1 - e.touches[0].clientX;
				posX1 = e.touches[0].clientX;
			} else {
				posX2 = posX1 - e.clientX;
				posX1 = e.clientX;
			}

			if (items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference) {
				items.style.left = (items.offsetLeft - posX2) + "px";
			}
		}
		
		function dragEnd (e) {
			posFinal = items.offsetLeft;
			if (posFinal - posInitial < -threshold) { } 
			else if (posFinal - posInitial > threshold) { }
			else items.style.left = (posInitial) + "px";

			document.onmouseup = null;
			document.onmousemove = null;
		}
	}
}
