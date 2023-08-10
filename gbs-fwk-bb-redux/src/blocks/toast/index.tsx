import { useRef } from "react";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import { messageService } from "gbs-fwk-core";
import React from "react";

// toast
export const Toast: React.FC = () => {
  const toastInstance = useRef<ToastComponent>(null);

  messageService.getMessage().subscribe((message: any) => {
    if (message.key == "bb_toast") {
      toastInstance.current?.show({
        title: message.title,
        content: message.content,
        showProgressBar: message.showProgressBar === "true" ? true : false,
        position: message.position ? message.position : { X: 'Top', Y: "Right" },
        timeOut: message.timeOut,
      });   
      // Setting the color
      const toastHeader: any = document.getElementsByClassName("e-toast-title");
      const colorMap: any = {
        success: "green",
        warning: "orange",
        alert: "red",
      };

      for (let i = 0; i < toastHeader.length; i++) {
        toastHeader[i].style.color = colorMap[message.type];
      }

      const toastProgress: any =
        document.getElementsByClassName("e-toast-progress");
      for (let i = 0; i < toastProgress.length; i++) {
        toastProgress[i].style.backgroundColor = colorMap[message.type];
      }
    }
  });

  return (
    <div>
      <ToastComponent ref={toastInstance} type="toast" />
    </div>
  );
};
