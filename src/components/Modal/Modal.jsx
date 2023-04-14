import { createPortal } from "react-dom";
import { useEffect } from "react";

const Modal = ({ children, title, onClose }) => {
  // const modalRoot = document.getElementById("modal-root");
  // const body = document.querySelector("body");

  // const handleOverlay = (e) => {
  //   if (e.target === e.currentTarget) {
  //     onClose();
  //   }
  // };

  // useEffect(() => {
  //   const handleClose = (e) => {
  //     if (e.code === "Escape") {
  //       onClose();
  //     }
  //   };

  //   window.addEventListener("keydown", handleClose);
  //   body.style.overflow = "hidden";

  //   return () => {
  //     window.removeEventListener("keydown", handleClose);
  //     body.style.overflow = "auto";
  //   };
  // }, [onClose, body]);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
          {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Save changes
            </button>
          </div> */}
        </div>
      </div>
    </div>
    // modalRoot
  );
};

export default Modal;
