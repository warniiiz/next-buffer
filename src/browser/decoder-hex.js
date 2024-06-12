
class HexDecoder {

  static #HEX_LOOKUP_TABLE = [].concat(
    ...Array.from('0123456789abcdef').map(
      (char1) => Array.from('0123456789abcdef').map(
        (char2) => char1 + char2
      )
    )
  );
  
  decode(typedArray) {
    const lookupTable = HexDecoder.#HEX_LOOKUP_TABLE;
    const length = typedArray.length;
    let str = '';
    for (let i=0; i < length; i++) {
      str += lookupTable[typedArray[i]];
    }
    return str;
  }

}

export const TO_HEX = new HexDecoder();
