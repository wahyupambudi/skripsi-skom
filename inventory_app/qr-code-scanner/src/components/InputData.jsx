import React, { useState, useEffect } from "react";

const Result = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    if (window.location.search.includes("data")) {
      const data = new URLSearchParams(window.location.search).get("data");
      setData(data);
    }
  }, []);

  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [alamat, setAlamat] = useState("");

  const handleChangeNama = (e) => {
    setNama(e.target.value);
  };

  const handleChangeKelas = (e) => {
    setKelas(e.target.value);
  };

  const handleChangeAlamat = (e) => {
    setAlamat(e.target.value);
  };

  return (
    <div className="Result" align="center">
      <h1>Data QRCode</h1>
      <input style={{width: "370px"}}
        type="text"
        placeholder="Nama"
        value={data.split("|")[0]}
        onChange={handleChangeNama}
      /> <br/> <br/>
      <input style={{width: "370px"}}
        type="text"
        placeholder="Kelas"
        value={data.split("|")[1]}
        onChange={handleChangeKelas}
      /> <br/> <br/>
      <input style={{width: "370px"}}
        type="text"
        placeholder="Alamat"
        value={data.split("|")[2]}
        onChange={handleChangeAlamat}
      /> <br/> <br/>
      <input 
      type="submit"
      value="Simpan Data"
      />
      <p>Data QRCode: {data}</p>
    </div>
  );
};

export default Result;
