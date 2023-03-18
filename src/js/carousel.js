import $ from 'jquery';
import 'slick-carousel';

$(window).on('load', function () {
	if ($('.brand-slider__list').length !== 0) {
		$('.brand-slider__list').slick({
			dots: false,
			arrows: false,
			infinite: true,
			speed: 4000,
			autoplaySpeed: 0,
			cssEase: 'linear',
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			vertical: true
		});
	}
})

$(window).on('load', function () {
	if ($('.history__list').length !== 0) {
		$('.history__list').slick({
			dots: false,
			arrows: true,
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<button type="button" class="history__slick-prev"></button>',
			nextArrow: '<button type="button" class="history__slick-next"></button>',
		});
	}
})