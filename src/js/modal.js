import $ from 'jquery';

$(window).on('load', function () {
	const openModal = (link) => {
		$('.modal').addClass('modal--visible');
		$(link).addClass('modal__content--visible');

		if (window.innerWidth < 768 || window.innerHeight < 650) {
			$('body').addClass('pinned');
		}
	}

	const closeModal = () => {
		$('.modal').removeClass('modal--visible');
		$(window.location.hash).removeClass('modal__content--visible');
		$('body').removeClass('pinned');
		history.pushState("", document.title, window.location.pathname);
	}

	$('.modal-btn').on('click', event => {
		openModal(event.currentTarget.getAttribute('href'));
	})

	$('.modal__content').each((i, el) => {
		if ('#' + el.id === window.location.hash) {
			openModal('#' + el.id);
		}
	})

	$('.modal').on('click', event => {
		if (event.target === $('.modal')[0]) {
			closeModal();
		}
	})

	$('.modal__close').on('click', () => {
		closeModal();
	})

	$('body').on('keydown', event => {
		if (event.key === 'Escape') {
			closeModal();
		}
	})
})