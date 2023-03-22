import $ from 'jquery';

$(window).on('load', function () {

	// PRICE CHANGE

	if ($('input[name="users"]').length !== 0) {
		$('input[name="users"]').on('change', event => {
			$('input[name="users"]').each((i, el) => {
				if (event.target === el) {
					const price = Number($('p.tariffs__price-text > span')[i].innerHTML.replace(' ', ''));
					const users = Number($('.tariffs__label > strong')[i].innerHTML);

					$('.tariffs__price-item')[i].classList.add('tariffs__price-item--active');
					$('#price-month')[0].innerHTML = Math.round(price / users / 12) + '₽';
				} else {
					$('.tariffs__price-item')[i].classList.remove('tariffs__price-item--active');
				}
			})
		})
	}


	// FAQ ACCORDION

	if ($('.faq__item-btn').length !== 0) {
		$('.faq__item-btn').on('click', event => {
			event.currentTarget.lastElementChild.classList.toggle('faq__item-btn-svg--active');

			$('.faq__item-text').each((i, el) => {
				if (event.currentTarget.parentElement.contains(el)) {
					event.currentTarget.parentElement.classList.contains('faq__item--active')
						? el.style.maxHeight = 0
						: el.style.maxHeight = el.scrollHeight + 'px';

					event.currentTarget.parentElement.classList.toggle('faq__item--active');
				}
			})
		})
	}


	// LINKS

	if ($('.tariffs__link').length !== 0) {
		$('.tariffs__link').on('click', event => {
			$('html').animate({
				scrollTop: $(`${event.currentTarget.getAttribute('href')}`).offset().top - 40
			}, 500);
		})
	}
})