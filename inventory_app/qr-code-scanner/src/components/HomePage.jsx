import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div align="center" style= {{margin: '20px'}} >
    <h1>Aplikasi Scanner QrCode</h1>
    <button style={{padding: "10px", border:'0px solid', borderRadius : '10px', backgroundColor: '#EA2929', cursor:'pointer'}}>
      <NavLink to={"/scan"} style={{color:'white', textDecoration: 'none'}} >
          <span>Scan QR Code</span>
        </NavLink>
    </button>
    </div>
  );
}

export default HomePage;
