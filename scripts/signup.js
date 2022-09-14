window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.querySelector("form");
  const inputNombre = document.querySelector("#inputNombre");
  const inputApellido = document.querySelector("#inputApellido");
  const inputEmail = document.querySelector("#inputEmail");
  const inputPassword = document.querySelector("#inputPassword");
  const inputPasswordRepetida = document.querySelector(
    "#inputPasswordRepetida"
  );

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuarioNuevo = {
      firstName: inputNombre.value,
      lastName: inputApellido.value,
      email: normalizarEmail(inputEmail.value),
      password: inputPassword.value,
    };

    const mensajeError = compararContrasenias(
      inputPassword.value,
      inputPasswordRepetida.value
    );

    if (mensajeError == true) {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(usuarioNuevo),
      };
      console.log("Son iguales");
      realizarRegister(config);
    } else {
      console.log(mensajeError);
      alert(mensajeError);
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    const URL = "https://ctd-todo-api.herokuapp.com/v1/users";

    fetch(URL, settings)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        console.log(data);
        if (data) {
          alert("Usuario registrado correctamente");
          location.replace("/index.html");
        } else {
          alert(
            "El usuario ya se encuentra registrada o alguno de los datos esta incompleto"
          );
        }
      });
  }
});
