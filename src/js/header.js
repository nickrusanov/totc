import $ from 'jquery';

$(window).on('load', function () {

	// MENU

	const menuClose = () => {
		$('.nav__inner').removeClass('nav__inner--visible');
		$('.header__nav').removeClass('header__nav--visible');
		$('.header__hamburger').removeClass('header__hamburger--active');
		$('body').removeClass('pinned');
	}

	const menuToggle = () => {
		$('.nav__inner').toggleClass('nav__inner--visible');
		$('.header__nav').toggleClass('header__nav--visible');
		$('.header__hamburger').toggleClass('header__hamburger--active');
		$('body').toggleClass('pinned');
	}

	$('.header__hamburger').click(menuToggle);

	$('.nav__item--submenu').click((event) => {
		$('.subnav').each((i, el) => {
			if (event.target.contains(el)) {
				el.classList.toggle('subnav--active');
			}
		})
		event.target.classList.toggle('nav__item--submenu-active')
	})

	window.addEventListener('orientationchange', menuClose);

	window.addEventListener('resize', () => {
		window.innerWidth < 992
			? $('.nav__inner').addClass('nav__inner--animation')
			: $('.nav__inner').removeClass('nav__inner--animation');
	})

	if (window.innerWidth < 992) {
		$('.nav__inner').addClass('nav__inner--animation');
	}

	// DARKMODE SWITCH

	const darkmodeOn = () => {
		darkmodeClassOn();

		sessionStorage.setItem('theme', 'dark');

		$('.subnav__btn')[2].classList.add('subnav__btn--active');
		$('.subnav__btn')[0].classList.remove('subnav__btn--active');
		$('.subnav__btn')[1].classList.remove('subnav__btn--active');
	}

	const darkmodeClassOn = () => {
		$('.header__darkmode-img').addClass('header__darkmode-img--active');
		$('.header__darkmode-svg').addClass('header__darkmode-svg--active');
		$('body').addClass('darkmode');
	}

	const darkmodeOff = () => {
		darkmodeClassOff();

		sessionStorage.setItem('theme', 'light');

		$('.subnav__btn')[1].classList.add('subnav__btn--active');
		$('.subnav__btn')[0].classList.remove('subnav__btn--active');
		$('.subnav__btn')[2].classList.remove('subnav__btn--active');
	}

	const darkmodeClassOff = () => {
		$('.header__darkmode-img').removeClass('header__darkmode-img--active');
		$('.header__darkmode-svg').removeClass('header__darkmode-svg--active');
		$('body').removeClass('darkmode');
	}

	const systemThemeOn = () => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			darkmodeClassOn();
		} else {
			darkmodeClassOff();
		}

		$('.subnav__btn')[0].classList.add('subnav__btn--active');
		$('.subnav__btn')[1].classList.remove('subnav__btn--active');
		$('.subnav__btn')[2].classList.remove('subnav__btn--active');

		sessionStorage.setItem('theme', 'system');
	}

	$('.header__darkmode-btn').on('click', () => {
		if ($('body').hasClass('darkmode')) {
			darkmodeOff();
		} else {
			darkmodeOn();
		}
	})

	$('.subnav__btn').each((i, el) => {
		el.addEventListener('click', () => {
			switch (i) {
				case 1:
					darkmodeOff();
					break;
				case 2:
					darkmodeOn();
					break;
				default:
					systemThemeOn();
			}

			menuClose();
		})
	})

	const darkmodeInit = () => {
		switch (sessionStorage.getItem('theme')) {
			case 'dark':
				darkmodeOn();
				break;
			case 'light':
				darkmodeOff();
				break;
			default:
				systemThemeOn();
		}
	}

	darkmodeInit();
})
