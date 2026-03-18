async function login(){

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email: email,
      password: password
    })
  });

  const data = await res.json();

  console.log(data); // helps debugging

  if(data.token){

    localStorage.setItem("token",data.token);

    window.location.href = "dashboard.html";

  }else{

    alert("Login failed");

  }

}