
class AsciiDecoder {

  decode(typedArray) {
    let str = '';
    for (let i=0; i < typedArray.length; i++) {
      str += String.fromCharCode(typedArray[i] & 0x7F);
    }
    return str;
  }

}

export const TO_ASCII = new AsciiDecoder();
