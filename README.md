# glob-intersect

A function that tells you whether two file globs intersect.

Example

```js
var m = require('glob-intersect');

console.log(m('test/**/*.js', 'test/x/*'));

// true;
```

# TODO

Currently supports: star, double-star

Not yet supported: questionmarks (`file?.js`) and character groups (`x[abcd]`)

# license

MIT
