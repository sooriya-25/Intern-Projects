
// HAMBURGER MENU TOGGLE
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("open");
});


// DROPDOWN TOGGLE (Product, Company, Connect)
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(function (item) {
  item.querySelector(".nav-link").addEventListener("click", function () {
    // Close all other dropdowns first
    navItems.forEach(function (el) {
      if (el !== item) el.classList.remove("open");
    });
    // Toggle current
    item.classList.toggle("open");
  });
});


// CLOSE DROPDOWN WHEN CLICKING OUTSIDE
document.addEventListener("click", function (e) {
  const isInsideNav = e.target.closest(".nav-item");
  if (!isInsideNav) {
    navItems.forEach(function (el) {
      el.classList.remove("open");
    });
  }
});


// MODAL — Open & Close
const openModalBtn  = document.getElementById("openModal");
const modalOverlay  = document.getElementById("modalOverlay");
const modalCloseBtn = document.getElementById("modalClose");

// Open modal when Sign Up is clicked
openModalBtn.addEventListener("click", function (e) {
  e.preventDefault();
  modalOverlay.classList.add("open");
});

// Close modal when X is clicked
modalCloseBtn.addEventListener("click", function () {
  modalOverlay.classList.remove("open");
});

// Close modal when clicking outside the box
modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("open");
  }
});


// MODAL FORM — Validation + console.log
const modalForm       = document.getElementById("modalForm");
const firstNameInput  = document.getElementById("firstName");
const lastNameInput   = document.getElementById("lastName");
const modalEmailInput = document.getElementById("modalEmail");
const modalMessage    = document.getElementById("modalMessage");
const modalConsent    = document.getElementById("modalConsent");

const firstNameError  = document.getElementById("firstNameError");
const lastNameError   = document.getElementById("lastNameError");
const modalEmailError = document.getElementById("modalEmailError");
const queryError      = document.getElementById("queryError");
const messageError    = document.getElementById("messageError");
const consentError    = document.getElementById("consentError");

modalForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values
  const firstName  = firstNameInput.value.trim();
  const lastName   = lastNameInput.value.trim();
  const email      = modalEmailInput.value.trim();
  const message    = modalMessage.value.trim();
  const consent    = modalConsent.checked;

  // Get selected radio value
  const queryRadio = document.querySelector('input[name="queryType"]:checked');
  const queryType  = queryRadio ? queryRadio.value : "";

  // Reset all error messages
  firstNameError.textContent  = "";
  lastNameError.textContent   = "";
  modalEmailError.textContent = "";
  queryError.textContent      = "";
  messageError.textContent    = "";
  consentError.textContent    = "";

  let isValid = true;

  // Validate each field
  if (firstName.length < 2) {
    firstNameError.textContent = "Please enter your first name.";
    isValid = false;
  }

  if (lastName.length = "") {
    lastNameError.textContent = "Please enter your last name.";
    isValid = false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    modalEmailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (queryType === "") {
    queryError.textContent = "Please select a query type.";
    isValid = false;
  }

  if (message.length == "") {
    messageError.textContent = "Please enter a message.";
    isValid = false;
  }

  if (!consent) {
    consentError.textContent = "You must consent to being contacted.";
    isValid = false;
  }

  // If all valid — console.log the details
  if (isValid) {
    const formDetails = {
      firstName : firstName,
      lastName  : lastName,
      email     : email,
      queryType : queryType,
      message   : message,
      consent   : consent
    };

    console.log("Form Submitted:", formDetails);

    alert("🎉 Form submitted successfully!");

    modalOverlay.classList.remove("open");
    modalForm.reset();
  }
});
