# Demo for JWT with Angular and Node

To run the project start mongo on your machine, npm start the backend and
ng serve the frontend.

Register a new user admin and one guest

Login with one of the new user created and your ready to go



## For the client

The client doesn't implement an HTTP Interceptor but it's recommended.

https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

This is a better implementation when passing the bearer token.

When login we retrieve the token and the role of the user.  The role in the example is only 1 single string but in a real scenario is probably an array returned.  Why the role is returned in the client is to implement some Angular guard in our route for specic role access.

## For the server (backend)

A middleware should be implemented at the route level to validate which
role(s) have access to a specific route.

The password in the example are not encrypted but in production it should
be implement with bcrypt npm module.

## General note

This example show the concept, better error handling and form validation needs to be implemented in a real world scenario.  The goal of this example
was to illustrate JWT implementation with express and how to use it with Angular