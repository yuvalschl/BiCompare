// // import React, {useCallback} from 'react'
// // import {useDropzone} from 'react-dropzone'

// // function UploadFile() {
// //   const onDrop = useCallback(acceptedFiles => {
// //     // Do something with the files
// //   }, [])
// //   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

// //   return (
// //     <div {...getRootProps()}>
// //       <input {...getInputProps()} />
// //       {
// //         isDragActive ?
// //           <p>Drop the files here ...</p> :
// //           <p>Drag 'n' drop some files here, or click to select files</p>
// //       }
// //     </div>
// //   )
// // }

// // export default UploadFile


// import React,{Component} from 'react'; 
// class UploadFile extends Component { 

//     state = { 
  
//       // Initially, no file is selected 
//       selectedFile: null
//     }; 
     
//     // On file select (from the pop up) 
//     onFileChange = event => { 
//       // Update the state 
//       this.setState({ selectedFile: event.target.files[0] }); 
//     }; 
     
//     // On file upload (click the upload button) 
//     onFileUpload = () => { 
//       // Create an object of formData 
//       const formData = new FormData(); 
     
//       // Update the formData object 
//       formData.append( 
//         "myFile", 
//         this.state.selectedFile, 
//         this.state.selectedFile.name 
//       ); 
     
//       // Details of the uploaded file 
//       console.log(this.state.selectedFile); 
     
//       // Request made to the backend api 
//       // Send formData object 
//     }; 
     
//     // File content to be displayed after 
//     // file upload is complete 
//     fileData = () => { 
//       if (this.state.selectedFile) { 
          
//         return ( 
//           <div> 
//             <h2>File Details:</h2> 
//             <p>File Name: {this.state.selectedFile.name}</p> 
//             <p>File Type: {this.state.selectedFile.type}</p> 
//             <p> 
//               Last Modified:{" "} 
//               {this.state.selectedFile.lastModifiedDate.toDateString()} 
//             </p> 
//           </div> 
//         ); 
//       } else { 
//         return ( 
//           <div> 
//             <br /> 
//             <h4>Choose before Pressing the Upload button</h4> 
//           </div> 
//         ); 
//       } 
//     }; 
     
//     render() { 
//       return ( 
//         <div> 
//             <h1> 
//               GeeksforGeeks 
//             </h1> 
//             <h3> 
//               File Upload using React! 
//             </h3> 
//             <div> 
//                 <input type="file" onChange={this.onFileChange} /> 
//                 <button onClick={this.onFileUpload}> 
//                   Upload! 
//                 </button> 
//             </div> 
//           {this.fileData()} 
//         </div> 
//       ); 
//     } 
//   } 
  
//   export default UploadFile; 




import React from "react";
import { useForm } from "react-hook-form";

function UploadFile() {
  const { register, handleSubmit } = useForm() 

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
     <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('value_name') } type="file" name="picture" />
      <button>Submit</button>
    </form>
  );
}

export default UploadFile;