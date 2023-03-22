import $ from 'jquery';

$(window).on('load', function () {
	const listGet = (url) => {
		return new Promise(function (resolve, refect) {
			let request = new XMLHttpRequest();

			request.open('GET', url, true);

			request.onload = function () {
				if (this.status == 200) {
					resolve(this.response);
				}
			};

			request.send();
		})
	}

	
	// COURSES LIST

	if ($('body').hasClass('page-courses')) {
		let productList;

		listGet('./js/courses.json')
			.then(response => {
				productList = JSON.parse(response);
				coursesInit();
			});

		const coursesInit = () => {
			$('#experience-newbie').html(`${coursesQty('experience', 'false')}`);
			$('#experience-skilled').html(`${coursesQty('experience', 'true')}`);
			$('#price-free').html(`${coursesQty('price', '0')}`);
			$('#courses-all').html(`${coursesQty('link', '#')}`);
		}

		const coursesQty = (key, value) => {
			let count = productList.filter(el => String(el[key]) === value).length;
			let text = ' курсов';

			if (count % 10 === 1 && count % 100 !== 11) {
				text = ' курс';
			}

			if (count % 10 > 1 && count % 10 < 5 && (count % 100 < 11 || count % 100 > 14)) {
				text = ' курса';
			}

			return count + text;
		}
	}


	// BLOG LIST

	if ($('body').hasClass('page-blog')) {
		let articalList;

		listGet('./js/articals.json')
			.then(response => articalList = JSON.parse(response));
	}
})