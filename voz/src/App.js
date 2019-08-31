import React, { useState } from 'react';
import Search from "./components/Search";
import ListSearch from "./components/ListSearch";

function App() {

  const [items, setItems] = useState({items: [], source: ""});

  return (
    <>
      <div className="container mt-3">
        <Search setItems={setItems} />
        <ListSearch items={items} />
      </div>
    </>
  );
}

export default App;
