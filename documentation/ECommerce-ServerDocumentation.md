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
>>**Content** :{**message** : 'all content cannot be empty'} (*if 1 or more  content empty*)
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
>>**Content** :{**message** : 'all content cannot be empty'} (*if 1 or more  content empty*)
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