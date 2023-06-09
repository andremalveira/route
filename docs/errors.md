# Explanations and solutions for errors that may occur
## Table of contents
- [Param 'paramKeys' is null | undefined](#param-paramkeys-is-null--undefined)
- [Parameters object is empty](#parameters-object-is-empty)
- [Key [keyName] not found in path [pathName]](#key-keyname-not-found-in-path-pathname)
- [No parameter key was found in the specified path](#no-parameter-key-was-found-in-the-specified-path-path)

## Route erros

### Param 'paramKeys' is null | undefined

> `Explanation`: The `paramKeys` parameter passed in the ``param` function is null or undefined

> `Solution`: Make sure to pass a valid object or value

### Parameters object is empty

> `Explanation`: The parameter passed in the `param` function is an empty object.

> `Solution`: Make sure you are passing a valid object in your api route containing the keys and values.


### Key [keyName] not found in path [pathName]

> `Explanation`: You are probably passing a key in the api route which was not set correctly in the `param` function of the routes.

> `Solution`: Make sure you correctly pass the name of the keys configured in the routes.


### No parameter key was found in the specified path

> `Explanation`: This error can occur if you are using `param` in a configured route without passing a key in the path. E.g. `param('/user')`

> `Solution`: Be sure to pass a curly brace in the path when using the `param` function. E.g. `param('/user/:id')`