import React, { useState } from "react";

function Student({ name, score }) {
  return <h2>{name} scored {score} points!</h2>;
}

function App() {
  const [marks, setMarks] = useState(0);

  return (
    <div>
      <Student name="Vardhan" score={marks} />
      <button onClick={() => setMarks(marks + 5)}>Increase Score</button>
    </div>
  );
}

export default App;
