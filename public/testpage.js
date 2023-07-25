$(document).ready(() => {
  const getFields = () => ({
    email: $("#email").val(),
    fname: $("#fname").val(),
    lname: $("#lname").val(),
    password: $("#password").val(),
  });

  const clearFields = () => {
    $("#email").val("");
    $("#fname").val("");
    $("#lname").val("");
    $("#password").val("");
  };

  $("#register").click(async () => {
    const data = getFields();

    await fetch("/api/v1/user/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(console.log);

    clearFields();
  });

  $("#getData").click(async () => {
    await fetch("/api/v1/user/")
      .then((res) => res.json())
      .then(console.log);
  });

  $("#login").click(async () => {
    const data = getFields();

    await fetch("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(console.log);

    clearFields();
  });

  $("#logout").click(async () => {
    const res = await fetch("/api/v1/auth/logout");
  });
});
