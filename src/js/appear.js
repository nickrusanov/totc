import $ from 'jquery';

$(function () {
	const showElement = (elements) => {
		elements.forEach(el => {
			if (el.isIntersecting) {
				el.target.classList.remove('hidden');
			}
		})
	}

	const observer = new IntersectionObserver(showElement, { threshold: [0.5] })

	$('.hidden').each((i, el) => {
		observer.observe(el)
	})
})