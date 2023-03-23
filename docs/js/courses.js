'use strict';

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
	productContentRoot.render(<ProductContent />);
}

productListGet('./js/courses.json')
	.then(response => productListInit(response));


// SHOW CONTENT

const productContentRoot = ReactDOM.createRoot(document.getElementById('free-start__course-list'));

class ProductContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hidden: true,
		}
	}

	render() {
		let itemToShow = window.innerWidth < 1251 && window.innerWidth > 768 ? 3 : 4;

		return (
			<div className='App'>
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

						const productItem = this.state.hidden ? 'choice__product-item hidden' : 'choice__product-item';
						
						this.setState(() => {return { hidden: false }})

						if (i < itemToShow) {
							return (
								<li key={el.id} className={productItem}>
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
			</div>
		)
	}
}

const productListFilters = () => {
	productArray = productArray.filter(el => el.price === 0);
}