import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createClient } from "urql";

// const APIURL = "https://gateway.thegraph.com/api/935f348f74174bcb4d310759b6770572/subgraphs/id/41LCrgtCNBQyDiVVyZEuPxbvkBH9BxxLU3nEZst77V8o"

const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";
const query = `
  query {
    pairs(first:5) {
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
  }
  
`;

const client = createClient({
  url: APIURL,
});

function App() {
  const [pairs, setPairs] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const response = await client.query(query).toPromise();
    console.log("response:", response);
    setPairs(response.data.pairs);
  }
  return (
    <div className="App">
      {pairs.map((pair, index) => (
        <div key={index}>
          <hr/>
          <div>{pair.token0.symbol}</div>
          <div>{pair.token1.symbol}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
