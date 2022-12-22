import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* A contact form */}
      <h1>Contact form</h1>
      <form netlify name="contact" method="POST">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <br />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
