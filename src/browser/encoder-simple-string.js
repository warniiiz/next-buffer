
class SimpleStringEncoder {

  encode(str) {
    const byteArray = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray[i] = str.charCodeAt(i) & 0xFF;
    }
    return byteArray;
  }

}

export const FROM_SIMPLE_STRING = new SimpleStringEncoder();
