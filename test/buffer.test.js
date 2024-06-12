import { Buffer as BrowserBuffer } from '../src/browser/index.js';
import { Buffer as NodeBuffer } from '../src/node/index.js';

describe('Buffer', () => {
  
  test('from string', () => {
    const str = 'Hello, World!';
    const nodeBuffer = NodeBuffer.from(str);
    expect(nodeBuffer.toString()).toBe(str);
    const browserBuffer = BrowserBuffer.from(str);
    expect(browserBuffer.toString()).toBe(str);
    expect(nodeBuffer.equals(browserBuffer)).toBe(true);
    expect(browserBuffer.equals(nodeBuffer)).toBe(true);
  });

  test('from Buffer', () => {
    const original = Buffer.from('Hello, World!');
    const nodeBuffer = NodeBuffer.from(original);
    expect(nodeBuffer.equals(original)).toBe(true);
    const browserBuffer = BrowserBuffer.from(original);
    expect(browserBuffer.equals(original)).toBe(true);
    expect(nodeBuffer.equals(browserBuffer)).toBe(true);
    expect(browserBuffer.equals(nodeBuffer)).toBe(true);
  });

  test('from Uint8Array', () => {
    const arr = new Uint8Array([72, 101, 108, 108, 111]);
    const nodeBuffer = NodeBuffer.from(arr);
    expect(nodeBuffer.equals(arr)).toBe(true);
    const browserBuffer = BrowserBuffer.from(arr);
    expect(browserBuffer.equals(arr)).toBe(true);
    expect(nodeBuffer.equals(browserBuffer)).toBe(true);
    expect(browserBuffer.equals(nodeBuffer)).toBe(true);
  });

  test('from ArrayBuffer', () => {
    const arr = new Uint8Array([72, 101, 108, 108, 111]);
    const nodeBuffer = NodeBuffer.from(arr.buffer);
    expect(nodeBuffer.equals(arr)).toBe(true);
    const browserBuffer = BrowserBuffer.from(arr.buffer);
    expect(browserBuffer.equals(arr)).toBe(true);
    expect(nodeBuffer.equals(browserBuffer)).toBe(true);
    expect(browserBuffer.equals(nodeBuffer)).toBe(true);
  });

  test('from object', () => {
    const obj = [72, 101, 108, 108, 111];
    const nodeBuffer = NodeBuffer.from(obj);
    expect(nodeBuffer.equals(new Uint8Array(obj))).toBe(true);
    const browserBuffer = BrowserBuffer.from(obj);
    expect(browserBuffer.equals(new Uint8Array(obj))).toBe(true);
    expect(nodeBuffer.equals(browserBuffer)).toBe(true);
    expect(browserBuffer.equals(nodeBuffer)).toBe(true);
  });

  test('from invalid type', () => {
    expect(() => BrowserBuffer.from(123)).toThrow();
    expect(() => NodeBuffer.from(123)).toThrow();
  });

});
