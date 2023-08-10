import { serviceMapping } from "./app-service-mapping";
import { configService } from "./config-service";
import { httpService } from "./http-service";
import { utilService } from "./util-service";

const apiUrl =
  "api/servicep/web/9e9ead45540e/ctrl/T3gMnayuEp3/internal/xml/y8trW/post/2021dEc24/request";

export const applicationService = {
  callGenericRequest: function (yek: string, payload: any): Promise<any> {
    let mapping = serviceMapping.getMapping(yek);
    return new Promise((resolve, reject) => {
      utilService
        .request(
          (mapping?.api ? mapping.api : apiUrl) +
            "?batch=" +
            yek +
            this.getMode(payload),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
              utilService.prepareXml(String(mapping?.xmlYek), payload)
            ),
          }
        )
        .then((result: any) => {
          if (result && result.data) {
            resolve({
              success: true,
              data: utilService.jsonParseArray(result.data.rulQwyuLst),
              message: "Success",
            });
          } else {
            resolve({ success: false, message: "Error occured", data: null });
          }
        });
    });
  },

  callCustomRequest: function (yek: string, payload: any): Promise<any> {
    httpService.showLoader();
    let mapping = serviceMapping.getMapping(yek);
    return new Promise((resolve, reject) => {
      fetch(
        configService.getConfigValue("apiUrl") +
          (mapping?.api ? mapping.api : apiUrl) +
          "?batch=" +
          yek +
          this.getMode(payload),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            utilService.prepareXml(String(mapping?.xmlYek), payload)
          ),
        }
      )
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => {
          httpService.hideLoader();
          resolve(url);
        });
    });
  },

  getMode: (payload: any): string => {
    try {
      return "&mode=" + payload.mode.toLowerCase();
    } catch (error) {
      return "";
    }
  },

  getConsolidatedReport: (refId: string, mode: string): Promise<any> => {
    httpService.showLoader();
    return new Promise((resolve, reject) => {
      utilService
        .docRequest(
          configService.getConfigValue("editorAPIUrl") +
            "api/service/web/wre34edfd40e/ctrl/sdfwejkIayuEp3/document/get/document/consolidated/report/generation",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refId: refId, mode: mode }),
          }
        )
        .then((result: any) => {
          if (result) {
            resolve({ success: true, data: result, message: "Success" });
          } else {
            resolve({ success: false, message: "Error occured", data: null });
          }
        });
    });
  },

  getPacketReport: (
    refId: string,
    mode: string,
    saveOrginalPacket = false,
    actionParam = ""
  ): Promise<any> => {
    httpService.showLoader();
    return new Promise((resolve, reject) => {
      utilService
        .docRequest(
          configService.getConfigValue("editorAPIUrl") +
            "api/service/web/wre34edfd40e/ctrl/sdfwejkIayuEp3/document/get/document/packet/report/generation",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              refId: refId,
              mode: mode,
              saveOrginalPacket: saveOrginalPacket,
              actionParam: actionParam,
            }),
          }
        )
        .then((result: any) => {
          if (result) {
            resolve({ success: true, data: result, message: "Success" });
          } else {
            resolve({ success: false, message: "Error occured", data: null });
          }
        });
    });
  },

  getConsolidatedPacketReport: (
    refId: string,
    mode: string,
    saveOrginalPacket = false,
    actionParam = ""
  ): Promise<any> => {
    httpService.showLoader();
    return new Promise((resolve, reject) => {
      utilService
        .docRequest(
          configService.getConfigValue("editorAPIUrl") +
            "api/service/web/wre34edfd40e/ctrl/sdfwejkIayuEp3/document/get/document/consolidated/packet/report/generation",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              refId: refId,
              mode: mode,
              saveOrginalPacket: saveOrginalPacket,
              actionParam: actionParam,
            }),
          }
        )
        .then((result: any) => {
          if (result) {
            resolve({ success: true, data: result, message: "Success" });
          } else {
            resolve({ success: false, message: "Error occured", data: null });
          }
        });
    });
  },
};
