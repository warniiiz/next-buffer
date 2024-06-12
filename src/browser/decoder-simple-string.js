
class SimpleStringDecoder {

  decode(typedArray) {
    let str = '';
    for (let i=0; i < typedArray.length; i++) {
      str += String.fromCharCode(typedArray[i]);
    }
    return str;
  }

}

export const TO_SIMPLE_STRING = new SimpleStringDecoder();
