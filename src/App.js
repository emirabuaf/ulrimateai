import React, { useState, useEffect } from "react";
import "./App.css";
import jsonData from "./intents.json";
import List from "./components/List";

function App() {
  return (
    <div className="app-container">
      <List jsonData={jsonData} />
    </div>
  );
}

export default App;
