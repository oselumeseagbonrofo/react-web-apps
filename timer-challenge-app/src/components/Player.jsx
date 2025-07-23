import { useState, useRef } from "react";

export default function Player() {
  const [name, setName] = useState(null);

  // useRef
  const nameRef = useRef();

  function handleClick() {
    setName(nameRef.current.value); // Access the input value using the ref variable
    nameRef.current.value = ""; // Clear the input field after setting the name
  }

  return (
    <section id="player">
      <h2>Welcome {name ?? "unknown entity"}</h2>
      <p>
        <input ref={nameRef} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
