import React, { useEffect, createRef } from 'react';
import { Axes, ClippingComponent, Grid, Viewer } from 'web-ifc-viewer';
import Dropzone from 'react-dropzone';
import './App.css';

//Icons
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import CropIcon from '@material-ui/icons/Crop';
import { IconButton} from '@material-ui/core';


const App =  () => {
    
    let axes;
    let grid;
    let clipping;
    let viewer;

    const dropzoneRef = createRef();

    useEffect(()=>{
        const container = document.getElementById("viewer-container");
        viewer = new Viewer(container);
        viewer.ifcLoader.setWasmPath("../../");

        grid = new Grid(viewer, 100,100);
        axes = new Axes(viewer);
        clipping = new ClippingComponent(viewer);

    },[])

    const onDrop = (files) => {
        viewer.loadIfc(files[0]);
    };

    const handleToggleClipping = () => {
        clipping.active = !clipping.active;
    }

    const handleClickOpen = () => {
        dropzoneRef.current.open()
    }

        return (
          <div style={{ display: "flex", flexDirection: "row", height: "100vh"}}>
              <aside style={{ width: 50 }}>
                  <IconButton onClick={handleClickOpen}>
                      <FolderOpenIcon />
                  </IconButton>
                  <IconButton onClick={handleToggleClipping}>
                      <CropIcon />
                  </IconButton>
              </aside>
              <Dropzone ref={dropzoneRef} onDrop={onDrop}>
                  {({getRootProps, getInputProps}) => (
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                    </div>
                  )}
              </Dropzone>
              <div style={{ flex: "1 1 auto", border: "solid red 1px", minWidth: 0}}>
                  <div id="viewer-container" style={{ position: 'relative', height: "100%", width: "100%"}} />
              </div>
          </div>
        );
    }


export default App;
