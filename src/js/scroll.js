import $ from 'jquery'

$(window).on('load', function () {
	// HEADER

	const headerChange = () => {
		if ($('.home').length !== 0) {
			if (window.scrollY > 200) {
				$('.header').addClass('header--fixed');
				$('.main').addClass('header-padding');
			} else {
				$('.header').removeClass('header--fixed');
				$('.main').removeClass('header-padding');
			}

			window.scrollY > window.innerHeight
				? $('.header').addClass('header--animation')
				: $('.header').removeClass('header--animation');
		} else if (window.scrollY > 0) {
			$('.header').addClass('header--fixed');
			$('.main').addClass('header-padding');
		} else {
			$('.header').removeClass('header--fixed');
			$('.main').removeClass('header-padding');
		}

	}

	if ($('.side-nav').length !== 0) {
		$('.side-nav__link').each(function () {
			this.addEventListener('click', function () {
				window.removeEventListener('scroll', headerChange);

				$('html').animate({
					scrollTop: $(`${this.getAttribute('href')}`).offset().top - 40
				}, 500)

				setTimeout(() => {
					window.addEventListener('scroll', headerChange);

					if (this.getAttribute('href') === '#top') {
						$('.header').css('transition', 'none');
						$('.header').removeClass('header--animation');
						$('.header').removeClass('header--fixed');
						$('.main').removeClass('header-padding');
						setTimeout(() => {
							$('.header').removeAttr('style');
						}, 100)
					}
				}, 500)
			})
		})
	}

	window.addEventListener('scroll', headerChange);

	headerChange();


	// SIDE-NAV POINT

	if ($('.side-nav').length !== 0) {
		const pointChange = () => {
			let pointCurrentNew = 0;

			sectionsArray.forEach((el, i) => {
				if ($(el).offset().top < window.scrollY + 300 &&
					window.scrollY + 300 < (i + 1 !== sectionsArray.length ? $(sectionsArray[i + 1]).offset().top : 100000)) {
					pointCurrentNew = i;
				}
			})

			if (pointCurrent !== pointCurrentNew) {
				if (pointCurrent !== undefined) {
					document.querySelector(`.side-nav__link[href="#${sectionsArray[pointCurrent].id}"]`).classList.remove('side-nav__link--active');
				}

				document.querySelector(`.side-nav__link[href="#${sectionsArray[pointCurrentNew].id}"]`).classList.add('side-nav__link--active');
				pointCurrent = pointCurrentNew;
			}
		}

		const sectionsArray = $.map($('.side-nav__link'), function (el) {
			return document.querySelector(`${el.getAttribute('href')}`);
		});

		let pointCurrent;

		window.addEventListener('scroll', pointChange);

		pointChange();
	}


	// SWIPE BOTTOM

	if ($('.seller').length !== 0) {
		$('.seller__shift-btn').on('click', function () {
			$('html').animate({
				scrollTop: $('#about').offset().top - 40
			}, 500)
		})
	}


	// SALE

	if ($('.sale').length !== 0) {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 1000) {
				$('.sale').addClass('sale--visible');
			}
		})
	}


	// COURSES

	if ($('.courses').length !== 0) {
		const completeWayShow = () => {
			if ((window.scrollY + 650 >= $('.unleash__way-wrapper').offset().top)
				&& window.scrollY + 550 <= $('.unleash__way-wrapper').offset().top + $('.unleash__way-wrapper').outerHeight()) {
				const completeHeight = Math.round(window.scrollY - $('.unleash__way-wrapper').offset().top + 600);

				document.querySelector('.unleash__way-wrapper')
					.style.setProperty('--complete-height', completeHeight + 'px');

				if (completeHeight > 0) {
					$('.unleash__way-point')[0].classList.add('unleash__way-point--active');
					$('.unleash__title-3')[0].classList.add('unleash__title-3--active');
				} else {
					$('.unleash__way-point')[0].classList.remove('unleash__way-point--active');
					$('.unleash__title-3')[0].classList.remove('unleash__title-3--active');
				}

				if (completeHeight > 400) {
					$('.unleash__way-point')[1].classList.add('unleash__way-point--active');
					$('.unleash__title-3')[1].classList.add('unleash__title-3--active');
				} else {
					$('.unleash__way-point')[1].classList.remove('unleash__way-point--active');
					$('.unleash__title-3')[1].classList.remove('unleash__title-3--active');
				}

				if (completeHeight > 815) {
					$('.unleash__way-point')[2].classList.add('unleash__way-point--active');
					$('.unleash__title-3')[2].classList.add('unleash__title-3--active');
				} else {
					$('.unleash__way-point')[2].classList.remove('unleash__way-point--active');
					$('.unleash__title-3')[2].classList.remove('unleash__title-3--active');
				}
			}
		}

		completeWayShow();

		window.addEventListener('scroll', completeWayShow);
	}
})

