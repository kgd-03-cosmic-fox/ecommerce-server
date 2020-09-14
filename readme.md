ecommerce-server

Spesifikasi:
Create Product
Read Product
Update Product
Delete Product


Register (via seeding, do not need a feature)
Login MUST be email+password, role: 'admin' via seeding

table minimum:

Products:
name -> string
image_url -> string
price -> decimal
stock -> integer

Users:
email -> string
password -> string
role -> string/integer? maybe integer is easier to work with and easier to expand later

Roles:
id -> integer -> nanti jadi FK di Users