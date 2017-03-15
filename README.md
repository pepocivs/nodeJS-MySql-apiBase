# nodeJS-MySql-apiBase

## Table of Contents

- [Introduction](#introduction)
- [Install](#install)
- [Working](#working)
- [Creating a new call](#Creating-a-new-call)

## Introduction
This is a lite backend developed in NodeJS that connect with a MySql database, does not
require compiling, and is 100% MIT licensed.

## Install
#### Requirements
- MySql server
- NodeJS (tested with v6.0.0)

**Cloning repository**
```sh
$ git clone git@github.com:pepocivs/nodeJS-MySql-apiBase.git
```
**Installing dependences**
*go to your project folder and execute:*
```sh
$ npm install
```
**Then you only have to install MySql Server and execute myDB.sql**

#### Configura & Running first time
**Configure**
    - You will find a file called serverConfig.js, this file contains all connection data.
    - Our recomendation is to put this file in .gitignore

**Running**
*go to your project folder and execute:*
```sh
$ npm start
```

**Running with supervisor**
*go to your project folder and execute:*
```sh
$ sudo apt-get install supervisor
$ supervisor server.js
```

## Working
By default server starts at port **4000**, you can change this in `connection.js:64`

We should see this output:
```
MyDB-API apiRestFull v0.0.1 alive at Port 4000.
Wed Mar 15 2017 17:23:50 GMT+0100 (CET)
--------------------------------------
```

Now we can make a call, by default
http://localhost:4000/firstCall
http://localhost:4000/firstCall?id=1 (1,2 or 3)

## Creating a new call
1 - Create new route in `routes.js`
```js
router.get('/my-new-call', myDB.getMyNewCall);
```
You can add a middleWare function, for example protect the call behind login
```js
router.get('/my-new-call', yourMiddleware, myDB.myNewCall);
```

2 - Adding **DAO Call** in `controllers/myDB/myDBController.js`, using lodash partial we can call the function to generate dinamically the DAO function for each call, then you have to provide the name of the call as a first parameter and the name of the file to format the data.
```js
getMyNewCall: _.partial(callDao, 'getMyNewCall', 'myNewCallData')
```

3 - Adding **DAO configuration** in `lib/dao/myDB/myDBDao.js`, using again lodash partial we can execute the function, such as get, post, put, patch, delete, options. We will send this as a first character and the second means the name of the query file.
```js
getMyNewCall:   _.partial(getInfo, 'get', 'myNewCall')
```

4 - Create your own **query** in `lib/queries/myNewCall.js`
* This query can use filters and params to get more complex queries.
```json
var equivalences = {
    "id"    : {
      "condition" : "id = ?",
      "type"      : "integer"
    }
};
```
* The key of the object will be the name of the filter or the param, condition will be the conditions where this variable will be use, we use the `"?"` to easy replace in tools.js, and then set a type of that variable, sould be `integer`, `string`, `stringLike`, `boolean`, you can add more in `lib/tools/tools.js`
* You can set a param `"/my-new-call/:myParam"` and automatically will be added to filters
* Return can be a sigle queryString or an array of queryStrings, in case of array each query will be executed by separately.

5 - Create a **format data function** in `/lib/dataConvert/myNewCallData.js`
Usually we want to convert or reformat the returned object *(by default returns a json based on mySql table)*.
For example maybe you want to proccess some part of this object, so for do than this is the place

## Features
* Multilanguage
    This system is prepared to get multilanguage responses using i18n package. To use it you have to send the header `Accept-Language`, now are available `en_US` `es_ES`, but you can add more in `connection.js:43`

* Login friendly
    Moreover is also prepared to get X-Access-Token to protect some calls via middleware. To use it you have to send the header `X-Access-Token`.
