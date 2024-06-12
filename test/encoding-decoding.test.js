import * as BrowserBuffer from '../src/browser/index.js';
import * as NodeBuffer from '../src/node/index.js';

const ALL_CODECS = ['UTF8', 'ASCII', 'LATIN1', 'BINARY', 'UTF16LE', 'UCS2', 'BASE64', 'BASE64URL', 'HEX']

ALL_CODECS.forEach((encoding) => {

  describe('Encodings and Decodings with 1 special char', () => {

    const testString = 'Hello, World! ☀️';

    test(encoding, () => {
      const encodedString = NodeBuffer.Buffer.from(testString).toString(NodeBuffer[`TO_${encoding}`]);
      const browserBuffer = BrowserBuffer.Buffer.from(encodedString, BrowserBuffer[`FROM_${encoding}`]);
      const browserResult = browserBuffer.toString(BrowserBuffer[`TO_${encoding}`]);
      expect(browserResult).toBe(encodedString);
      const nodeBuffer = NodeBuffer.Buffer.from(encodedString, NodeBuffer[`FROM_${encoding}`]);
      const nodeResult = nodeBuffer.toString(NodeBuffer[`TO_${encoding}`]);
      expect(nodeResult).toBe(encodedString);
      expect(nodeBuffer.equals(browserBuffer)).toBe(true);
      expect(browserBuffer.equals(nodeBuffer)).toBe(true);
    });

  });

});


ALL_CODECS.forEach((encoding) => {

  describe('Encodings and Decodings with long string (65kB)', () => {

    const longArray = new Uint8Array(256*256*2);
    for (let i = 0; i < 256*256; i+=2) { 
      longArray[i] = (i >> 8) & 0xFF;
      longArray[i+1] = i & 0xFF;
    }
    const longBuffer = NodeBuffer.Buffer.from(longArray);

    test(encoding, () => {
      const encodedString = longBuffer.toString(NodeBuffer[`TO_${encoding}`]);
      // console.log(encodedString.slice(5000, 12000))
      const browserBuffer = BrowserBuffer.Buffer.from(encodedString, BrowserBuffer[`FROM_${encoding}`]);
      const browserResult = browserBuffer.toString(BrowserBuffer[`TO_${encoding}`]);
      expect(browserResult).toBe(encodedString);
      const nodeBuffer = NodeBuffer.Buffer.from(encodedString, NodeBuffer[`FROM_${encoding}`]);
      const nodeResult = nodeBuffer.toString(NodeBuffer[`TO_${encoding}`]);
      expect(nodeResult).toBe(encodedString);
      expect(nodeBuffer.equals(browserBuffer)).toBe(true);
      expect(browserBuffer.equals(nodeBuffer)).toBe(true);
    });

  });

});


