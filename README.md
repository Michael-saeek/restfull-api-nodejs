# Api Restfull - Stock of Items - Backend

### Endpoint   _/auth



### Endpoint   _/api



### Endpoint   _/api/categories_

_Private Endpoint: only be used by users with JWT valid token_


**/api/categories/**  |  **GET**
_Public Endpoint_
- Here is possible to see
    - Categories by pagination 
    - Get all Total categories
    - Populate { }



**/api/categories/:categoryid**  | **GET**
_Public Endpoint_
- Only Populate { }




**/api/categories/  _POST_**   
_This is for insert new category_
_Private Endpoint_



**/api/categories/:id   _PUT_**  
_Private Endpoint_
- Here you can update the category



**/api/categories/:id   _DELETE_** 
_Private Endpoint, only admin_
- Only update state to false 

