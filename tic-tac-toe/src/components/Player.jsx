import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const checkEditing = () => {
    setIsEditing((editing) => !editing); // Best practice
    if (isEditing){
    onChangeName(symbol, playerName); // Call the function to update player name
    }
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter Name"
            value={playerName}
          ></input>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => checkEditing()}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
