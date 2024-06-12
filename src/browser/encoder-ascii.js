
class AsciiEncoder {

  encode(str) {
    const byteArray = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
      // Node's code seems to be doing 0xFF and not 0x7F...
      byteArray[i] = str.charCodeAt(i) & 0x7F;
    }
    return byteArray;
  }

}

export const FROM_ASCII = new AsciiEncoder();
