import { configService } from "./config-service";
import { httpService } from "./http-service";
import { AES, enc } from "crypto-js";

export const utilService = {
  request(request: RequestInfo, init?: RequestInit, showLoaderIcon = true) {
    return httpService.request(
      configService.getConfigValue("apiUrl") + request,
      this.addAuthorizationHeader(init),
      showLoaderIcon
    );
  },

  docRequest(request: RequestInfo, init?: RequestInit, showLoaderIcon = true) {
    return httpService.request(
      request,
      this.addAuthorizationHeader(init),
      showLoaderIcon
    );
  },

  getDateFromDateTime(date: Date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      6,
      0,
      0
    );
  },

  cvs(value: any): boolean {
    return (
      value &&
      value !== "" &&
      value.trimStart() !== "" &&
      value.trimEnd() !== ""
    );
  },

  cvn(value: any, gtz: boolean = true): boolean {
    if (Number(value) > 0 && gtz) {
      return true;
    } else if (!gtz) {
      if (typeof value != "string") {
        return false;
      }
      var t: any = value;
      return !isNaN(t) && !isNaN(parseFloat(value));
    }
    return false;
  },

  parseJSON(response: any) {
    return new Promise((resolve) => {
      response.json().then((data: any) => {
        resolve(data);
      });
    });
  },

  getGUID() {
    return crypto.randomUUID();
  },

  encrypt(message = "") {
    const keySize = 256;
    const ivSize = 128;
    const saltSize = 256;
    const iterations = 1000;
    var salt: any = CryptoJS.lib.WordArray.random(saltSize / 8);
    let lruy = configService.getConfigValue("secretKey");

    var key = CryptoJS.PBKDF2(lruy, salt, {
      keySize: keySize / 32,
      iterations: iterations,
    });

    var iv = CryptoJS.lib.WordArray.random(ivSize / 8);

    var encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    var encryptedHex = this.base64ToHex(encrypted.toString());
    return this.hexToBase64(salt + iv + encryptedHex) + "#$^&So" + lruy;
  },

  decrypt(transitmessage = "") {
    const keySize = 256;
    const ivSize = 128;
    const saltSize = 256;
    const iterations = 1000;
    var hexResult = this.base64ToHex(transitmessage);
    let lruy = configService.getConfigValue("secretKey");

    var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
    var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
    var encrypted = this.hexToBase64(hexResult.substring(96));

    var key = CryptoJS.PBKDF2(lruy, salt, {
      keySize: keySize / 32,
      iterations: iterations,
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  },

  prepareXml(apiKey: string, payload: any, payloadDecryption = true) {
    payload = payloadDecryption
      ? this.encrypt(
          JSON.stringify({
            root: payload,
          })
        )
      : JSON.stringify({ root: payload });

    apiKey = this.encrypt(apiKey);

    return {
      spolru: apiKey,
      psulpsf: payload,
    };
  },

  jsonParse: (jsonString: string, array = true) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return array ? [] : {};
    }
  },
  jsonParseArray: (result: any, array = true) => {
    try {
      let res: any = {};
      for (let row = 0; row < result.length; row++) {
        res["result" + (row + 1)] = JSON.parse(result[row]);
      }
      return res;
    } catch (error) {
      return {};
    }
  },
  checkValidGUID: (guid: string): string => {
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (regexExp.test(guid)) {
      return guid;
    } else {
      return "00000000-0000-0000-0000-000000000000";
    }
  },
  isValidGUID: (guid: string | undefined): boolean => {
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    let guidCheck: any = guid;
    return (
      regexExp.test(guidCheck) &&
      !(guid === "00000000-0000-0000-0000-000000000000")
    );
  },
  validString: (value: any): boolean => {
    try {
      return value && String(value).trim() ? true : false;
    } catch (error) {
      return false;
    }
  },

  addAuthorizationHeader: (init?: RequestInit) => {
    init = init || {};
    // if (options.headers) {
    //     options.headers.Authorization = "Bearer " + Auth.getToken();
    // } else {
    //     options.headers = {
    //         Authorization: "Bearer " + Auth.getToken()
    //     }
    // }
    return init;
  },

  base64ToHex: (str: string) => {
    for (
      var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = [];
      i < bin.length;
      ++i
    ) {
      var tmp = bin.charCodeAt(i).toString(16);
      if (tmp.length === 1) tmp = "0" + tmp;
      hex[hex.length] = tmp;
    }
    return hex.join("");
  },

  hexToBase64: (str: string) => {
    let stringArray: any = str
      .replace(/\r|\n/g, "")
      .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
      .replace(/ +$/, "")
      .split(" ");
    return btoa(String.fromCharCode.apply(null, stringArray));
  },

  getUTCDate: (localDate: Date): Date => {
    return new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        localDate.getHours(),
        localDate.getMinutes()
      )
    );
  },

  showLoader: () => {
    let element: any = document.getElementById("loader");
    if (element) {
      element.style.display = "block";
    }
  },

  hideLoader: () => {
    let element: any = document.getElementById("loader");
    if (element) {
      element.style.display = "none";
    }
  },

  sEncrypt: (message = "") => {
    let lruy = configService.getConfigValue("secretKey");
    return AES.encrypt(message, lruy).toString();
  },

  sDecrypt: (transitmessage = "") => {
    let lruy = configService.getConfigValue("secretKey");
    let bytes = AES.decrypt(transitmessage, lruy);
    return bytes.toString(enc.Utf8);
  },

  getDeepCopy: (value: any) => {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (error) {
      return value;
    }
  },

  setLocalStorage: (keyName: string, entity: any) => {
    localStorage.setItem(keyName, JSON.stringify(entity));
  },

  getLocalStorage: (keyName: string) => {
    return JSON.parse(localStorage.getItem(keyName) || "{}");
  },
};
