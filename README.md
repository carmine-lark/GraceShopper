# GraceShopper
A Shopping App by a team of glorified finches

Abu
Matthew Howe
Mahar Teli
Conrad Batraville

# Outline

### Database
1. User
    * Name
    * Email
    * Password
    * Address
    * Google id
2. Product
    * Name
    * Price
    * Description
    * Image
3. Cart
    * User id
    * Products
4. Associations
    * User.hasMany(Products)
    * Cart.hasMany(Products)
    * Product.hasMany(Cart)

### Front End Design
1. Nav bar
    * Home button
    * Sign in button
    * Cart button
2. Main
    * Store page
    * Product list
