import React from 'react';
import { get } from 'lodash';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const FormattedCurrency = ({ number, settings }) =>
	helper.formatCurrency(number, settings);

const ItemPrice = ({ product, settings }) => {
	const priceStyle = {};
	if (themeSettings.list_price_size && themeSettings.list_price_size > 0) {
		priceStyle.fontSize = `${themeSettings.list_price_size}px`;
	}
	if (
		themeSettings.list_price_color &&
		themeSettings.list_price_color.length > 0
	) {
		priceStyle.color = themeSettings.list_price_color;
	}
	const price = get(product, 'prices.list.default');
	const specialPrice = get(product, 'prices.list.special');
	// if (product.stock_status === 'discontinued') {
	// 	return <div className="product-price">{text.discontinued}</div>;
	// }
	// if (product.stock_status === 'out_of_stock') {
	// 	return <div className="product-price">{text.outOfStock}</div>;
	// }
	if (specialPrice) {
		return (
			<div className="product-price">
				<span className="product-new-price">
					<FormattedCurrency settings={settings} number={specialPrice} />
				</span>
				<del className="product-old-price">
					<FormattedCurrency settings={settings} number={price} />
				</del>
			</div>
		);
	}
	return (
		<div className="product-price" style={priceStyle}>
			<FormattedCurrency settings={settings} number={price} />
		</div>
	);
};

export default ItemPrice;
