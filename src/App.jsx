import { useState, useEffect } from "react";
import "./App.css";

const dataList = ["Apple", "Banana", "BlueBerry", "Strawberry", "Watermelon"];

// Simulate async data fetching
const fetchData = async () => {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataList);
    }, 500);
  });
  return response;
};

function App() {
  const [input, setInput] = useState("");
  const [allItems, setAllItems] = useState([]); // original list
  const [suggestions, setSuggestions] = useState([]); // filtered list

  useEffect(() => {
    const fetchItems = async () => {
      const data = await fetchData();
      setAllItems(data);
      setSuggestions(data); // show all by default
    };
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === "") {
      setSuggestions(allItems); // reset if input is empty
    } else {
      const filtered = allItems.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h1>Autocomplete Search</h1>
      <input
        type="text"
        value={input}
        placeholder="Search..."
        onChange={handleChange}
        style={{ padding: "8px", width: "100%", fontSize: "16px" }}
      />
      <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
        {suggestions.map((item, index) => (
          <li
            key={index}
            style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
