const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {

  e.preventDefault(); // stop page reload

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    message: formData.get("message")
  };

  try {

    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.text();

    alert(result);

    form.reset();

  } catch(err) {

    console.error(err);
    alert("Error sending data");
  }

});
