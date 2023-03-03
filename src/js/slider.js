import $ from 'jquery';

$(window).on('load', function () {
	if ($('.login__slider').length !== 0) {
		let loginSliderCurrent = 0;

		setInterval(() => {
			$('.login__slider-item')[loginSliderCurrent].classList.remove('login__slider-item--active');

			$('.login__slider-item')
			[loginSliderCurrent + 1 === 3 ? loginSliderCurrent = 0 : ++loginSliderCurrent]
				.classList.add('login__slider-item--active');
		}, 7000)
	}

	if ($('.feedback').length !== 0) {
		let feedbackCurrent = 0;
		let feedbackTimerNewOn = false;

		const feedbackNext = () => {
			$('.feedback__photo-item')[feedbackCurrent].classList.remove('feedback__photo-item--active');
			$('.feedback__comment')[feedbackCurrent].classList.remove('feedback__comment--active');

			$('.feedback__photo-item')[feedbackCurrent + 1 === 3 ? feedbackCurrent = 0 : ++feedbackCurrent].classList.add('feedback__photo-item--active');
			$('.feedback__comment')[feedbackCurrent].classList.add('feedback__comment--active');
		}

		const feedbackPrev = () => {
			$('.feedback__photo-item')[feedbackCurrent].classList.remove('feedback__photo-item--active');
			$('.feedback__comment')[feedbackCurrent].classList.remove('feedback__comment--active');

			$('.feedback__photo-item')[feedbackCurrent === 0 ? feedbackCurrent = 2 : --feedbackCurrent].classList.add('feedback__photo-item--active');
			$('.feedback__comment')[feedbackCurrent].classList.add('feedback__comment--active');
		}

		const feedbackTimerNew = () => {
			clearInterval(feedbackTimer);

			if (!feedbackTimerNewOn) {
				setTimeout(() => {
					feedbackTimer = setInterval(() => feedbackNext(), 10000);
					feedbackTimerNewOn = false;
				}, 15000)
			}

			feedbackTimerNewOn = true;
		}

		let feedbackTimer = setInterval(() => feedbackNext(), 10000);

		$('.feedback__prev').on('click', () => feedbackPrev());

		$('.feedback__next').on('click', () => feedbackNext());

		$('.feedback__box').on('click', () => feedbackTimerNew());
	}
})