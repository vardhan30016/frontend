import React from "react";

function Student(props) {
  return <h2>Hello, {props.name}!</h2>;
}

function App() {
  return (
    <div>
      <Student name="Naidu" />
      <Student name="Vardhan" />
    </div>
  );
}

export default App;
