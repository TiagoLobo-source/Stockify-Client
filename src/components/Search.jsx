import React, { useState } from 'react';

function Search(props) {
 // const [query, setQuery] = useState('');

  return (
    <div style={{ backgroundColor: "#F7ECE7", padding: "40px" }}>
      <label htmlFor="">Search</label>

      <input
        value={props.query}
        type="text"
        placeholder="Enter Search Query"
        onChange={(e) => {
          //props.searchHandler(e.target.value);
          props.setQuery(e.target.value);
        }}
      />
    </div>
  );
}

export default Search;