import {
  inputEmail,
  inputCC,
  inputMatter,
  inputMessage,
  form,
  resetBtn,
  submitBtn,
} from "./document.js";

// Email Object
const email = {
  email: "",
  asunto: "",
  mensaje: "",
};

export function listeners() {
  // Assign events
  inputEmail.addEventListener("blur", validate);
  inputMatter.addEventListener("blur", validate);
  inputMessage.addEventListener("blur", validate);
  inputCC.addEventListener("blur", validate);
  resetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    resetForm();
  });
  form.addEventListener("submit", sendEmail);
}

export function sendEmail(e) {
  e.preventDefault();

  spinner.classList.add("flex");
  spinner.classList.remove("opacity-0");

  setTimeout(() => {
    spinner.classList.add("opacity-0");
    spinner.classList.remove("flex");
    resetForm();
    alert("El email fue enviado correctamente.", "success", form);

    setTimeout(() => {
      form.lastChild.remove();
    }, 3000);
  }, 3000);
}

// Validate Form
export function validate(event) {
  const reference = event.target.parentElement;
  if (event.target.id !== "cc" && event.target.value === "") {
    alert(`El campo ${event.target.id} es obligatorio.`, "error", reference);
    email[event.target.name] = "";
    checkEmailForSubmit();
    return;
  }

  if (
    event.target.id === "cc" &&
    event.target.value.length >= 1 &&
    !validateEmail(event.target.value)
  ) {
    console.log("CC");
    alert(`El email ${event.target.value} no es valido.`, "error", reference);
    email[event.target.name] = "";
    checkEmailForSubmit();
    return;
  } else if (event.target.id === "cc" && event.target.value.length === 0) {
    delete email["cc"];
  } else {
    email[event.target.name] = event.target.value.trim().toLowerCase();
  }

  if (event.target.id === "email" && !validateEmail(event.target.value)) {
    alert(`El email ${event.target.value} no es valido.`, "error", reference);
    email[event.target.name] = "";
    checkEmailForSubmit();
    return;
  }
  clearAlert(reference);
  // Assign values
  if (event.target.id !== "cc") {
    email[event.target.name] = event.target.value.trim().toLowerCase();
  }
  // Check email object
  checkEmailForSubmit();
}

// Alerts
export function alert(message, type, reference) {
  // Check if already there are an alert and then delete it
  clearAlert(reference);

  const alertElement = document.createElement("P");
  if (type === "error") {
    alertElement.classList.add(
      "text-2xl",
      "rounded-lg",
      "p-2",
      "bg-red-600",
      "text-center",
      "text-white",
    );
  } else {
    alertElement.classList.add(
      "justify-center",
      "bg-green-500",
      "rounded-lg",
      "p-2",
      "flex",
      "text-white",
      "text-sm",
      "uppercase",
      "mt-10",
      "font-bold",
    );
  }
  alertElement.textContent = message;
  reference.appendChild(alertElement);
}
export function clearAlert(reference) {
  // Checking if already there are an alert
  const alert = reference.querySelector(".bg-red-600");
  if (alert) {
    alert.remove();
  }
}

// Validation Email
export function validateEmail(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const result = regex.test(email);
  return result;
}

// Check Object
export function checkEmailForSubmit() {
  if (Object.values(email).includes("")) {
    submitBtn.classList.add("opacity-50");
    submitBtn.disabled = true;
    return;
  }
  submitBtn.classList.remove("opacity-50");
  submitBtn.disabled = false;
}

// Reset Form export function Btn
export function resetForm() {
  // Restart object
  email.email = "";
  email.asunto = "";
  email.mensaje = "";
  email.cc = "";

  form.reset();
  checkEmailForSubmit();
  removeAlerts();
}

function removeAlerts() {
  const alerts = document.querySelectorAll(".bg-red-600");
  alerts.forEach((alert) => alert.remove());
}
