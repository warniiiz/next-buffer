
class HexEncoder {

  static #FORMAT_RE = /[^a-f0-9]/g;

  encode(str) {
    const length = str.length;
    // First, check hex format
    if (HexEncoder.#FORMAT_RE.test(str))
      throw new TypeError(`Invalid hex format: ${str}`);
    if (length % 2 !== 0)
      throw new TypeError(`Invalid hex length (should be even): ${str}`);
    // Loop
    const byteArray = new Uint8Array(length / 2);
    let destIdx = 0;
    for (let i = 0; i < length; i += 2) {
      byteArray[destIdx++] = parseInt(str.slice(i, i + 2), 16);
    }
    return byteArray;
  }

}

export const FROM_HEX = new HexEncoder();
