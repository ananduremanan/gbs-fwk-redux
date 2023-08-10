import { configService } from "./config-service";
import { utilService } from "./util-service";

export const urlService = {
  async navigateTo(requestUrl: string, self = true) {
    window.open(requestUrl, self ? "_self" : "_blank");
    window.location.reload();
  },

  getParam: (name: string, url?: string): string => {
    if (!url) url = window.location.href;
    url = url.replace(/%20/g, " ");
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? "" : results[1];
  },

  getEmptyGUID: (): string => {
    return "00000000-0000-0000-0000-000000000000";
  },

  showDocument: (documentId: string, readOnly = false, self = false): void => {
    let user = localStorage.getItem("loginUserDetails");
    let author = "";
    if (user) {
      let userJ = JSON.parse(user);
      author = utilService.sEncrypt(userJ.username + (readOnly ? "|true" : ""));
    }
    const message = JSON.stringify({
      message: "_showDocumentEditor",
      entity: {
        documentId: documentId,
        author: author,
        docUrl:
          configService.getConfigValue("docWebUrl") +
          "?keyXc=" +
          documentId +
          "&autvF=" +
          author,
      },
    });
    window.postMessage(message, "*");
    // window.open(configService.getConfigValue('docWebUrl') + "?keyXc=" + documentId + "&autvF=" + author, self ? "_self" : "_blank");
  },

  showDocumentContent: (
    content: string,
    documentId: string,
    readOnly = false,
    self = false,
    pointer = 0
  ): void => {
    let user = localStorage.getItem("loginUserDetails");
    let author = "";
    if (user) {
      let userJ = JSON.parse(user);
      author = utilService.sEncrypt(userJ.username + (readOnly ? "|true" : ""));
    }
    const message = JSON.stringify({
      message: "_showDocumentEditor",
      entity: {
        documentId: documentId,
        author: author,
        content: content,
        pointer: pointer,
      },
    });
    window.postMessage(message, "*");
    // window.open(configService.getConfigValue('docWebUrl') + "?keyXc=" + documentId + "&autvF=" + author, self ? "_self" : "_blank");
  },

  getDocumentUrl: (
    documentId: string,
    readOnly = false,
    self = false
  ): string => {
    let user = localStorage.getItem("loginUserDetails");
    let author = "";
    if (user) {
      let userJ = JSON.parse(user);
      author = utilService.sEncrypt(userJ.username + (readOnly ? "|true" : ""));
    }
    console.log(
      configService.getConfigValue("docWebUrl") +
        "?keyXc=" +
        documentId +
        "&autvF=" +
        author
    );
    return (
      configService.getConfigValue("docWebUrl") +
      "?keyXc=" +
      documentId +
      "&autvF=" +
      author
    );
  },
  showPathDocument: (
    documentPath: string,
    readOnly = false,
    self = false,
    id = "",
    forApproval = false,
    inputEntity = {}
  ): void => {
    let user = localStorage.getItem("loginUserDetails");
    let author = "";
    if (user) {
      let userJ = JSON.parse(user);
      author = utilService.sEncrypt(userJ.username + (readOnly ? "|true" : ""));
    }
    documentPath = utilService.sEncrypt(documentPath);
    const message = JSON.stringify({
      message: "_showDocumentEditor",
      entity: {
        documentPath: documentPath,
        author: author,
        docUrl:
          configService.getConfigValue("docWebUrl") +
          "?docp=" +
          documentPath +
          "&autvF=" +
          author,
        id: id,
        forApproval: forApproval,
        inputEntity: inputEntity,
      },
    });
    window.postMessage(message, "*");
    // window.open(configService.getConfigValue('docWebUrl') + "?docp=" + documentPath + "&autvF=" + author, self ? "_self" : "_blank");
  },
};
