'use strict';

window.onload = function () {
	if (window.location.search && window.innerWidth >= 1250) {
		setTimeout(() => { document.getElementById('choice__search').scrollIntoView(true); }, 20)
	}
}


// GET PRODUCT ARRAY

let productArray;

const productListGet = (url) => {
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

const productListInit = (response) => {
	productArray = JSON.parse(response);
	productListFilters();
	productFiltersActive();
	sendFormByCategory();
	productContentRoot.render(<ProductContent />);
}

productListGet('./js/courses.json')
	.then(response => productListInit(response));


// CATEGORY MOVE

const filterCategoryMove = () => {
	if (window.innerWidth < 993) {
		document.querySelector('.choice__form').appendChild(document.querySelector('.choice__category'));
		document.querySelector('.choice__form').insertBefore(document.querySelector('.choice__category'), document.querySelector('.choice__filter'));
	} else {
		document.querySelector('.category__wrapper').appendChild(document.querySelector('.choice__category'));
	}
}

filterCategoryMove();

window.addEventListener('resize', filterCategoryMove);


// SHOW CONTENT

const productContentRoot = ReactDOM.createRoot(document.getElementById('choice__content'));

class ProductContent extends React.Component {
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
		let itemToShow = window.innerWidth < 1251 && window.innerWidth > 768 ? 9 : 8;

		const showBtn = this.state.page * itemToShow < productArray.length ?
			<button className="choice__show-btn" type="button" onClick={this.nextPage}>Показать ещё</button> : '';

		return (
			<div className='App'>
				<div className='choice__product-header'>
					<p className="choice__search-qty">
						Найдено: <span>{productArray.length}</span>
					</p>

					<button className='choice__filter-btn' onClick={asideShow} aria-label="Открыть фильтры">
						<svg className='choice__filter-btn-svg' width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M30 4.33333H25.6071C25.0714 1.84167 22.9286 0 20.3571 0C17.7857 0 15.6429 1.84167 15.1071 4.33333H0V6.5H15.1071C15.6429 8.99167 17.7857 10.8333 20.3571 10.8333C22.9286 10.8333 25.0714 8.99167 25.6071 6.5H30V4.33333ZM20.3571 8.66667C18.5357 8.66667 17.1429 7.25833 17.1429 5.41667C17.1429 3.575 18.5357 2.16667 20.3571 2.16667C22.1786 2.16667 23.5714 3.575 23.5714 5.41667C23.5714 7.25833 22.1786 8.66667 20.3571 8.66667ZM0 21.6667H4.39286C4.92857 24.1583 7.07143 26 9.64286 26C12.2143 26 14.3571 24.1583 14.8929 21.6667H30V19.5H14.8929C14.3571 17.0083 12.2143 15.1667 9.64286 15.1667C7.07143 15.1667 4.92857 17.0083 4.39286 19.5H0V21.6667ZM9.64286 17.3333C11.4643 17.3333 12.8571 18.7417 12.8571 20.5833C12.8571 22.425 11.4643 23.8333 9.64286 23.8333C7.82143 23.8333 6.42857 22.425 6.42857 20.5833C6.42857 18.7417 7.82143 17.3333 9.64286 17.3333Z" />
						</svg>
					</button>
				</div>

				<ul className="choice__product-list" id="choice__product-list">
					{productArray.map((el, i) => {
						const productSale = el.sale !== 0 ? <p className="choice__product-sale">-{el.sale}%</p> : '';

						const productExperience = el.experience
							? <p className="choice__product-tag">С опытом</p>
							: <p className="choice__product-tag">С нуля</p>;

						const productPrice = el.price !== 0
							? <p className="choice__product-price">от {Math.round(el.price / el.duration).toLocaleString('ru')} ₽/мес</p>
							: <p className="choice__product-price">Бесплатно</p>;

						const productPriceAll = el.price !== 0
							? <p className="choice__product-price-all">или сразу {el.price.toLocaleString('ru')} ₽</p>
							: <p className="choice__product-price-all">&nbsp;</p>

						let productDuration = 'месяцев';

						if (el.duration % 10 === 1 && el.duration !== 11) {
							productDuration = 'месяц';
						}

						if (el.duration % 10 > 1 && el.duration % 10 < 5 && (el.duration < 11 || el.duration > 14)) {
							productDuration = 'месяца';
						}

						if (i < this.state.page * itemToShow) {
							return (
								<li key={el.id} className="choice__product-item">
									<a className="choice__product-link" href={el.link}>
										<div className="choice__product-img-wrapper">
											<picture>
												<source srcset={el.img.substring(0, el.img.lastIndexOf('.'))+'.webp'} type="image/webp" />
												<img class="choice__product-img" src={el.img} alt="фото" />
											</picture>

											{productSale}
										</div>

										<h2 className="choice__product-title">{el.name}</h2>

										<div className="choice__product-tag-box">
											<p className="choice__product-tag">{el.category}</p>

											<div className="choice__product-tag-flex">
												{productExperience}
												<p className="choice__product-tag">{el.duration} {productDuration}</p>
											</div>
										</div>

										<div className="choice__product-price-box">
											{productPrice}
											{productPriceAll}
										</div>
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


// FILTERS

const searchParams = new URLSearchParams(window.location.search);

const sendFormByCategory = () => {
	document.querySelectorAll('.category__input').forEach(el => {
		el.addEventListener('change', () => {
			if (window.innerWidth >= 992) {
				document.getElementById('choice__form').submit();
			}
		})
	})
}

document.querySelector('.search__send').addEventListener('click', () => {
	if (document.querySelector('.search__input').value === '') {
		document.querySelector('.search__input').setAttribute('disabled', '');
	}
})

const productFiltersActive = () => {
	document.querySelector('.search__input').value = searchParams.get('keyword');

	document.querySelectorAll('.category__input').forEach(el => {
		if ('profession-' + searchParams.get('profession') === el.id)
			el.checked = true;
	})

	document.querySelectorAll('.choice__checkbox').forEach(el => {
		searchParams.getAll(el.name).forEach(param => {
			if (el.name + '-' + param === el.id)
				el.checked = true;
		})
	})
}

const productListFilters = () => {
	if (searchParams.get('keyword')) {
		let newArray = [];

		searchParams.get('keyword').split(' ').forEach(word => {
			newArray = newArray.concat(productArray.filter(el =>
				el.name.toLowerCase().includes(word.toLowerCase()) && !newArray.includes(el)
			));
		})

		productArray = newArray;
	}

	if (searchParams.get('profession') !== 'all' && searchParams.getAll('profession').length !== 0) {
		productArray = productArray.filter(el => el.categoryGroup === searchParams.get('profession'));
	}

	if (searchParams.getAll('price').length !== document.querySelectorAll('.choice__checkbox[name="price"]').length
		&& searchParams.getAll('price').length !== 0) {

		searchParams.getAll('price').forEach(param => {
			productArray = productArray.filter(el => param === 'free' ? el.price === 0 : el.price !== 0);
		})
	}

	if (searchParams.getAll('duration').length !== document.querySelectorAll('.choice__checkbox[name="duration"]').length
		&& searchParams.getAll('duration').length !== 0) {

		let newArray = [];

		searchParams.getAll('duration').forEach(param => {
			switch (param) {
				case '3m':
					newArray = newArray.concat(productArray.filter(el => el.duration < 3));
					break;
				case '3m-6m':
					newArray = newArray.concat(productArray.filter(el => el.duration >= 3 && el.duration <= 6));
					break;
				case '6m-12m':
					newArray = newArray.concat(productArray.filter(el => el.duration > 6 && el.duration <= 12));
					break;
				case '12m':
					newArray = newArray.concat(productArray.filter(el => el.duration > 12));
					break;
			}
		})

		productArray = newArray;
	}

	if (searchParams.getAll('experience').length !== document.querySelectorAll('.choice__checkbox[name="experience"]').length
		&& searchParams.getAll('experience').length !== 0) {

		searchParams.getAll('experience').forEach(param => {
			productArray = productArray.filter(el => param === 'skilled' ? el.experience : !el.experience);
		})
	}
}


// ASIDE MENU

const asideClose = () => {
	document.querySelector('.choice__aside-inner').classList.remove('choice__aside-inner--active');
	document.querySelector('.choice__aside').classList.remove('choice__aside--active');

	if (window.innerWidth <= 480) {
		document.body.classList.remove('pinned');
	}
}

const asideShow = () => {
	document.querySelector('.choice__aside-inner').classList.add('choice__aside-inner--active');
	document.querySelector('.choice__aside').classList.add('choice__aside--active');
	
	if (window.innerWidth <= 480) {
		document.body.classList.add('pinned');
	}
}

document.querySelector('.choice__aside-close').addEventListener('click', asideClose);

document.querySelector('.choice__aside').addEventListener('click', event => {
	if (event.target === document.querySelector('.choice__aside')) {
		asideClose();
	}
})

document.body.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		asideClose();
	}
})