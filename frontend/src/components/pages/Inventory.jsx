import React from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode} from "jwt-decode";

const Inventory = ({PageHeader, Link}) => {
  const navigate =useNavigate();
    const [currentUser] = useState(()=>{
      const jwtToken = Cookies.get("jwt-authorization");
      if (!jwtToken)
      {
          return "";
      }
      try{
          const decodedToken = jwtDecode(jwtToken);
          return decodedToken.name;
      }catch{
          return "";
      }
    });
    useEffect(()=>{
      if (!currentUser)
      {
          navigate("/unauthorized");
      }
    })
    const exportTable = () => {
      const table = document.getElementById('stockTable');
      if (!table) {
        return;
      }
      const tableHTML = table.outerHTML.replace(/ /g, '%20');
      const dataType = 'application/vnd.ms.excel';
      
      const fileName = `${new Date().toLocaleDateString()}-StockList.xls`;

      const downloadFile = document.createElement('a');

      if (navigator.msSaveOrOpenBlob) {
        const blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
        });
      } else {
        downloadFile.href = `data:${dataType}, ${tableHTML}`;
        downloadFile.download = fileName;
        downloadFile.click();
      }
    }

  return (
    <div className="container">
      <PageHeader Link={Link} />
      <title>Inventory</title>
      <h1>Inventory</h1>
      <p>Page for listing current inventory totals and adjustments</p>
      <button className="exportBtn" onClick={exportTable}>Export data to Excel</button>
      <table id="stockTable">
        <thead>
          <th>Item</th>
          <th>Category</th>
          <th>Count</th>
        </thead>
        <tbody>
          <tr>
            <td>Soup</td> 
            <td>Canned Goods</td> 
            <td>23</td>
          </tr>
          <tr>
            <td>Pasta</td>
            <td>Dry Goods</td>
            <td>11</td>
          </tr>
          <tr>
            <td>Macaroni</td>
            <td>Dry Goods</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Inventory