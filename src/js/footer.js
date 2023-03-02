import $ from 'jquery';

$(window).on('load', function () {
	let footerBoxCurrent = -1;

	$('.footer__title-5').each((i, el) => {
		el.addEventListener('click', () => {
			if ($('.footer__list')[i].classList.contains('footer__list--active')) {
				$('.footer__list')[i].classList.toggle('footer__list--active');
				el.classList.toggle('footer__title-5--active');
				footerBoxCurrent = -1;
			} else {
				$('.footer__list')[i].classList.toggle('footer__list--active');
				el.classList.toggle('footer__title-5--active');

				if (footerBoxCurrent !== -1) {
					$('.footer__list')[footerBoxCurrent].classList.toggle('footer__list--active');
					$('.footer__title-5')[footerBoxCurrent].classList.toggle('footer__title-5--active');
				}

				footerBoxCurrent = i
			}
		})
	})
})