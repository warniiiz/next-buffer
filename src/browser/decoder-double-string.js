
class DoubleStringDecoder {

  decode(typedArray) {
    const uInt16Array = new Uint16Array(typedArray.buffer);
    let str = '';
    for (let i=0; i < uInt16Array.length; i++) {
      str += String.fromCharCode(uInt16Array[i]);
    }
    return str;
  }

}

export const TO_DOUBLE_STRING = new DoubleStringDecoder();
