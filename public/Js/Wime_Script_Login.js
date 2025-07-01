document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Script cargado correctamente");

  const form = document.getElementById("form-login");
  if (!form) {
    console.error("❌ No se encontró el formulario con ID form-login.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    fetch("/Wime/Controllers/LoginController.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `email=${encodeURIComponent(email)}&contrasena=${encodeURIComponent(contrasena)}`
    })
      .then(response => response.json())
      .then(data => {
        console.log("📥 Respuesta del servidor:", data);

        if (data.success) {
          mostrarToast("✅ Inicio de sesión exitoso", true, true);
        } else {
          mostrarToast(data.message || "❌ Error desconocido", false);
        }
      })
      .catch(error => {
        console.error("❌ Error en la solicitud:", error);
        mostrarToast("❌ Error de conexión con el servidor", false);
      });
  });
});

function mostrarToast(mensaje, esExito = true, redirigir = false) {
  const toast = document.getElementById("mensaje-flotante");
  const texto = document.getElementById("texto-toast");

  texto.textContent = mensaje;
  toast.classList.remove("text-bg-success", "text-bg-danger", "d-none");
  toast.classList.add(esExito ? "text-bg-success" : "text-bg-danger");
  toast.classList.remove("d-none");

  setTimeout(() => {
    toast.classList.add("d-none");
    if (redirigir && esExito) {
      window.location.href = "/Wime/private/PhP/Wime_interfaz_Tablero.php";
    }
  }, 2500);
}

function ocultarToast() {
  document.getElementById("mensaje-flotante").classList.add("d-none");
}
