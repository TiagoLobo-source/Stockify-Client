import React, { useState } from 'react';

function Search(props) {
  const [query, setQuery] = useState('');

  return (
    <div className='mt-4'>
      <label htmlFor="">Search</label>

      <input
        value={query}
        type="text"
        placeholder="Enter Search Query"
        onChange={(e) => {
          props.searchHandler(e.target.value);
          setQuery(e.target.value);
        }}
      />
    </div>
  );
}

export default Search;