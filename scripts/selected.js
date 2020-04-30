let activeOption = 'legs';

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
