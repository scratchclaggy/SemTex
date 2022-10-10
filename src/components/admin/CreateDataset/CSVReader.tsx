import { useCSVReader } from "react-papaparse";
import React from "react";

const CSVReader = () => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={(results:any) => {

  const res= results.data.map((row:any)=>{return{id: row[0],body: row[1]}} );
  console.log(res);
  

    }}>
      {({
        getRootProps,
        acceptedFile,
        getRemoveFileProps,
        ProgressBar
      }: any) => (
        <>
          <div>
            <button type="button" {...getRootProps()}>
              Browse file
            </button>
            <div>{acceptedFile && acceptedFile.name}</div>
            <button {...getRemoveFileProps()}>Remove</button>
          </div>
          <div>
          </div>
          <ProgressBar style={{backgroundColor: 'red'}}/>
        </>
      )}
    </CSVReader>
  );
};
export default {CSVReader,res};
