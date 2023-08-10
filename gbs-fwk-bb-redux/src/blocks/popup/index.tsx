import React, { ChangeEvent } from "react";
interface PopupProps  {
  className?: string;
  children?: any;
  title?: string;
  iconClass?: string;
  show?: boolean;
  onClose?: (event: any) => void;
};

export const Popup: React.FC<PopupProps> = ({
  className = "",
  children,
  title = "",
  iconClass = "",
  show = false,
  onClose,
}) => {
  return (
    <>
      {show && (
        <div id="results" className={"search-results " + className}>
          <div className="popup">
            <div className="popup-layout">
              <div className="popup-header">
                <div className="popHeadWrap">
                  <div className="IconWrap">
                    {iconClass && <i className={iconClass}></i>}
                  </div>
                  <div className="popup-header-caption">{title}</div>
                </div>
                <div className="popup-header-close">
                  <i className="bi bi-x-lg" onClick={onClose}></i>
                </div>
              </div>
              <div className="popup-body">
                <div className="popup-form-inner-layout row">
                  <>{children}</>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
