import CryptoJS from "crypto-js";
import { appConfig } from "../config";

const getEncryptedString = (plainText) => {
  const ciphertext = CryptoJS.AES.encrypt(
    plainText,
    appConfig?.ENCRYPTION_SECRET_KEY
  ).toString();
  return ciphertext;
};

const getDescryptionString = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(
    cipherText,
    appConfig?.ENCRYPTION_SECRET_KEY
  );
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export { getDescryptionString, getEncryptedString };
