# Stock Application

## Install

To install the application open a terminal on the root  and type:

    docker-compose-up -d

The Application is going to run on http://localhost:3000.


## API 
The backend is going to run on http://localhost:8080/product .

### Create Product
      - POST: http://localhost:8080/product
- body: 

      {
        name: "any_name",
        quantity: "90",
        barcode: "31348319886132",
        price: "99",
      }

- response:

      status: 201
      {
        id: "any_id",
        name: "any_name",
        quantity: "90",
        barcode: "31348319886132",
        price: "99",
      }

---
### Update Product
      - PUT: http://localhost:8080/product/:product_id
- body: 
 
      {
        name: "any_name",
        quantity: "90",
        barcode: "31348319886132",
        price: "99",
      }

- response:

      status: 200
      {
        id: "any_id",
        name: "any_name",
        quantity: "90",
        barcode: "31348319886132",
        price: "99",
      }
---
### GetAll
      - GET: http://localhost:8080/product

- response:
  
      status: 200
      [{
        id: "any_id",
        name: "any_name",
        quantity: "90",
        barcode: "31348319886132",
        price: "99",
      },
      {
        id: "other_id",
        name: "other_name",
        quantity: "100",
        barcode: "549841323",
        price: "3",
      }]
---
### GetOne
      - GET: http://localhost:8080/product/product_id

- response:
  
      status: 200
      {
        id: "any_id",
        name: "any_name",
        quantity: "90",
        barcode: "31348319886132",
        price: "99",
      }
---

### Filter
    - GET: http://localhost:8080/product&{queryParams}

- queryParams:
  - lt - less than
  - gt - gt than
  - eq - equal
  - name 
  - quantity 
  - price

- response:
  
      status: 200
      [{
        id: "any_id",
        name: "any_name",
        quantity: "90",
        barcode: "31348319886132",
        price: "99",
      },
      {
        id: "other_id",
        name: "other_name",
        quantity: "100",
        barcode: "549841323",
        price: "3",
      }]
---

### Delete
    - DELETE: http://localhost:8080/product/product_id

- response:
  
      status: 204
