"use client";

import { useDropzone } from "react-dropzone";
import Papa from "papaparse";

export default function UploadBox({
  file,
  setFile,
  setPreviewData,
}) {

  const onDrop = (acceptedFiles) => {

    const selectedFile = acceptedFiles[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {

        console.log(results.data);

        setPreviewData(results.data);

      },

      error: (err) => {

        console.error(err);

        alert("Unable to parse CSV.");

      },
    });
  };

  const { getRootProps, getInputProps } = useDropzone({

    onDrop,

    accept: {
      "text/csv": [".csv"],
    },

    multiple: false,

  });

  return (

    <div
      {...getRootProps()}
      className="border-2 border-dashed border-blue-400 rounded-xl bg-white p-12 text-center cursor-pointer hover:border-blue-600 transition"
    >

      <input {...getInputProps()} />

      <h2 className="text-2xl font-semibold">

        Upload CSV

      </h2>

      <p className="text-gray-500 mt-2">

        Drag & Drop CSV here or click to browse.

      </p>

      {file && (

        <div className="mt-5 text-green-600 font-semibold">

          Selected File: {file.name}

        </div>

      )}

    </div>

  );
}