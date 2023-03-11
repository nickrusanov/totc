import $ from 'jquery';

$(window).on('load', function () {
	if ($('.services').length !== 0) {
		const servicesMove = () => {
			if (window.innerWidth < 1200) {
				$('.moveable').each((i, el) => {
					$('.services__list')[i < 2 ? 0 : 1].append(el);
				})

				$('.services__list')[2].style.display = 'none';
			} else {
				$('.moveable').each((i, el) => {
					$('.services__list')[2].append(el);
				})

				$('.services__list')[2].style.display = '';
			}
		}

		window.addEventListener('resize', servicesMove)

		servicesMove();
	}
})