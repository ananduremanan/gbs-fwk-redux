import { updateSampleSection } from "./sample-base";
import { PropertyPane } from "./property-pane";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import {
  createSpinner,
  showSpinner,
  hideSpinner,
} from "@syncfusion/ej2-react-popups";
import {
  detach,
  Browser,
  createElement,
  isNullOrUndefined,
  EventHandler,
} from "@syncfusion/ej2-base";

import { useEffect, useRef } from "react";
const ImageUploader = () => {
  useEffect(() => {
    updateSampleSection();
    renderComplete();
  }, []);
  // Uploader component
  let uploadObj: React.MutableRefObject<UploaderComponent | null> =
    useRef(null);
  let filesDetails: any = [];
  let dropElement: any;
  let filesList: any = [];
  let filesName: any = [];
  let parentElement;
  let asyncSettings;
  let allowedExtensions;
  let dropContainerEle: any = null;
  let dropAreaEle: any = null;
  let dropImageEle: any = null;
  let buttonEle: any;
  let clearEle: any;
  let dropArea: any;
  let dropContainerRef = (element: any) => {
    dropContainerEle = element;
  };
  let dropAreaRef = (element: any) => {
    dropAreaEle = element;
  };
  let dropImageRef = (element: any) => {
    dropImageEle = element;
  };
  let buttonRef = (element: any) => {
    buttonEle = element;
  };
  let clearRef = (element: any) => {
    clearEle = element;
  };
  // asyncSettings = {
  //   saveUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Save",
  //   removeUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Remove",
  // };
  allowedExtensions = ".jpg,.png,.jpeg";
  const renderComplete = () => {
    dropArea = dropAreaEle;
    dropElement = dropContainerEle;
    if (Browser.isDevice) {
      dropImageEle.style.padding = "0px 10%";
    }
    uploadObj.current?.element.setAttribute("name", "UploadFiles");
    dropAreaEle.children[0].children[0].onclick = () => {
      dropAreaEle.children[1].children[0].querySelector("button").click();
      return false;
    };
    clearEle.onclick = () => {
      if (!dropElement.querySelector("ul")) {
        return;
      }
      detach(dropElement.querySelector("ul"));
      filesList = [];
      filesDetails = [];
      filesName = [];
      if (dropArea.classList.contains("e-spinner-pane")) {
        hideSpinner(dropArea);
        detach(dropElement.querySelector(".e-spinner-pane"));
      }
    };
    buttonEle.onclick = () => {
      if (dropElement.querySelector("ul") && filesDetails.length > 0) {
        uploadObj.current?.upload(filesDetails, true);
      }
    };
    if (uploadObj.current) {
      uploadObj.current.dropArea = dropElement;
    }
    uploadObj.current?.dataBind();
  };
  const onSelect = (args: any) => {
    if (!dropElement.querySelector("li")) {
      filesDetails = [];
    }
    if (isNullOrUndefined(dropArea.querySelector(".e-upload-files"))) {
      parentElement = createElement("ul", { className: "e-upload-files" });
      dropAreaEle.children[1].appendChild(parentElement);
    }
    let validFiles = validateFiles(args, filesDetails);
    if (validFiles.length === 0) {
      args.cancel = true;
      return;
    }
    for (let i = 0; i < validFiles.length; i++) {
      formSelectedData(validFiles[i], this);
    }
    filesDetails = filesDetails.concat(validFiles);
    args.cancel = true;
  };
  const validateFiles = (args: any, viewedFiles: any) => {
    let modifiedFiles = [];
    let validFiles = [];
    let isModified = false;
    if (args.event.type === "drop") {
      isModified = true;
      let allImages = ["png", "jpg", "jpeg"];
      let files = args.filesData;
      for (let file of files) {
        if (allImages.indexOf(file.type) !== -1) {
          modifiedFiles.push(file);
        }
      }
    }
    let files =
      modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
    if (filesName.length > 0) {
      for (let file of files) {
        if (filesName.indexOf(file.name) === -1) {
          filesName.push(file.name);
          validFiles.push(file);
        }
      }
    } else {
      for (let file of files) {
        filesName.push(file.name);
        validFiles.push(file);
      }
    }
    return validFiles;
  };
  const formSelectedData = (file: any, proxy: any) => {
    let liEle = createElement("li", {
      className: "e-upload-file-list",
      attrs: { "data-file-name": file.name },
    });
    let imageTag = createElement("IMG", {
      className: "upload-image",
      attrs: { alt: "Image" },
    });
    let wrapper = createElement("span", { className: "wrapper" });
    wrapper.appendChild(imageTag);
    liEle.appendChild(wrapper);
    liEle.appendChild(
      createElement("div", {
        className: "file-name",
        innerHTML: file.name,
        attrs: { title: file.name },
      })
    );
    liEle.appendChild(
      createElement("div", {
        className: "file-size",
        innerHTML: uploadObj.current?.bytesToSize(file.size),
      })
    );
    let clearbtn;
    let uploadbtn;
    clearbtn = createElement("span", {
      id: "removeIcon",
      className: "e-icons e-file-remove-btn",
      attrs: { title: "Remove" },
    });
    EventHandler.add(clearbtn, "click", removeFiles, proxy);
    liEle.setAttribute("title", "Ready to Upload");
    uploadbtn = createElement("span", {
      className: "e-upload-icon e-icons e-file-remove-btn",
      attrs: { title: "Upload" },
    });
    uploadbtn.setAttribute("id", "iconUpload");
    EventHandler.add(uploadbtn, "click", uploadFile, proxy);
    let progressbarContainer;
    progressbarContainer = createElement("progress", {
      className: "progressbar",
      id: "progressBar",
      attrs: { value: "0", max: "100" },
    });
    liEle.appendChild(clearbtn);
    liEle.appendChild(uploadbtn);
    liEle.appendChild(progressbarContainer);
    readURL(liEle, file);
    dropAreaEle.children[1].children[1].appendChild(liEle);
    filesList.push(liEle);
  };
  const uploadFile = (args: any) => {
    uploadObj.current?.upload(
      [filesDetails[filesList.indexOf(args.currentTarget.parentElement)]],
      true
    );
  };
  const removeFiles = (args: any) => {
    let removeFile =
      filesDetails[filesList.indexOf(args.currentTarget.parentElement)];
    let statusCode = removeFile.statusCode;
    if (statusCode === "2" || statusCode === "1") {
      uploadObj.current?.remove(removeFile, true);
      if (uploadObj.current) {
        uploadObj.current.element.value = "";
      }
    }
    let index = filesList.indexOf(args.currentTarget.parentElement);
    filesList.splice(index, 1);
    filesDetails.splice(index, 1);
    filesName.splice(filesName.indexOf(removeFile.name), 1);
    if (statusCode !== "2") {
      detach(args.currentTarget.parentElement);
    }
  };
  const onFileUpload = (args: any) => {
    let li = dropArea.querySelector(
      '[data-file-name="' + args.file.name + '"]'
    );
    let iconEle = li.querySelector("#iconUpload");
    iconEle.style.cursor = "not-allowed";
    iconEle.classList.add("e-uploaded");
    EventHandler.remove(li.querySelector("#iconUpload"), "click", uploadFile);
    let progressValue = Math.round((args.e.loaded / args.e.total) * 100);
    if (!isNaN(progressValue) && li.querySelector(".progressbar")) {
      li.getElementsByTagName("progress")[0].value = progressValue;
    }
  };
  const onUploadSuccess = (args: any) => {
    let spinnerElement = dropAreaEle;
    let li = dropArea.querySelector(
      '[data-file-name="' + args.file.name + '"]'
    );
    if (li && !isNullOrUndefined(li.querySelector(".progressbar"))) {
      li.querySelector(".progressbar").style.visibility = "hidden";
    }
    if (args.operation === "upload") {
      EventHandler.remove(li.querySelector("#iconUpload"), "click", uploadFile);
      li.querySelector(".file-name").style.color = "green";
      li.querySelector(".e-icons").onclick = () => {
        generateSpinner(dropArea);
      };
    } else {
      detach(li);
      hideSpinner(spinnerElement);
      detach(spinnerElement.querySelector(".e-spinner-pane"));
    }
    if (!isNullOrUndefined(li)) {
      li.setAttribute("title", args.e.currentTarget.statusText);
    }
  };
  const generateSpinner = (targetElement: any) => {
    createSpinner({ target: targetElement, width: "25px" });
    showSpinner(targetElement);
  };
  const onUploadFailed = (args: any) => {
    let li = dropArea.querySelector(
      '[data-file-name="' + args.file.name + '"]'
    );
    li.querySelector(".file-name").style.color = "red";
    li.setAttribute("title", args.e.currentTarget.statusText);
    if (args.operation === "upload") {
      EventHandler.remove(li.querySelector("#iconUpload"), "click", uploadFile);
      li.querySelector(".progressbar").style.visibility = "hidden";
    }
  };
  const readURL = (li: any, args: any) => {
    let preview = li.querySelector(".upload-image");
    let file = args.rawFile;
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        preview.src = reader.result;
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const onRemoveFile = (args: any) => {
    args.postRawFile = false;
  };
  return (
    <div
      className="control-pane"
      ref={dropContainerRef}
      style={{ marginTop: "4rem" }}
    >
      <div className="control-section" id="uploadpreview">
        <div className="col-lg-9">
          <div className="imagepreview">
            <div id="dropArea" ref={dropAreaRef} className="dropTarget">
              <span
                id="dropimage"
                ref={dropImageRef}
                className="file-name-drop"
              >
                {" "}
                Drop image (JPG, PNG) files here or{" "}
                <a href="" id="browse">
                  <u>Browse</u>
                </a>{" "}
              </span>
              <UploaderComponent
                id="previewfileupload"
                type="file"
                ref={uploadObj}
                asyncSettings={asyncSettings}
                success={onUploadSuccess.bind(this)}
                selected={onSelect.bind(this)}
                removing={onRemoveFile.bind(this)}
                progress={onFileUpload.bind(this)}
                failure={onUploadFailed.bind(this)}
                allowedExtensions={allowedExtensions}
              ></UploaderComponent>
            </div>
          </div>
        </div>
        <div className="property-section uploader-panel col-lg-3">
          <PropertyPane title="Properties">
            <div className="panel-style">
              <button
                className="e-btn e-css"
                id="clearbtn"
                ref={clearRef}
                title="Clear All"
              >
                Clear All
              </button>
            </div>
            <div className="panel-style">
              <button
                className="e-btn e-css"
                id="uploadbtn"
                ref={buttonRef}
                title="Upload All"
              >
                Upload All
              </button>
            </div>
          </PropertyPane>
        </div>
      </div>
    </div>
  );
};
export default ImageUploader;
