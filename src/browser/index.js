/**
 * @author   Clément Warneys <https://github.com/warniiiz>
 * @license  ISC
**/

/**
 * Browser equivalent of Node.js Buffer, tree-shaking ready.
 */

// Pure Js Buffer
export { JsBuffer as Buffer } from './buffer.js';

// List of encoders
export { FROM_UTF8 } from './encoder-utf8.js';
export { FROM_ASCII } from './encoder-ascii.js';
export { FROM_SIMPLE_STRING as FROM_LATIN1 } from './encoder-simple-string.js';
export { FROM_SIMPLE_STRING as FROM_BINARY } from './encoder-simple-string.js'; // alias of latin1 in Node Buffer
export { FROM_DOUBLE_STRING as FROM_UTF16LE } from './encoder-double-string.js';
export { FROM_DOUBLE_STRING as FROM_UCS2 } from './encoder-double-string.js'; // alias of utf16le in Node Buffer
export { FROM_BASE64 } from './encoder-base64.js';
export { FROM_BASE64URL } from './encoder-base64url.js'
export { FROM_HEX } from './encoder-hex.js';

// List of decoders
export { TO_UTF8 } from './decoder-utf8.js';
export { TO_ASCII } from './decoder-ascii.js';
export { TO_SIMPLE_STRING as TO_LATIN1 } from './decoder-simple-string.js';
export { TO_SIMPLE_STRING as TO_BINARY } from './decoder-simple-string.js'; // alias of latin1 in Node Buffer
export { TO_DOUBLE_STRING as TO_UTF16LE } from './decoder-double-string.js';
export { TO_DOUBLE_STRING as TO_UCS2 } from './decoder-double-string.js'; // alias of utf16le in Node Buffer
export { TO_BASE64 } from './decoder-base64.js';
export { TO_BASE64URL } from './decoder-base64url.js';
export { TO_HEX } from './decoder-hex.js';

// Test purpose, to check correct webpack use of package.json instructions 
export const ENV = 'PURE-JS';
