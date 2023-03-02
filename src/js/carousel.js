import $ from 'jquery';
import 'slick-carousel';

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