import $ from 'jquery';

$(window).on('load', function () {
	if ($('.login').length !== 0) {
		// LOGIN REGISTRATION TOGGLE

		$('.login__btn').on('click', event => {
			if (!event.target.classList.contains('login__btn--active')) {
				$('.login__btn').each((i, el) => { el.classList.toggle('login__btn--active'); })

				$('.login__btn-box').toggleClass('login__btn-box--active');

				$('.login__block').each((i, el) => { el.classList.toggle('login__block--visible'); })
			}
		})


		// PASSWORD HIDE

		$('.login__password-btn').on('click', event => {
			event.currentTarget.classList.contains('login__password-btn--active')
				? event.currentTarget.previousElementSibling.setAttribute('type', 'password')
				: event.currentTarget.previousElementSibling.setAttribute('type', 'text');

			event.currentTarget.classList.toggle('login__password-btn--active');
		})


		// SELECT OPTION

		$('.select').on('change', event => {
			event.target.classList.add('select--selected');
		})

		$('.select').on('click', event => {
			$('.select-wrapper').each((i, el) => {
				if (el.contains(event.target)) {
					el.classList.toggle('login__select-wrapper--active');
				}
			})
		})

		$('.select').on('blur', event => {
			$('.select-wrapper').each((i, el) => {
				if (el.contains(event.target)) {
					el.classList.remove('login__select-wrapper--active');
				}
			})
		})
	}
})