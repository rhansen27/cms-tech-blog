const form = document.querySelector("form");
const signupBtn = document.querySelector("#signup-btn");
const loginBtn = document.querySelector("#login-btn");

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(e.target.elements);
  const btn = e.target.elements["login-btn"];
  const { username, password } = e.target.elements;

  const userData = {
    username: username.value,
    password: password.value,
  };

  if (btn.innerHTML === "Login") {
    await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => {
      if (res.status === 200) {
        location.href = "/dashboard";
      }
    });
  } else if (btn.innerHTML === "Sign up") {
    await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => {
      console.log(res);
      if (res.status === 201) {
        location.href = "/dashboard";
      }
    });
  }
};

const changeLoginType = async (e) => {
  e.preventDefault();

  if (e.target.text === "Sign up instead") {
    loginBtn.innerHTML = "Sign up";
    e.target.innerHTML = "Login";
  } else if ((e.target.text = "Login")) {
    loginBtn.innerHTML = "Login";
    e.target.innerHTML = "Sign up instead";
  }
};

form.addEventListener("submit", handleSubmit);
signupBtn.addEventListener("click", changeLoginType);
