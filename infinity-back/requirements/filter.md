## Filter Products

- V - Should filter Products at **Get** route (/products?price=true&gt=any_number). Product_value can be barcode, name, quantity OR price, and gt, lt and eq represents greater than, less t han and equal.

- V - Should return status 200 on success and the products filtered.

- V - Should return status 200 and an empty list if no products satisfy the filtering .

- V - Should return status 500 on server error.

