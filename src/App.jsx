import Body from "./Components/Body";
import './App.css'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Body />
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}
