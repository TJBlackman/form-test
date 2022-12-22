import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("Trevor");
  const [email, setEmail] = useState("email@email.com");
  const [message, setMessage] = useState(`Test message: ${Date.now()}`);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // create a URLParamObject
    const params = new URLSearchParams();
    params.append("name", encodeURIComponent(name));
    params.append("email", encodeURIComponent(email));
    params.append("message", encodeURIComponent(message));
    params.append("form-name", "contact"); // the name of your form in Netlify

    // url encode data
    const urlEncodedData = params.toString();
    console.log(
      `This is what url encoded data looks like: label1=value1&label2=value2&label3=value3`
    );
    console.log(`urlEncodedData: ${urlEncodedData}`);

    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // important! we are not sending JSON, we are sending URL encoded data
      },
      body: urlEncodedData,
    })
      .then((response) => response.json())
      .then((data) => {
        setShowSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        setShowError(true);
        console.error("Form Submission Error:", error);
        setLoading(false);
      });
  }

  // let success/error message show for 6 seconds, then reset form
  useEffect(() => {
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setShowSuccess(false);
      setShowError(false);
    }, 6000);
  }, [showError, showSuccess]);

  // if inputs are empty, disable submit button OR if loading
  const btnDisabled = !name || !email || !message || loading;

  // render an error
  if (showError) {
    return (
      <div>
        There was an error sending your message. Please try again later.
      </div>
    );
  }

  // render success message
  if (showSuccess) {
    return (
      <div>Thank you for your message. We will get back to you shortly.</div>
    );
  }

  // render form
  return (
    <div className="App">
      {/* A contact form */}
      <h1>Contact form</h1>
      <form onSubmit={handleSubmit}>
        <label>Namee</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          disabled={loading}
        />
        <br />
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          disabled={loading}
        />
        <br />
        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <br />
        <button type="submit" disabled={btnDisabled}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
