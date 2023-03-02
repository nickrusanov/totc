import $ from 'jquery';

$(window).on('load', function () {
	// HIDDEN ELEMENT APPEAR

	const showElement = (elements) => {
		let order = 0;

		setTimeout(() => order = 0, 500);

		elements.forEach(el => {
			if (el.isIntersecting) {
				setTimeout(() => {
					el.target.classList.remove('hidden');
				}, 200 * (1 + order++));
			}
		})
	}

	const observer = new IntersectionObserver(showElement, { threshold: [0.25] });

	$('.hidden').each((i, el) => {
		observer.observe(el)
	})

	
	// STATISTIC NUMBERS APPEAR

	const showNum = (elements) => {
		let order = 0;

		setTimeout(() => order = 0, 500)

		elements.forEach(el => {
			if (el.isIntersecting) {
				if ($(el.target).hasClass('statistic__item--hidden')) {
					setTimeout(() => {
						let number = $(el.target).find('.statistic__number').html();
						let numberCurrent = 0;
						const step = number / 40;

						$(el.target).find('.statistic__number').html('00');
						el.target.classList.remove('statistic__item--hidden');

						function playAnimation() {
							if (numberCurrent + step < number) {
								numberCurrent += step;
								$(el.target).find('.statistic__number').html(`${Math.round(numberCurrent) > 9 ? Math.round(numberCurrent) : '0' + Math.round(numberCurrent)}`);
							} else {
								$(el.target).find('.statistic__number').html(`${number}`);
							}

							setTimeout(playAnimation, 60 * numberCurrent / number);
						}

						setTimeout(playAnimation, 60);
					}, 200 * (1 + order++));
				}
			}
		})
	}

	const numObserver = new IntersectionObserver(showNum, { threshold: [0.6] });

	$('.statistic__item--hidden').each(function () {
		numObserver.observe(this)
	})
})