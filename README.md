# lz-js

Compress source js code to no-dependencies self-decompressable js code.  
`lz-js` aims to provide as small output js code as possible and don't rely on external libraries for self-decompress.

## Usage

### CLI
```
npx lz-js file.js file.lz.js
```
This command creates compressed js from `file.js` and write content to `file.lz.js`.  
The result is fully standalone and does not require any dependencies to decompress itself. So it can be used as is in browsers or nodejs if you want.

## API

Module is pretty simple:

```js
const lzJs = require('lz-js');
// ...
const compressedMinifiedCode = await lzJs('function decompressed() { return 42; }');
// write compressedMinifiedCode to file or pass anywhere else
```

`lz-js` will minify only self-decompressor code using `uglifyjs`, source code to be compressed never minified by `lz-js`.  
  
If you want minify self-decompressor code by youself, pass `false` to second parameter:

```js
const compressedCode = await lzJs(..., false);
// false means do not minify self-decompressor code
// here we can pass compressedCode to preferred minifier
```

## How it works?

It uses `lz-string` lib for compressing and decompressing code, but with some tricks to reduce space usage in js code context. For compressing used `lz-string` itself, for decompressing - inlined version of decompressor.

Because of inlined decompressor `lz-js` is not situable for very small scripts (~1k bytes and less), in this case decompressor itself is too big and compression profit is not notable. That's because we need to minify it by maximum.

To make self-decompressor extremely lightweight (**~344 bytes** using uglifyjs) it was almost fully rewritten with many assumptions. The main is compressed code string is **always** correct and we don't need to make any checks.

You can see inlined decompressor code in file `src/lz-decompress.js`, it's rewriten version of `lz-string` function `_decompress`.