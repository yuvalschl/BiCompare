import React, {useMemo, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  minHeight: '150px',
  cursor:'pointer'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function MyDropZone({setFile, setFileName, setIsFileValid}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone();

  useEffect(() => {
     handleFiles(acceptedFiles)
  }, [acceptedFiles])

  const handleFiles = (files) => {
      if(files[0] != undefined){
        if (files[0].path.includes('.csv')){
        setIsFileValid(true)
        var reader = new FileReader();
        setFileName(files[0].path)
        reader.onload = function(e) {
                // Use reader.result
          setFile(reader.result)
        }
      reader.readAsText(files[0]);
     }
     else{
         setFileName('*File must be .csv type!')
         setIsFileValid(false)
     }
    }
  }

  const validateFileType = (fileName) =>{
    return fileName.includes('.csv')
  }


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

    const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
    
  ));


  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop .csv file here, or click to select a file</p>
      </div>
    </div>
  );
}