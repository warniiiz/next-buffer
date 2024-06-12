
import { Base64Decoder } from 'next-base64-encoder'; 
export const TO_BASE64 = new Base64Decoder();


// const BASE64_MAP = 
//   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
//   .split ('')
//   .map(char => char.charCodeAt(0));

  
// export const BASE64URL_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'


// class Base64GenericDecoder {

//   /**
//    * A TextDecoder instance used for decoding binary data to UTF-8.
//    * @private
//    */
//   static #DECODER = new TextDecoder();

//   static decode(srcArray, base64Map, url) {

//     const srcLength = srcArray.length;
//     const base64Length = url ? Math.ceil( srcLength / 3 * 4 ) : Math.ceil( srcLength / 3 ) * 4;
//     const remainingBytes = ( srcLength % 3 );
//     const base64Array = new Uint8Array(base64Length);
  
//     let srcIdx = 0;
//     let base64Idx = 0;
//     const stopLength = srcLength - remainingBytes;
//     for (; srcIdx < stopLength; srcIdx += 3) {
//       const byte1 = srcArray[srcIdx];
//       const byte2 = srcArray[srcIdx+1];
//       const byte3 = srcArray[srcIdx+2];
//       const bytes = ( byte1 << 16 ) | ( byte2 << 8 ) | byte3;
//       base64Array[base64Idx++] = base64Map[( bytes & 0b11111100_00000000_00000000 ) >> 18];
//       base64Array[base64Idx++] = base64Map[( bytes & 0b00000011_11110000_00000000 ) >> 12];
//       base64Array[base64Idx++] = base64Map[( bytes & 0b00000000_00001111_11000000 ) >> 6];
//       base64Array[base64Idx++] = base64Map[( bytes & 0b00000000_00000000_00111111 )];
//     }
  
//     // 1 remaining byte, 2 padding characters
//     if ( remainingBytes === 1 ) { 
  
//       const byte1 = srcArray[srcIdx++];
//       const bytes = byte1 << 16;
//       base64Array[base64Idx++] = base64Map[( bytes & 0b11111100_00000000_00000000 ) >> 18];
//       base64Array[base64Idx++] = base64Map[( bytes & 0b00000011_11110000_00000000 ) >> 12];
//       if (!url) {
//         // ASCII code for '='
//         base64Array[base64Idx++] = base64Array[base64Idx++] = 61; 
//       }
  
//     // 2 remaining bytes, 1 padding character
//     } else if ( remainingBytes === 2 ) { 
  
//       const byte1 = srcArray[srcIdx++];
//       const byte2 = srcArray[srcIdx++];
//       const bytes = ( byte1 << 16 ) | ( byte2 << 8 );
//       base64Array[base64Idx++] = base64Map[( bytes & 0b11111100_00000000_00000000 ) >> 18];
//       base64Array[base64Idx++] = base64Map[( bytes & 0b00000011_11110000_00000000 ) >> 12];
//       base64Array[base64Idx++] = base64Map[( bytes & 0b00000000_00001111_11000000 ) >> 6];
//       if (!url) {
//         // ASCII code for '='
//         base64Array[base64Idx++] = 61; 
//       }
  
//     }
  
//     return Base64GenericDecoder.#DECODER.decode(base64Array);
  
//   };

// }

// export class TO_BASE64 extends Base64GenericDecoder {
  
//   /**
//    * Get the encoding used for decoding, i.e. 'base64'.
//    *
//    * @returns {string} The encoding used for decoding, which is always 'base64'
//    * for a Base64Decoder class instance.
//    */
//   get encoding() { 
//     return 'base64';
//   }

//   /**
//    * Takes a Uint8Array binary array and encodes it to a base64 string.
//    * @param {Uint8Array} srcArray - Binary array to convert
//    * @returns {string} - The base64 encoded string
//    * 
//    * @example
//    * const base64String = Base64Decoder().decode(new Uint8Array([72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]));
//    * console.log(base64String); // "SGVsbG8sIHdvcmxkIQ
//    */
//   static decode(srcArray) {
//     return super.decode(srcArray, BASE64_MAP, false)
//   }

// }
