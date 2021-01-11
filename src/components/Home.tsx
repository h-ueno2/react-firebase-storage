import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as firebase from "firebase";
import "firebase/storage";
import { Button, GridList, GridListTile } from "@material-ui/core";
import { app } from "src/base";
import CustomModal from "src/components/CustomModal";
import FileUpload from "src/components/FileUpload";

Modal.setAppElement("#root");

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchImages = async () => {
    const storageRef = app.storage().ref().child("users/common/");
    await storageRef.list().then((res) => {
      let urls: string[] = [];
      // res.items.forEach((itemRef) => {
      //   itemRef.getDownloadURL().then((url: string) => {
      //     urls.push(url);
      //     console.log(url);
      //   });
      // });
      setFileUrls(urls);
    });
  };
  useEffect(() => {
    fetchImages();
  });

  const thumbs = fileUrls.map((url, index) => {
    <GridListTile key={index} rows={1}>
      <img src={url} />
    </GridListTile>;
  });

  return (
    <div>
      <h2>Home Page</h2>
      <div>
        <GridList cellHeight={200}>{thumbs}</GridList>
      </div>
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
