**E-Commerce Server Documentation API**

**Register into Server**

>**URL** : /register

>**Method** : POST

>**Data** (*Required*) : {
>>
>>email : test@email.com,
>>
>>password : 12345
>
>}

>**Success Response** :
>
>>**Code** : 201
>>
>>**Content** : { **message :** 'Register Success'}
>>

>**Error Response** :
>
>> **Code** : 400
>> 
>> **Content** : { **message** : 'Email is Already in Use'} (*If email not unique*)}
>
> OR
>> 
>>**Code** : 400
>> 
>> **Content** : { **message** : 'Email must be email format'} (*If email not in email format*)
>
> OR
>>
>>**Code** : 400
>> 
>> **Content** : { **message** : 'Password must be 4-15 length'} (*If password not in range 7-15*)

>**Sample Call** : { 
>>
>>axios({
>>
>>> **url** : 'http://localhost:3000/register'
>>>
>>>**method** : 'POST'
>>>
>>>**data** :{
>>>
>>>>email : 'test@email.com',
>>>>
>>>>password : '12345'
>>>
>>>}
>>
>>})
>
>}

**Login into Server**

>**URL** : /login
> 
>**Method** : POST
>
>**Data** (*Required*) : {
>>
>>email : test@email.com,
>>
>>password : 12345
>
>}

>**Success Response** :
>
>>**Code** : 200
>>
>>**Content** : {
>
>>>**access_token** : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 *(example)*,
>>>
>>>**id** : 1 *(from test@email.com in database)*
>>> 
>>>**email** : test@email.com *(same with request email)*
>
>>}
>>

>**Error Response** :
>
>> **Code** : 400
>> 
>> **Content** : { **message** : 'Invalid Email / Password'} (*if email / password is wrong*)

>**Sample Call** : { 
> 
>>axios({
>>
>>>**url** : 'http://localhost:3000/login'
>>>
>>>**method** : 'POST'
>>>
>>>**data** :{
>>>
>>>>email : 'test@email.com',
>>>>
>>>>password : '12345'
>>>
>>}
>>
>>})
>
>}

**Create Product**

>**URL** : /products
>
>**Method** : POST
>
>**Data** (*Required*) : {
>
>>name : Black T-Shirt 
>>
>>image_url : http://blackcloth.jph (*example*)
>>
>>price : 100000
>>
>>stock : 3
>
>}
>
>**Headers** : { access_token :  ''eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>
>**Success Response** :
>
>>**Code** : 201
>>
>>**Content** : { **message** : 'Product Has been Created'}

>**Error Response** :
>
>>**Code** : 400
>>
>>**Content** :{**message** : 'all content cannot be empty , img_url must be url , price / stock cannot less than 0 and numbers only'} (*if all  content empty*)
>
>OR
>>
>>**Code** : 400
>>
>>**Content** :{**message** : 'price / stock cannot less than 0 and numbers only'} (*if price or stock < 0*)
>
>OR
>>
>>**Code** : 400
>>
>>**Content** :{**message** : 'img_url must be url'} (*if image_url not url*)
>
>OR
>>
>>**Code** : 400
>>
>>**Content** :{**message** : 'all content cannot be empty , image_url must be url , price / stock cannot less than 0 and numbers only'} (*if 1 or more content empty and image_url not url and price or stock < 0*)
>
>OR
>>
>>**Code** : 401
>>
>>**Content** :{**message** : 'Not Authenticate'} (*if no access_token or invalid access_token*)
>
>OR
>>
>>**Code** : 401
>>
>>**Content** :{**message** : 'Not Authorized'} (*if user is not admin*)

>**Sample Call** : {

>>axios({
>>
>>>**url** : 'http://localhost:3000/products'
>>>
>>>**method** : 'POST'
>>>
>>>**data** :{
>>>
>>>>name : Black T-Shirt
>>>>
>>>>image_url : http://blackcloth.jph (*example*)
>>>>
>>>>price : 100000
>>>>
>>>>stock : 3
>>>
>>>}
>>>
>>>**headers** : { access_token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>>
>>})
>
>}

**Update Product**

>**URL** : /products/:id
>
>**Method** : PUT
> 
>**Data** (*Required*) : {
>
>>name : Black T-Shirt 
>>
>>image_url : http://blackcloth.jph (*example*)
>>
>>price : 100000
>>
>>stock : 3
>
>}
>
>**Headers** : { access_token :  ''eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>
>**Success Response** :
>
>>Code : 200
>>
>>Content : {**message** : 'Data has been Updated'}
>
>**Error Response** :
>
>>**Code** : 400
>>
>>**Content** :{**message** : 'all content cannot be empty , img_url must be url , price / stock cannot less than 0 and numbers only'} (*if all content empty*)
>
>OR
>>
>>**Code** : 400
>>
>>**Content** :{**message** : 'price / stock cannot less than 0 and numbers only'} (*if price or stock < 0*)
>
>OR
>>
>>**Code** : 400
>>
>>**Content** :{**message** : 'img_url must be url'} (*if image_url not url*)
>
>OR
>>
>>**Code** : 400
>>
>>**Content** :{**message** : 'all content cannot be empty , image_url must be url and price / stock cannot less than 0 and numbers only'} (*if 1 or more content empty and image_url not url and price or stock < 0*)
>
>OR
>>
>>**Code** : 401
>>
>>**Content** :{**message** : 'Not Authenticate'} (*if no access_token or invalid access_token*)
>
>OR
>>
>>**Code** : 401
>>
>>**Content** :{**message** : 'Not Authorized'} (*if user is not admin*)
>
>OR
>>
>>**Code** : 404
>>
>>**Content** :{**message** : 'Data Not Found'} (*if no data to update*)

>**Sample Call** : { 
> 
>>axios({
>>
>>>**url** : 'http://localhost:3000/products/:id'
>>>
>>>**method** : 'PUT'
>>>
>>>**data** :{
>>>
>>>>name : Black T-Shirt
>>>>
>>>>image_url : http://blackcloth.jph (*example*)
>>>>
>>>>price : 100000
>>>>
>>>>stock : 5
>>>
>>}
>>
>>>**headers** : { access_token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>>
>>})
>
>}


**Delete Product**

>**URL** : /products/:id
>
>**Method** : DELETE
>
>**Headers** : { access_token :  ''eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>
>**Success Response**
>>
>>**Code** : 200
>>
>>**Content** :  {**message** : 'Delete Success'}
>
>**Error Response**
>
>>**Code** : 404
>>
>>**Content** : {**message** : 'Data not Found'} (*if data product not found*)
>
>OR
>
>>**Code** : 401
>>
>>**Content** : {**message** : 'Not Authenticate'} (*if there is no access_token *)
>
>OR
>>
>>**Code** : 401
>>
>>**Content** :{**message** : 'Not Authorized'} (*if user is not admin*)

**Sample Call** : { 
> 
>axios({
>>
>>**url** : 'http://localhost:3000/products/:id'
>>
>>**method** : 'DELETE'
>>
>>**headers** : { access_token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>>
>>})
>
}

**Get Product Cart**
>**URL** : /carts
>
>**Method** : GET
>
>**Headers** : { access_token :  ''eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>
>**Success Response** :
>
>>Code : 200
>>
>>Content : {[
>>
    {
        "id": 9,
        "CartId": 1,
        "ProductId": 2,
        "amount": 2,
        "Product": {
            "id": 2,
            "name": "Light Grey Sofa",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTVz6nwpjdd_p8dmhSJhjkQgzH6Gqv5Mm5SYuAKIxQE_mf-GMMfdzweZHlqA6HtglXnp32Sa74&usqp=CAc.JPG",
            "price": 2000000,
            "stock": 3,
            "createdAt": "2020-09-24T01:44:34.276Z",
            "updatedAt": "2020-09-24T01:44:34.276Z"
        }
    },
    {
        "id": 10,
        "CartId": 1,
        "ProductId": 3,
        "amount": 2,
        "Product": {
            "id": 3,
            "name": "Black Chair",
            "image_url": "https://www.ikea.com/us/en/images/products/martin-chair-black-black__0729761_PE737128_S5.JPG",
            "price": 500000,
            "stock": 9,
            "createdAt": "2020-09-24T01:44:34.276Z",
            "updatedAt": "2020-09-24T01:44:34.276Z"
        }
    }

]}

> **Sample Call** :
> 
>>axios({
>>
>>**url** : 'http://localhost:3000/carts'
>>
>>**method** : 'GET'
>>
>>**headers** : { access_token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>>
>>})
>
>}
>

**Add Cart**
>**URL** : /carts/:prodId *(Product Id)*
>
>**Method** : POST
>
>**Headers** : { access_token :  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>
>**Data** : {amount: 2}
>
>**Success Response** :
>
>>Code : 200
>>
>>Content: {message: 'Product has been added into your Cart List!'}
>
>**Error Response** :
>
>>Code : 400
>>
>>Content: {message: 'Sorry, Quota Not Enough'}
>
> **Sample Call** :
> 
>axios({
>>
>>**url** : 'http://localhost:3000/carts/1'
>>
>>**method** : 'POST'
>>
>>**headers** : { access_token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>>
>>**data** : {
>>
>>>amount: 5
>>
>>}
>
>})
>
>}

**Update Cart**
>**URL** : /carts/:prodCartId *(Product Cart Id)*
>
>**Method** : PUT
>
>**Headers** : { access_token :  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>
>**Data** : {amount: 4}
>
>**Success Response** :
>
>>Code : 200
>>
>>Content: {message: 'Your Cart has been Updated'}
>
>**Error Response** :
>
>>Code : 400
>>
>>Content: {message: 'Sorry, Quota Not Enough'}
>
>**Sample Call** :
> 
>axios({
>>
>>**url** : 'http://localhost:3000/carts/1'
>>
>>**method** : 'PUT'
>>
>>**headers** : { access_token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>>
>>**data** : {
>>
>>>amount: 4
>>
>>}
>
>})
>
>}

**Delete Cart by Product**
>**URL** : /carts/:prodCartId *(Product Cart Id)*
>
>**Method** : DELETE
>
>**Headers** : { access_token :  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>
>**Success Response** :
>
>>Code : 200
>>
>>Content: {message: 'Your Cart has been deleted'}
>
> **Sample Call** :
> 
>axios({
>>
>>**url** : 'http://localhost:3000/carts/1'
>>
>>**method** : 'DELETE'
>>
>>**headers** : { access_token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>>
>
>})
>
>}

**Delete All Cart**
>**URL** : /carts
>
>**Method** : DELETE
>
>**Headers** : { access_token :  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>
>**Success Response** :
>
>>Code : 200
>>
>>Content: {message: 'Your Cart has been deleted'}
>
> **Sample Call** :
> 
>axios({
>>
>>**url** : 'http://localhost:3000/carts/1'
>>
>>**method** : 'DELETE'
>>
>>**headers** : { access_token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'} (*example*)
>>
>
>})
>
>}





