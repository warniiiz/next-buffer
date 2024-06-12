/**
 * @author   Clément Warneys <https://github.com/warniiiz>
 * @license  ISC
**/

/**
 * _Above legal information shall remain separate in order webpack to be able to
 * remove it._
 * 
 * The class JsBuffer is a Pure-JS implementation of the Node.js Buffer,
 * designed to be used in Browser environment.
 * 
 * In order to limit the bundle size, it has been designed to be 
 * tree-shakable. Some modification have been done in that way:
 * - Buffer.from(string) works like Node.js Buffer
 * - Buffer.from(string, encoder) needs an encoder and not an encoding
 * string. Encoder shall be imported separately, thus providing insight to 
 * webpack of what parts shall be integrated in final bundle.
 * 
 * The API is not 100% identical as the one of Node.js. Some of the initial
 * methods have not yet been implemented. If you need some, feel free to ask or 
 * to do a pull-request.
 * 
 * JsBuffer extends Uint8Array, which natively implements some of the 
 * methods of Node.js Buffer.
 * 
 * Implemented methods (in JsBuffer):
 * - Static method: Buffer.compare(buf1, buf2)
 * - Static method: Buffer.concat(list[, totalLength]) ### PARTIAL IMPLEMENTATION
 * - Static method: Buffer.from(array)
 * - Static method: Buffer.from(arrayBuffer[, byteOffset[, length]])
 * - Static method: Buffer.from(buffer)
 * - Static method: Buffer.from(object[, offsetOrEncoding[, length]]) ### MODIFIED IMPLEMENTATION
 * - Static method: Buffer.from(string[, encoding]) ### MODIFIED IMPLEMENTATION
 * - Static method: Buffer.isBuffer(obj)
 * - buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])  ### PARTIAL IMPLEMENTATION
 * - buf.equals(otherBuffer)
 * - buf.toString([encoding[, start[, end]]]) ### PARTIAL & MODIFIED IMPLEMENTATION
 * 
 * Inherited methods (from UInt8Array):
 * - buf[index]
 * - buf.buffer
 * - buf.byteOffset
 * - buf.entries()
 * - buf.fill(value[, offset[, end]][, encoding]) ### PARTIAL IMPLEMENTATION
 * - buf.includes(value[, byteOffset][, encoding]) ### PARTIAL IMPLEMENTATION
 * - buf.indexOf(value[, byteOffset][, encoding]) ### PARTIAL IMPLEMENTATION
 * - buf.keys()
 * - buf.length
 * - buf.lastIndexOf(value[, byteOffset][, encoding]) ### PARTIAL IMPLEMENTATION
 * - buf.slice([start[, end]])
 * - buf.subarray([start[, end]])
 * - buf.values()
 * 
 * Not implemented :
 * - Static method: Buffer.alloc(size[, fill[, encoding]])
 * - Static method: Buffer.allocUnsafe(size)
 * - Static method: Buffer.allocUnsafeSlow(size)
 * - Static method: Buffer.byteLength(string[, encoding])
 * - Static method: Buffer.copyBytesFrom(view[, offset[, length]])
 * - Static method: Buffer.isEncoding(encoding)
 * - Class property: Buffer.poolSize
 * - buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
 * - buf.readInt16BE|readBigInt64LE|readBigUInt64LE([offset]) ### x22 methods
 * - buf.swap16()
 * - buf.swap32()
 * - buf.swap64()
 * - buf.toJSON()
 * - buf.write(string[, offset[, length]][, encoding])
 * - buf.writeBigInt64BE|writeBigInt64LE|writeInt8(value[, offset]) ### x22 methods
 * 
**/

import { FROM_UTF8 } from './encoder-utf8.js';
import { TO_UTF8 } from './decoder-utf8.js';

export class JsBuffer extends Uint8Array {

  // Instanciation with Buffer.from using Uint8Array constructor
  static from(value, encoderOrOffset, length) {

    const encoder = encoderOrOffset;
    const offset = encoderOrOffset;

    // From String
    if (typeof value === 'string')
      return JsBuffer.#fromString(value, encoder);

    // From JsBuffer
    if (JsBuffer.isBuffer(value) && offset === undefined && length === undefined)
      return value;

    // From Uint8Array
    if (value instanceof Uint8Array && offset === undefined && length === undefined)
      return new JsBuffer(value);

    // From ArrayBuffer views (TypedArray)
    // Do not transmit directly TypedArray other than Uint8Array, else data could be lost
    // Prefer transmitting the underlying ArrayBuffer
    if (ArrayBuffer.isView(value))
      return new JsBuffer(value.buffer, offset, length);

    // From ArrayBuffer
    if (value instanceof ArrayBuffer)
      return new JsBuffer(value, offset, length);

    // From Object (Array, iterable) or throw error
    if (value?.[Symbol.iterator])
      return new JsBuffer(value);

    // Error
    throw new TypeError("The first argument must be one of type string, Buffer, Uint8Array, ArrayBuffer, or an iterable object.");

  }

  static #fromString(string, encoder=FROM_UTF8) {
    // check if encoder is a function, not an encoding string
    if (typeof encoder.encode !== 'function')
      throw new TypeError("The 'fromString' static method of Buffer pure-JS implementation needs an Encoder as first argument.");
    // encode string as a Uint8Array
    const encodedString = encoder.encode(string);
    // get new Buffer
    return new JsBuffer(encodedString);
  }
  
  toString(decoder=TO_UTF8) {
    // check if decoder is a function, not an encoding string
    if (typeof decoder.decode !== 'function')
      throw new TypeError("The 'toString' method of Buffer pure-JS implementation needs a Decoder as first argument.");
    // decode
    return decoder.decode(this);
  }

  static compare(buf1, buf2) {
    if (!(buf1 instanceof Uint8Array) || !(buf2 instanceof Uint8Array))
      throw new Error('Buffers must be of type Uint8Array');
    const length = Math.min(buf1.length, buf2.length);
    for (let i = 0; i < length; i++) {
      if (buf1[i] === buf2[i]) continue;
      return (buf1[i] < buf2[i]) ? -1 : 1;
    }
    if (buf1.length === buf2.length) return 0;
    return buf1.length < buf2.length ? -1 : 1;
  }

  static isBuffer(b) {
    return b instanceof JsBuffer;
  }
  
  // original signature: concat(list, length)
  static concat(list) {
    if (!Array.isArray(list) || list.length === 0) return new JsBuffer();
    const totalLength = list.reduce((acc, buf) => acc + buf.length, 0);
    const concatArray = new Uint8Array(totalLength);
    let offset = 0;
    list.forEach((buf) => {
      concatArray.set(buf, offset);
      offset += buf.length;
    });
    return new JsBuffer(concatArray);
  };

  compare(target) {
    return JsBuffer.compare(this, target);
  }

  equals(otherBuffer) {
    return this.compare(otherBuffer) === 0;
  }
  
}
