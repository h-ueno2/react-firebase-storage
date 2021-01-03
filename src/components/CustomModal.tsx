import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

type CustomModalProps = {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
};

const CustomModal: React.FC<CustomModalProps> = (props) => {
  const ModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: 0,
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        style={ModalStyles}
      >
        {props.children}
      </Modal>
    </>
  );
};

export default CustomModal;
