import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "simple-datatables";

import "./UserDataTable.css";
import "simple-datatables/dist/style.css";

const UserDataTable = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // fetch("http://localhost:8000/get_all_users")
    fetch("https://travel-app-server-1.onrender.com/get_all_users")
      .then((response) => response.json())
      .then((data) => {
        console.log(1177, { data });

        if (data.users.length > 0) {
          console.log(1177, Object.keys(data.users[0]));
          console.log(
            1177,
            data.users.map((item) => Object.values(item))
          );
          setColumns(Object.keys(data.users[0])); // Set table headers dynamically
          setData(data.users.map((item) => Object.values(item))); // Convert objects to arrays
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Is the backend server running?");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (tableRef.current && data.length > 0) {
      const dataTable = new DataTable(tableRef.current, {
        searchable: true,
        fixedHeight: true,
        perPage: 5,
      });

      return () => {
        dataTable.destroy();
      };
    }
  }, [data.length]);

  if (loading) {
    return <div className="text-center p-10">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="table-container overflow-auto">
      <table ref={tableRef}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;
