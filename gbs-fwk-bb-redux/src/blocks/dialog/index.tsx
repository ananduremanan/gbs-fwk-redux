import { DialogUtility } from "@syncfusion/ej2-react-popups";
import { messageService } from "gbs-fwk-core";
import React from "react";

export const Dialog: React.FC = () => {
  let dialogueInstance: any;
  let callbackUrl: string;
  let keyData: any;

  // confirm actions
  const confirmOkAction = () => {
    messageService.sendMessage({ key: callbackUrl, status: "action1", keyData: keyData });
    dialogueInstance.hide();
  };

  const confirmCancelAction = () => {
    messageService.sendMessage({ key: callbackUrl, status: "action2" });
    dialogueInstance.hide();
  };

  // alert action
  const alertOkAction = () => {
    messageService.sendMessage({ key: "bb_dialog_res", status: "clicked", keyData: keyData });
    dialogueInstance.hide();
  };

  messageService.getMessage().subscribe((message: any) => {
    if (message.key === "dialog_alert") {
      callbackUrl = message.callbackUrl;
      keyData = message.keyData;
      message.type === "confirm"
        ? (dialogueInstance = DialogUtility.confirm({
            title: message.title,
            content: message.content,
            width: message.width,
            position: message.position,
            okButton: {
              ...message.okButton,
              click: confirmOkAction.bind(this),
            },
            cancelButton: {
              ...message.cancelButton,
              click: confirmCancelAction.bind(this),
            },
          }))
        : (dialogueInstance = DialogUtility.alert({
            title: message.title,
            content: message.content,
            width: message.width,
            position: message.position,
            okButton: { ...message.okButton, click: alertOkAction.bind(this) },
          }));
    }
  });
  
  return <div id="dialog-target"></div>;
};