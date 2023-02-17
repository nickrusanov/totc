import $ from "jquery";

$(function () {
	$('.header__darkmode-btn').on('click', () => {
		$('.header__darkmode-img').toggleClass('header__darkmode-img--active');
		$('.header__darkmode-svg').toggleClass('header__darkmode-svg--active');
		$('body').toggleClass('darkmode');
	})
})