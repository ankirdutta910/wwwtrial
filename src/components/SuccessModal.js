import React from "react";

function SuccessModal(props) {
  const { isOpen, onClose } = props;

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div
        id="modalcontent"
        className="modal-content"
        style={{ textAlign: "center" }}
      >
        <h2>
          <img
            style={{ width: "100px" }}
            src="https://img.freepik.com/premium-vector/green-check-mark-icon-symbol-logo-circle-tick-symbol-green-color-vector-illustration_685751-503.jpg"
          />
        </h2>
        <h1 style={{ color: "#00bf03", fontWeight: "bolder" }}>Success!</h1>

        <h2 style={{ textAlign: "center", marginTop: "-2px" }}> </h2>
      </div>
    </div>
  );
}

export default SuccessModal;
