import React, { useState, useEffect, useCallback } from "react";
import * as firebase from "firebase";
import "firebase/storage";
import { useDropzone } from "react-dropzone";
import { app } from "src/base";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  GridList,
  GridListTile,
  Paper,
  GridListTileBar,
  CircularProgress,
} from "@material-ui/core";

type MyFile = File & {
  preview: string;
};

const acceptFile = "image/*";
const maxFileSize = 1048576;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "50em",
      display: "flex",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      "& > *": {
        margin: theme.spacing(3),
      },
    },
    dropzone: {
      width: "100%",
      height: 200,
      boxSizing: "border-box",
      borderWidth: 2,
      borderColor: "#666666",
      borderStyle: "dashed",
      borderRadius: 5,
      verticalAlign: "top",
      textAlign: "center",
    },
    thumbsContainer: {
      marginTop: 16,
    },
    gridList: {
      width: "100%",
      height: 450,
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    titleBar: {
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    upButton: {
      color: "secondary",
      margin: theme.spacing(3),
    },
    circular: {
      textAlign: "center",
    },
  })
);

const FileUpload = () => {
  const [files, setFiles] = useState<MyFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFile,
    minSize: 0,
    maxSize: maxFileSize,
  });

  const onUpload = async () => {
    setUploading(true);
    setProgress(0);

    function uploadImageAsPromise(file: MyFile) {
      const fileName = file.name;
      var storageRef = app
        .storage()
        .ref()
        .child("users/common/" + fileName);

      return new Promise(function (resolve, reject) {
        const task = storageRef.put(file);

        task.on(
          firebase.default.storage.TaskEvent.STATE_CHANGED,
          function progress(snapshot) {},
          function error(err) {
            reject(err);
          },
          function complete() {
            task.then((snapshot) => {
              resolve(snapshot.ref.getDownloadURL());
            });
          }
        );
      })
        .then((downloadURL) => {
          setProgress((oldProgress) => oldProgress + 1);
          return downloadURL;
        })
        .catch(() => {
          console.log("Error:uploadImageAsPromise");
        });
    }

    const result = await Promise.all(
      files.map((file) => {
        return uploadImageAsPromise(file);
      })
    );

    setUploading(false);
    setProgress(0);
    setFiles([]);

    alert("送信されました");
  };

  if (uploading) {
    const percent = Math.round((progress / files.length) * 100);
    return (
      <Grid container className={classes.root} spacing={3} justify="center">
        <Grid item xs={6}>
          <Paper variant="outlined" elevation={3} className={classes.paper}>
            <CircularProgress
              className={classes.circular}
              variant="determinate"
              value={percent}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
  const tileCols = 3;

  const thumbs = files.map((file, index) => (
    <GridListTile key={file.preview} rows={1}>
      <img src={file.preview} alt={file.name} />
      <GridListTileBar title={file.name} subtitle={file.size} />
    </GridListTile>
  ));

  const isDisabledButton = files.length === 0;

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={10}>
        <Paper variant="outlined" elevation={3} className={classes.paper}>
          <div>
            <Paper className={classes.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? <p>ファイルをドロップしてください</p> : <p></p>}
            </Paper>
            <Button
              className={classes.upButton}
              onClick={onUpload}
              variant="outlined"
              color="primary"
              disabled={isDisabledButton}
            >
              Upload
            </Button>
            <aside>
              <GridList cellHeight={200} cols={tileCols}>
                {thumbs}
              </GridList>
            </aside>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default FileUpload;
