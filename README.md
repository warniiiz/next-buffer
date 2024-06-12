# Optimized Buffer, for Next.js

![License](https://img.shields.io/npm/l/next-buffer)
![NPM Downloads](https://img.shields.io/npm/dw/next-buffer)
![NPM Version](https://img.shields.io/npm/v/next-buffer)
 
Next Buffer is a version of Node.js Buffer module, **optimized for client-side Next.js**, with a ridiculously reduced bundle size. 

This NPM module is usable server-side, client-side and in Edge Runtime (for middleware). Since Node.js Buffer is C++ implemented, it is already very fast and nothing more has been done on this side. Tis module is providing a pure-JS implementation of the Buffer API (at least for the main usecases), which is tree-shaking ready and optimized for client-side browser usage.

Please note that Next Buffer provides an API that is **not 100% identical to Node's Buffer API**, but it is compatible with the most common use cases. See the [detailed list of implementations](#pure-js-limitations) for more information. These limitations only concern the pure-JS implementation, when used on client-side (browser). 


## Architecture & Performances

Choice of using Buffer or pure-JS is transparently and automatically handle by webpack. Fallback to Buffer (with C++ library) in 'node' and 'worker' environments, for faster execution (especially when encoding long string) in Next.js and Edge Runtime middlewares. On client-side, you will automatically use the pure-JS implementation, which is lighter and faster than the browserify Buffer implementation.

Pure-JS, tree-shaking ready, with optimized performances:  
- 2x to 8x faster than browserify Buffer for encoding/decoding Base64 (used when using Buffer in client-side Next.js)
- 20x lighter, only 1kB once webpacked by Next.js, saving more than 20kB of bundle size (compared to browserify Buffer when webpacked by Next.js)

20kB seems nothing, but it's worth it if you're only using Buffer as a string encoder/decoder... _From acorns grow oak trees._


## Installation

Install with npm:

```bash
npm install next-buffer
```

## Usages

The main difference with original Buffer API is that you have to separately import the specific encoder/decoders you need. This is to allow tree-shaking to be effective, and to avoid webpacking the whole Buffer API when you only need a small part of it.

The other difference is that you will instanciate Buffer with `Buffer.from(string, FROM_UTF8)` where `FROM_UTF8` is an encoder (object providing an `encode(string)` method). In the original API, you use `Buffer.from(string, 'utf-8')`, where `'utf-8'` is a string representing an encoding scheme. 

**Import only the class you need, in order tree-shaking to be effective.**

### Transcoding string from UTF-8 to Base64Url

```javascript
import { Buffer, TO_BASE64URL } from 'next-buffer';

const phrase = 'Hello Mr Warniiiz 👋';
const base64Phrase = Buffer.from(phrase).toString(TO_BASE64URL);

console.log(base64Phrase);
// Expected: SGVsbG8gTXIgV2FybmlpaXog8J-Riw
```

`FROM_UTF8` is the default Encoder, so you can omit the second parameter of `Buffer.from()` static method: In the above code snippet, `Buffer.from(phrase)` is equivalent to `Buffer.from(phrase, FROM_UTF8)`.


### Transcoding string from Base64Url to Latin-1

```javascript
import { Buffer, FROM_BASE64URL, TO_LATIN1 } from 'next-buffer';

const base64Phrase = "SGVsbG8gTXIgV2FybmlpaXog8J-Riw";
const phrase = Buffer.from(base64Phrase, FROM_BASE64URL).toString(TO_LATIN1);

console.log(phrase);
// Expected: Hello Mr Warniiiz ð
// (Latin-1 does not support Unicode characters)
```

### Transcoding string from Hex to UTF-8

```javascript
import { Buffer, FROM_HEX } from 'next-buffer';

const hexPhrase = "48656c6c6f204d72205761726e6969697a20f09f918b";
const phrase = Buffer.from(hexPhrase, FROM_HEX).toString();

console.log(phrase);
// Expected: Hello Mr Warniiiz 👋
```

`TO_UTF8` is the default Decoder, so you can omit the only parameter of `toString()` method: In the above code snippet, `buffer.toString()` is equivalent to `buffer.toString(TO_UTF8)`.

### Available encoders

Named straightforward, after their equivalent from Node's Buffer:

- `FROM_UTF8`
- `FROM_ASCII`
- `FROM_LATIN1`
- `FROM_BINARY`
- `FROM_UTF16LE`
- `FROM_UCS2`
- `FROM_BASE64`
- `FROM_BASE64URL`
- `FROM_HEX`

### Available decoders

- `TO_UTF8`
- `TO_ASCII`
- `TO_LATIN1`
- `TO_BINARY`
- `TO_UTF16LE`
- `TO_UCS2`
- `TO_BASE64`
- `TO_BASE64URL`
- `TO_HEX`

### Needs more?

Feel free to open an issue on GitHub if you need a specific encoder/decoder. You can also submit a pull request, developping your own Encoder/Decoder class: the only requirement is a respective `encode(string) => typedArray` or `decode(typedArray) => string` method.

## Pure-JS limitations

Although the fallback on Node's Buffer when using Next Buffer in Node or Edge runtime shall never be a problem, you may encounter some limitations when using Next Buffer in client-side Next.js.

The Pure-JS API is not 100% identical as the one of Node.js. Some of the initial methods have not yet been implemented. If you need some, feel free to ask or to do a pull-request.

Implementation of Buffer basically extends Uint8Array, which natively implements some of the methods of Node.js Buffer.

Implemented methods (in Pure-JS Buffer):
- `Static method: Buffer.compare(buf1, buf2)`
- `Static method: Buffer.concat(list[, totalLength])` /!\ _PARTIAL IMPLEMENTATION_
- `Static method: Buffer.from(array)`
- `Static method: Buffer.from(arrayBuffer[, byteOffset[, length]])`
- `Static method: Buffer.from(buffer)`
- `Static method: Buffer.from(object[, offsetOrEncoding[, length]])` /!\ _MODIFIED IMPLEMENTATION_
- `Static method: Buffer.from(string[, encoding])` /!\ _MODIFIED IMPLEMENTATION_
- `Static method: Buffer.isBuffer(obj)`
- `buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])`  /!\ _PARTIAL IMPLEMENTATION_
- `buf.equals(otherBuffer)`
- `buf.toString([encoding[, start[, end]]])` /!\ _PARTIAL & MODIFIED IMPLEMENTATION_

Inherited methods (from UInt8Array):
- `buf[index]`
- `buf.buffer`
- `buf.byteOffset`
- `buf.entries()`
- `buf.fill(value[, offset[, end]][, encoding])` /!\ _PARTIAL IMPLEMENTATION_
- `buf.includes(value[, byteOffset][, encoding])` /!\ _PARTIAL IMPLEMENTATION_
- `buf.indexOf(value[, byteOffset][, encoding])` /!\ _PARTIAL IMPLEMENTATION_
- `buf.keys()`
- `buf.length`
- `buf.lastIndexOf(value[, byteOffset][, encoding])` /!\ _PARTIAL IMPLEMENTATION_
- `buf.slice([start[, end]])`
- `buf.subarray([start[, end]])`
- `buf.values()`

Not implemented :
- `Static method: Buffer.alloc(size[, fill[, encoding]])`
- `Static method: Buffer.allocUnsafe(size)`
- `Static method: Buffer.allocUnsafeSlow(size)`
- `Static method: Buffer.byteLength(string[, encoding])`
- `Static method: Buffer.copyBytesFrom(view[, offset[, length]])`
- `Static method: Buffer.isEncoding(encoding)`
- `Class property: Buffer.poolSize`
- `buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])`
- `buf.readInt16BE|readBigInt64LE|readBigUInt64LE([offset])` ### _x22 methods_
- `buf.swap16()`
- `buf.swap32()`
- `buf.swap64()`
- `buf.toJSON()`
- `buf.write(string[, offset[, length]][, encoding])`
- `buf.writeBigInt64BE|writeBigInt64LE|writeInt8(value[, offset])` ### _x22 methods_

Please refer to:
- [Node.js Buffer API](https://nodejs.org/api/buffer.html)
- [Node.js Buffer Implementation](https://github.com/nodejs/node/blob/main/lib/buffer.js)

## Tests

To launch the tests using jest:

```javascript
npm run test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

Next Buffer module is [ISC licensed](./LICENSE).