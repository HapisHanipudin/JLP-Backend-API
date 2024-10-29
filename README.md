# JLP
# 📁 Folder: Auth 


## End-point: register
### Method: POST
>```
>/auth/register
>```
### Body (**raw**)

```json
{
    "name": "Michael Jackson",
    "username": "korbanpdidy",
    "email": "michaeljackson@gmail.com",
    "password": "pidinganteng",
    "confirmpassword": "pidinganteng"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: login
On the App use "User-agent : jlp-app" in headers
### Method: POST
>```
>/auth/login
>```
### Headers

|Content-Type|Value|
|---|---|
|User-Agent|jlp-app|


### Body (**raw**)

```json
{
    "username": "korbanpdidy",
    "password": "pidinganteng"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: user 
### Method: GET
>```
>/auth/user
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|<accesToken>|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Refresh Token
On the App use "User-agent : jlp-app" in headers

and input refresh_token= in the query
### Method: GET
>```
>/auth/refresh
>```
### Body (**raw**)

```json

```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Folder: Vendor 


## End-point: All Vendor
### Method: GET
>```
>/vendor
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Vendor By Category
| Category Name | Slug |
| --- | --- |
| Kuliner | kuliner |
| Destinasi Populer | destinasi-populer |
| Wisata Pantai | wisata-pantai |
| Wisata Alam | wisata-alam |
| Pusat Belanja | pusat-belanja |
| Penginapan | penginapan |
| Sewa Transportasi | sewa-transportasi |
| Event & Festival | event-festival |
### Method: GET
>```
>/vendor/category/:slug
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Vendor Detail
Use the slug from the other apis
### Method: GET
>```
>/vendor/:vendor-slug
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Vendor
To create the vendor**. (You need to be logged in**)
### Method: POST
>```
>/vendor
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|name|Toko Bakpia Enak|text|
|categoryId|kuliner|text|
|description|toko jual bakpia enak banget pokoknya|text|
|gmapsUrl|gatau blm punya|text|
|openingHours|07.00|text|
|closingHours|19.00|text|
|address|di mana mana hatiku senang|text|
|icon|postman-cloud:///1ef90f58-84e8-4810-b3ec-7051239f2790|file|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|<accessToken>|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Product
To create Product
### Method: POST
>```
>/product
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|name|cicak bakar|text|
|price|10000|text|
|description|enak banget|text|
|image|postman-cloud:///1ef90f5a-5416-4b90-91b0-9c3669be33aa|file|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YzcxZDczNi05OGZjLTQwMmItYmQ3Zi0yYzJkNGNhZmVlMTciLCJpYXQiOjE3MzAwMTg4MTUsImV4cCI6MTczMDEwNTIxNX0.9LkISYzxLEnZyL_6MDmOX_vRplm6sz2dsJ2w32oy5bs|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Product By Id
### Method: GET
>```
>/product/:productId
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM1MDQzMS0yNjQ4LTQ4YTgtOWM5Ni1mMjVkMjU3ZTJmNzAiLCJpYXQiOjE3Mjk2NTk0MzEsImV4cCI6MTcyOTc0NTgzMX0.LLVABEb0i4tay1ne3k1ZjanPYewUfODLLoC8DVZ4O2k|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Review
### Method: POST
>```
>/review/:vendorId
>```
### Body (**raw**)

```json
{
    "rating": 5,
    "comment": "enak bangett"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YzcxZDczNi05OGZjLTQwMmItYmQ3Zi0yYzJkNGNhZmVlMTciLCJpYXQiOjE3Mjk5NDkzMzMsImV4cCI6MTczMDAzNTczM30.QxJNi4Kg6Yl6wfta-N9rnBSjf57sKQZPWhkynM7pvkY|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: review
### Method: GET
>```
>/review/:vendorId
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM1MDQzMS0yNjQ4LTQ4YTgtOWM5Ni1mMjVkMjU3ZTJmNzAiLCJpYXQiOjE3Mjk2Njc2MDYsImV4cCI6MTcyOTc1NDAwNn0.6BkDd20baJAQxDBLIbl8lRJ9aKp1i8kOurzuw_g_FtY|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Cart
Input the products array and input quantity and productId in the objects
### Method: POST
>```
>/cart
>```
### Body (**raw**)

```json
{
    "products": [
        {
            "quantity": 1,
            "productId": "12bdc24b-f69d-48fd-9dc7-4aa697bb940a"
        },
        {
            "quantity": 1,
            "productId": "20af0cc0-f3c3-4bcc-a503-d49df99fea88"
        },
        {
            "quantity": 1,
            "productId": "ef0dec7b-1352-4196-b6d7-28b3c9a3c3dd"
        }   
    ]
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YzcxZDczNi05OGZjLTQwMmItYmQ3Zi0yYzJkNGNhZmVlMTciLCJpYXQiOjE3MzAwMjA3MjMsImV4cCI6MTczMDEwNzEyM30.gWqrZyqeeJaIVJ90k25T-dHHCvHJ8I3L2zq7xipm69M|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Order
### Method: POST
>```
>/order
>```
### Body (**raw**)

```json
{
    "cartIds": [
        "eb9a4713-76be-41ab-bd3a-8651d212c92b",
        "1dc02b87-e4bb-416c-afca-fadbc8c9d6a2",
        "f6bc6bce-98c3-4678-a3e3-6366b9ea75da"
    ]
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YzcxZDczNi05OGZjLTQwMmItYmQ3Zi0yYzJkNGNhZmVlMTciLCJpYXQiOjE3MzAwMjA3MjMsImV4cCI6MTczMDEwNzEyM30.gWqrZyqeeJaIVJ90k25T-dHHCvHJ8I3L2zq7xipm69M|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Folder: News 


## End-point: Create
### Method: POST
>```
>/news
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|title|ini teksnya|text|
|content|ini kontennnn|text|
|image|postman-cloud:///1ef90f5a-5416-4b90-91b0-9c3669be33aa|file|
|video|postman-cloud:///1ef90f5a-4747-4ea0-a68b-971603862132|file|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYjU5MDFhYS05ZWNkLTRjY2EtOGZjNS00MGEyZDQ5NTJjNTAiLCJpYXQiOjE3Mjk1Nzk3MjEsImV4cCI6MTcyOTU4MDMyMX0.R5aSa4QheHbzlzsxS52CtQkbUWPxPnmnjLY3X22y-Yk|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get news
### Method: GET
>```
>/news/:Slug
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Donation
### Method: POST
>```
>/api/payment/create-transaction
>```
### Body (**raw**)

```json
{
    "id": "awdawdadadaw",
    "productName": "auah",
    "price" : 100000,
    "quantity": 1
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
