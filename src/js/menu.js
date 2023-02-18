import $ from 'jquery';

$(window).on('load', function () {
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
})