/**
 * Same but for Node environnements
 */

// Node.js Buffer
export { Buffer } from 'node:buffer';

// List of encoders
export const FROM_UTF8 = 'utf-8';
export const FROM_ASCII = 'ascii';
export const FROM_LATIN1 = 'latin1';
export const FROM_BINARY = 'binary';
export const FROM_UCS2 = 'ucs-2';
export const FROM_UTF16LE = 'utf-16le';
export const FROM_BASE64 = 'base64';
export const FROM_BASE64URL = 'base64url';
export const FROM_HEX = 'hex';

// List of encoders
export const TO_UTF8 = 'utf-8';
export const TO_ASCII = 'ascii';
export const TO_LATIN1 = 'latin1';
export const TO_BINARY = 'binary';
export const TO_UCS2 = 'ucs-2';
export const TO_UTF16LE = 'utf-16le';
export const TO_BASE64 = 'base64';
export const TO_BASE64URL = 'base64url';
export const TO_HEX = 'hex';

// Test purpose, to check correct webpack use of package.json instructions 
export const ENV = 'NODE|WORKER';
