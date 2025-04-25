
import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha256';
import { utf8ToBytes, bytesToHex } from '@noble/hashes/utils';
import { EXPO_SECRET_KEY } from '@env';

const signData = async (data) => {
  const dataBytes = utf8ToBytes(data);
  const keyBytes = utf8ToBytes(EXPO_SECRET_KEY);
  const signatureBytes = hmac(sha256, keyBytes, dataBytes);
  const signatureHex = bytesToHex(signatureBytes);
  return signatureHex;
};

export {signData}