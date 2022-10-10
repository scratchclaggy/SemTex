import Papa from "papaparse";
import { useCSVReader } from "react-papaparse";

const OnUpload = (event: any) => {
  // Passing file data (event.target.files[0]) to parse using Papa.parse
  Papa.parse(event.target.files[0], {
    header: false,
    skipEmptyLines: true,
    dynamicTyping: false,
    complete: function (results, file) {
     const res= results.data.map((row:any)=>{return{id: row[0],body: row[1]}} );

    },
  });
};

const CSVReader = () => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={(results: "text/CSV") => {

  const res= results.data.map((row:any)=>{return{id: row[0],body: row[1]}} );
      
    }}>
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          {/* <div>
            <button type="button" {...getRootProps()}>
              Browse file
            </button>
            <div>{acceptedFile && acceptedFile.name}</div>
            <button {...getRemoveFileProps()}>Remove</button>
          </div> */}
          <div>
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={OnUpload}
              style={{ display: "block", margin: "10px auto" }}
            />
            <button {...getRemoveFileProps()}>Remove</button>
          </div>
          <ProgressBar />
        </>
      )}
    </CSVReader>
  );
};
export default CSVReader;
