
class DoubleStringEncoder {

  encode(str) {
    const length = str.length;
    const byteArray = new Uint8Array(length * 2);
    let destIdx = 0;
    for (let i = 0; i < length; i++) {
      const c = str.charCodeAt(i);
      const hi = c >> 8;
      const lo = c % 256;
      byteArray[destIdx++] = lo;
      byteArray[destIdx++] = hi;
    }
    return byteArray;
  }

}

export const FROM_DOUBLE_STRING = new DoubleStringEncoder();
