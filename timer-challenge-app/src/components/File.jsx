import React from 'react';

function File() {
    const getFile = React.useRef();
    const handleClick = () =>{
        getFile.current.click();
    }
  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        <input ref={getFile} data-testid="file-picker" type="file" accept="image/*" />
        <button onClick={handleClick}>Pick Image</button>
      </p>
    </div>
  );
}

export default File;
