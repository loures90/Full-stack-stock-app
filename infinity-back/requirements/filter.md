## Filter Products

- x - Should filter Products at **Get** route (/products?product_value=any_value&gt=any_number). Product_value can be barcode, name, quantity OR price, and gt, lt and eq represents greater than, less than and equal.

- x - Should return status 200 on success and the products filtered.

- x - Should return status 200 and an empty list if no products satisfy the filtering .

- x - Should return status 500 on server error.

