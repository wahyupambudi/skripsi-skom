import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

const QrCodeScanner = () => {
  const [data, setData] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleScan = (result, error) => {
    if (result) {
      setData(result.text);
      setRedirect(true);
    } else if (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    if (redirect) {
      window.location.href = `/result?data=${data}`;
    }
  }, [data, redirect]);

  return (
    <div className="App">
    <h3>Silahkan Scan menggunakan Fitur ini</h3>
    <p style={{color:'red'}} >Harap aktifkan kamera</p>
      <QrReader 
        onResult={handleScan}
        videoId="video"
        scanDelay={500}
        style={{ width: "300px" }}
      />
      <div>
        {data && (
          <button onClick={() => setRedirect(true)}>
            Scan QR Code
          </button>
        )}
      </div>
    </div>
  );
};

export default QrCodeScanner;
