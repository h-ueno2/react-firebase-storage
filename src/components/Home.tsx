import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "@material-ui/core";
import { app } from "src/base";
import CustomModal from "src/components/CustomModal";
import FileUpload from "src/components/FileUpload";

Modal.setAppElement("#root");

const Home = () => {
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
      <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <FileUpload />
      </CustomModal>
    </div>
  );
};

export default Home;
