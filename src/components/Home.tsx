import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "@material-ui/core";
import { app } from "src/base";
import FileUpload from "src/components/FileUpload";

Modal.setAppElement("#root");

const Home = () => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Home Page</h2>
      <Button variant="outlined" onClick={handleOpenModal}>
        Upload
      </Button>
      <Button variant="outlined" onClick={() => app.auth().signOut()}>
        Sign out
      </Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={ModalStyles}
      >
        <FileUpload />
      </Modal>
    </div>
  );
};

export default Home;
