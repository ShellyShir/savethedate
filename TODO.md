0. install nodejs 17 v
1. Nodejs intro youtube
2. Nodejs + mongodb.
3. Mongodb  mongo 127.0.0.1:27017




5.7

Read
1. Database ORM
take care of the object and convert to the database - help mapping 
2. Read JWT token
with JWT(json web token) we don't store anything in our server, we store only the jwt that represent the user email and password (user)
server create jwt and sent it to client and now the clinet sent it back to server with the jwt and the server verify it
only client save the token - user can log in once for different server. becuse the token is in the client side different server can recoginze the tikon if they have the same secrete key.

Tasks
1. Routes to user.routes.js
a. Login
b. Registry
c. Forget Password -> Input: Email.

   Will send a link/code to the to the email 
   c.1. forget_password_verify. Input: code, new_password

   To Read: node-js forget password flow. (No use pacakge)

nodejs middlewares/ auth middleware/ jwt middleware
d. Read about .
this middleware will add to each request the user