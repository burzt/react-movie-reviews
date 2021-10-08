import { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

const MovieTable = () => {
  const [data, setData] = useState("");

  // Using axios to fetch data from the API
  const fetchData = useCallback(async () => {
    axios.get("http://localhost:4000").then((res) => {
      setData(res.data);
    });
  }, []);

  // Using useEffect to update UI when data changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {/* <th>Updoots</th> */}
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.exampleMessage}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default MovieTable;
