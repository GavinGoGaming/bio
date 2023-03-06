# bio
biopage for me

## Running
***just use Live Server or something***<br>
if you wanna host it on a webserver, clone, cd, and just `npm init`, `npm i express` and in `index.js` (new file), add this:
```js
var e = require('express');
var a = e();
a.use(e.static(__dirname));
a.listen(3000, ()=>{console.log('webserver listening for the local files!')});
```
