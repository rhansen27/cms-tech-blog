const form = document.querySelector("form");
const signupBtn = document.querySelector("#signup-btn");
const loginBtn = document.querySelector("#login-btn");

const handleSubmit = async (e) => {
  e.preventDefault();
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
        location.href("/dashboard");
      } else {
        alert("Failed to login");
      }
    });
  } else if (btn.innerHTML === "Signup") {
    await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => {
      if (res.status === 200) {
        location.href("/dashboard");
      } else {
        alert("Failed to signup");
      }
    });
  }
};

const changeLoginType = async (e) => {
  e.preventDefault();

  if (e.target.text === "Sign up instead") {
    loginBtn.innerHTML = "Signup";
    e.target.innerHTML = "Login";
  } else if (e.target.text === "Login") {
    loginBtn.innerHTML = "Login";
    e.target.innerHTML = "Signup";
  }
};

form.addEventListener("submit", handleSubmit);
signupBtn.addEventListener("click", changeLoginType);
