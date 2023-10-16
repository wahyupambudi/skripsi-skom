import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

const App = () => {
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
      <QrReader
        onResult={handleScan}
        videoId="video"
        scanDelay={500}
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

export default App;
