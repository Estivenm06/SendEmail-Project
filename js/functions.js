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
  cc: "",
};

export function listeners() {
  // Assign events
  inputEmail.addEventListener("input", validate);
  inputMatter.addEventListener("input", validate);
  inputMessage.addEventListener("input", validate);
  inputCC.addEventListener("input", validate);
  resetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    resetForm();
  });
  form.addEventListener("submit", sendEmail);
}

export function sendEmail(e) {
  e.preventDefault();

  spinner.classList.add("flex");
  spinner.classList.remove("hidden");

  setTimeout(() => {
    spinner.classList.add("hidden");
    spinner.classList.remove("flex");
    resetForm();

    form.appendChild(alert("Email was sent correctly.", "success"));

    setTimeout(() => {
      form.lastChild.remove();
    }, 3000);
  }, 3000);
}

// Validate Form
export function validate(event) {
  const reference = event.target.parentElement;
  if (event.target.id !== "cc" && event.target.value === "") {
    showAlertError(`El campo ${event.target.id} es obligatorio.`, reference);
    email[event.target.name] = "";
    checkEmail();
    return;
  }
  if (
    (event.target.id === "email" && !validateEmail(event.target.value)) ||
    (event.target.id === "cc" &&
      event.target.value.length >= 1 &&
      !validateEmail(event.target.value))
  ) {
    showAlertError(`El email ${event.target.value} no es valido.`, reference);
    email[event.target.name] = "";
    checkEmail();
    return;
  }
  clearAlert(reference);
  // Assign values
  email[event.target.name] = event.target.value.trim().toLowerCase();
  // Check email object
  checkEmail();
}

// Alerts
export function showAlertError(message, reference) {
  clearAlert(reference);
  // Inject error to the form of HTML
  reference.appendChild(alert(message, "error"));
}
export function clearAlert(reference) {
  // Checking if already there are an alert
  const alert = reference.querySelector(".bg-red-600");
  if (alert) {
    alert.remove();
  }
}
export function alert(message, type) {
  const alertElement = document.createElement("P");
  if (type === "error") {
    alertElement.classList.add(
      "text-2xl",
      "rounded-lg",
      "p-2",
      "bg-red-600",
      "text-center",
      "text-white"
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
      "font-bold"
    );
  }
  alertElement.textContent = message;
  return alertElement;
}

// Validation
export function validateEmail(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const result = regex.test(email);
  return result;
}

// Check Object
export function checkEmail() {
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

  form.reset();
  checkEmail();
}
