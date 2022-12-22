# Use Javascript to submit forms on Netlify

### Tell Netlify to expect a form

This can only be dne with HTML. So, we are going to hard-code an "invisible" form into our HTML. This form will be invisible to the user, but will be used tell the Netlify "bots" that "Hey, this website has a form, so expect it."

In your HTML file, where you have your `<div id="root" />` tag, add the following code:

```html
<!-- Tell Netlify to expect this form. Users will not see this form; it has the "hidden" attribute. -->
<form name="contact" netlify netlify-honeypot="bot-field" hidden>
  <input name="name" />
  <input name="email" />
  <input name="message" />
  <textarea name="message"></textarea>
</form>
```

> Note: Any inputs that do not exist here will be stripped out of any form submissions by Netlify. So - make sure the fields you have in your react form also exist in this form.

### Use Javascript to submit the form

Use React normal to capture user input. Then use a submit handler to submit the form.

```js
function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  // create a URLParamObject
  const params = new URLSearchParams();
  params.append("name", name);
  params.append("email", email);
  params.append("message", message);
  params.append("form-name", "contact"); // the name of your form in Netlify
  const urlEncodedData = params.toString();

  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // important! we are not sending JSON, we are sending URL encoded data
    },
    body: urlEncodedData,
  })
    .then((response) => {
      if (response.ok) {
        setShowSuccess(true);
        setLoading(false);
      } else {
        setShowError(true);
        console.error("Form Submission Error:", error);
        setLoading(false);
      }
    })
    .catch((error) => {
      setShowError(true);
      console.error("Form Submission Error:", error);
      setLoading(false);
    });
}
```

### Look in /src/ folder for example.

You can clone this repo and launch it on your own netlify account to test it.
