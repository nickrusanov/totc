import $ from 'jquery'

$(function () {

	// HEADER 
	
	const headerChange = () => {
		if (window.scrollY > 200) {
			$('.header').addClass('header--fixed');
			$('.seller').addClass('seller--padding');
		} else {
			$('.header').removeClass('header--fixed');
			$('.seller').removeClass('seller--padding');
		}

		window.scrollY + 200 > $('#about').offset().top
			? $('.header').addClass('header--animation')
			: $('.header').removeClass('header--animation');
	}
	
	$('.side-nav__link').each(function () {
		this.addEventListener('click', function () {
			window.removeEventListener('scroll', headerChange);

			$('html').animate({
				scrollTop: $(`${this.getAttribute('href')}`).offset().top - 140
			}, 500)

			setTimeout(() => {
				window.addEventListener('scroll', headerChange);

				if (this.getAttribute('href') === '#top') {
					$('.header').css('transition', 'none');
					$('.header').removeClass('header--animation');
					$('.header').removeClass('header--fixed');
					$('.seller').removeClass('seller--padding');
					setTimeout(() => {
						$('.header').removeAttr('style');
					}, 100)
				}
			}, 500)
		})
	})

	window.addEventListener('scroll', headerChange);

	headerChange();


	// SIDE-NAV POINT

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


	// SWIPE BOTTOM

	$('.seller__shift-btn').click(function () {
		$('html').animate({
			scrollTop: $('#about').offset().top - 40
		}, 500)
	})
})