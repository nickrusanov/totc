import $ from 'jquery';

$(window).on('load', function () {
	if ($('.sale').length !== 0) {
		// COUNTDOWN

		let deadline;
		let countdownInterval;

		function initCountdown() {
			const date = new Date();
			deadline = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

			setCountdown(deadline - date);

			countdownInterval = setInterval(changeCountdown, 1000);
		}

		function setCountdown(diff) {
			const h = Math.floor(diff / 1000 / 60 / 60);
			const m = Math.floor(diff / 1000 / 60 - h * 60);
			const s = Math.floor(diff / 1000 - m * 60 - h * 60 * 60);
			$('.sale__text--countdown')
				.html((h > 9 ? h : '0' + h) + ":" + (m > 9 ? m : '0' + m) + ":" + (s > 9 ? s : '0' + s));
		}

		function changeCountdown() {
			const diff = deadline - new Date();

			if (diff < 0) {
				closeCountdown();
			} else {
				setCountdown(diff);
			}
		}

		function closeCountdown() {
			clearInterval(countdownInterval);
			$('.sale').css('display', 'none');
		}

		initCountdown();


		// CLOSE

		$('.sale').on('click', event => {
			if ($('.sale__close-btn')[0].contains(event.target)) {
				event.preventDefault();
				closeCountdown();
			}
		})
	}
})