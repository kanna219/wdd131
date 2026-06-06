const form = document.querySelector("#ticketForm");
const type = document.querySelector("#type");
const studentIdContainer = document.querySelector("#studentIdContainer");
const accessContainer = document.querySelector("#accessContainer");
const studentInput = document.querySelector("#studentId");
const accessInput = document.querySelector("#accessCode");
const output = document.querySelector("#output");


function updateFields() {
  const value = type.value;

  if (value === "student") {
    studentIdContainer.hidden = false;
    studentInput.required = true;
    
    accessContainer.hidden = true;
    accessInput.required = false;
    accessInput.value = ""; 
  } 
  else if (value === "guest") {
    studentIdContainer.hidden = true;
    studentInput.required = false;
    studentInput.value = ""; 
    
    accessContainer.hidden = false;
    accessInput.required = true;
  }
  else {
    studentIdContainer.hidden = true;
    accessContainer.hidden = true;

    studentInput.required = false;
    accessInput.required = false;
  }
}

type.addEventListener("change", updateFields);
updateFields(); 

// Ensure they choose a date later than the current date
function isPastDate(value) {
  const today = new Date();
  const chosen = new Date(value);
  return chosen <= today;
}


form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.innerHTML = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const typeValue = form.type.value;
  const eventDate = form.eventDate.value;
  
  // Validate the input
  if (isPastDate(eventDate)) {
    output.textContent = "Please choose a later date.";
    return;
  }

  // student ID check
  if (typeValue === "student") {
    const studentId = studentInput.value.trim();
    const nineDigit = /^\d{9}$/;
    if (!nineDigit.test(studentId)) {
      output.textContent = "Student I# must be 9 digits";
      return;
    }
  } 
  
  // access code check
  else if (typeValue === "guest") {
    const accessCode = accessInput.value.trim();
    if (accessCode !== "EVENT131") {
      output.textContent = "Please enter the valid access code.";
      return;
    }
  }

  output.innerHTML = `
    <h2>Ticket Created</h2>
    <p>${firstName} ${lastName}</p>
    <p>${typeValue}</p>
    <p>${eventDate}</p>
  `;

  form.reset();
  updateFields();
});