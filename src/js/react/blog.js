// 'use strict';

window.addEventListener('load', function () {
	if (window.location.search && window.innerWidth >= 1250) {
		setTimeout(() => { document.getElementById('blog__search').scrollIntoView(true); }, 20)
	}
})

// FILTERS

const searchParams = new URLSearchParams(window.location.search);

const sendFormByCategory = () => {
	document.querySelectorAll('.category__input').forEach(el => {
		el.addEventListener('change', () => {
			document.getElementById('blog__form').submit();
		})
	})
}

const itemFiltersActive = () => {
	document.querySelector('.search__input').value = searchParams.get('keyword');

	document.querySelectorAll('.category__input').forEach(el => {
		if ('rubric-' + searchParams.get('rubric') === el.id)
			el.checked = true;
	})
}

document.querySelector('.search__send').addEventListener('click', () => {
	if (document.querySelector('.search__input').value === '') {
		document.querySelector('.search__input').setAttribute('disabled', '');
	}
})

const itemListFilters = () => {
	if (searchParams.get('keyword')) {
		let newArray = [];

		searchParams.get('keyword').split(' ').forEach(word => {
			newArray = newArray.concat(articalsArray.filter(el =>
				el.name.toLowerCase().includes(word.toLowerCase()) && !newArray.includes(el)
			));
		})

		articalsArray = newArray;
	}

	if (searchParams.get('rubric') !== 'all' && searchParams.getAll('rubric').length !== 0) {
		articalsArray = articalsArray.filter(el => el.categoryGroup === searchParams.get('rubric'));
	}
}

itemFiltersActive();


// GET ARTICALS ARRAY

let articalsArray;

const itemListGet = (url) => {
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

const itemListInit = (response) => {
	articalsArray = JSON.parse(response);
	itemListFilters();
	sendFormByCategory();
	itemContentRoot.render(<ArticalsContent />);
}

itemListGet('./js/articals.json')
	.then(response => itemListInit(response));


// SHOW CONTENT

const itemContentRoot = ReactDOM.createRoot(document.getElementById('blog__content'));

class ArticalsContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
		};

		this.nextPage = this.nextPage.bind(this);
	}

	nextPage() {
		this.setState(state => ({ page: state.page + 1 }));
	}

	render() {
		const showBtn = this.state.page * 6 < articalsArray.length ?
			<button className="blog__show-btn" type="button" onClick={this.nextPage}>Показать ещё</button> : '';

		return (
			<div className='App'>
				<div className='blog__item-header'>
					<p className="blog__search-qty">
						Найдено: <span>{articalsArray.length}</span>
					</p>
				</div>

				<ul class="blog__list" id="blog__list">
					{articalsArray.map((el, i) => {
						if (i < 6 * this.state.page) {
							return (
								<li key={el.id} class="blog__item">
									<a class="blog__item-link" href={el.link}>
										<artical>
											<div class="blog__item-img-wrapper">
												<picture>
													<source srcset={el.img.substring(0, el.img.lastIndexOf('.')) + '.webp'} type="image/webp" />
													<img class="blog__item-img" src={el.img} alt="превью статьи" />
												</picture>

												<p class="blog__item-category">{el.category}</p>
												<time class="blog__item-date">{el.date}</time>
											</div>

											<h2 class="blog__item-title">{el.name}</h2>
										</artical>
									</a>
								</li>
							)
						}
					})}
				</ul>

				{showBtn}
			</div>
		)
	}
}