# bcrypt-promise

Promisify [node.bcrypt.js](https://github.com/ncb000gt/node.bcrypt.js) library

## Usage

```bash
npm install bcrypt-promise
```

## Example with `.next()`
```javascript
let bcrypt = require('bcypt-promise');
bcrypt.compare(password, hash)
    .then(function(err, same){
        if(same) {
            // do something
        } else {
            // do otherthing
        }
    });
```

## Example with `koa`
Just use keyword `yield` before bcrypt-promise function then get the result.
```javascript
// require library and initiate koa server
let bcrypt = require('bcrypt-promise');
let koa = require('koa');
let app = koa();
app.listen(3000);

// USE LIBRARY
app.use(function*(next){
    // get password from somewhere
    let password = this.request.body.password;
    // get hash from somewhere
    let hash = yield db.findHash(_id);

    /*
    * use this library
    */
    let same = yield bcrypt.compare(password, hash);
    if(same) {
        this.body = 'Yeah!';
    } else {
        this.body = 'Whops!';
    }
    yield next;
});
```

Use `try-catch` to handle with errors
```javascript
try {
    let same = yield bcrypt.compare(password, hash);
} catch(error) {
    console.log(error);
}
```
