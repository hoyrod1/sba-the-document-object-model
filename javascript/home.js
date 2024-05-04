console.log("=========== SBA The Document Object Model ===========");
console.log("===================== Home Page ====================");
//=================================================================//
console.log(
  "==================== Registration Validation ===================="
);
//=================================================================//
//================== Registration Form Validation =================//
//----------------- Error display container cached ----------------//
let errorDisplay = document.getElementById("login-error");
//---------------- Registration form elements cached --------------//
const registrationForm = document.getElementById("reg-form");
const regUserFName = registrationForm.elements["name"];
const regUserEmail = registrationForm.elements["email"];
const regUserPassword = registrationForm.elements["password"];
const confirmPassword = registrationForm.elements["confirmPassword"];

//--------------- Event Listner for registration form ---------------//
registrationForm.addEventListener("submit", registrationFormSubmission);
function registrationFormSubmission(e) {
  e.preventDefault();

  const regUserNameVal = validateRegUsername();
  const userEmailVal = validateRegEmail();
  const userPasswordVal = validateRegPassword();

  if (regUserNameVal === false) {
    e.returnValue = false;
    return false;
  }
  if (userEmailVal === false) {
    e.returnValue = false;
    return false;
  }
  if (userPasswordVal === false) {
    e.returnValue = false;
    return false;
  }

  //==================================================================//
  //------------------------------------------------------------------//
  // Prepare Validated input for local storage
  const valUserFName = regUserFName.value.toLowerCase();
  const valUserEmail = regUserEmail.value.toLowerCase();
  const valUsrPassword = regUserPassword.value;

  // Caching the username from local storage
  if (localStorage.length > 0) {
    const storedEmail = localStorage.getItem("email");
    if (valUserEmail === storedEmail.toLowerCase()) {
      const message = "Account already exist";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }
  }

  // Storing the name to local storage
  // const storingUserName = localStorage.setItem("name", valUserFName);
  // // Storing the email to local storage
  // const storingEmail = localStorage.setItem("email", valUserEmail);
  // // Storing the password to local storage
  // const storingPassword = localStorage.setItem("password", valUsrPassword);

  // registrationForm.reset();
  //------------------------------------------------------------------//
  //==================================================================//
  //---------------- Registration Validaiton Function ----------------//
  // Registration Username Validiation
  function validateRegUsername() {
    const regFnameVal = regUserFName.value.toLowerCase();
    if (regFnameVal === "") {
      const message = "The name Feild can not be empty";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }

    if (regFnameVal.length < 4) {
      const message = "The name field must be at least four characters long";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }
  }
  //===================================================================/
  // Validation For Registration Email Validiation
  function validateRegEmail() {
    const regUserEmailVal = regUserEmail.value.toLowerCase();
    const regE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let regUserEmailEx = regE.test(regUserEmailVal);
    if (regUserEmailVal === "") {
      const message = "The email Feild can not be empty";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }
    if (!regUserEmailEx) {
      const message = "The is not a valid email";
      registrationErrorMessage(message);
      regUserEmail.focus();
      return false;
    }
  }
  //===================================================================/
  // Validation function for the Registration password
  function validateRegPassword() {
    const regUserPasswordVal = regUserPassword.value;
    const regConfirmPassword = confirmPassword.value;

    if (regUserPasswordVal === "") {
      const message = "The password Feild can not be empty";
      registrationErrorMessage(message);
      regUserPassword.focus();
      return false;
    }

    if (regUserPasswordVal.length < 6) {
      const message = "The password field must be at least six characters long";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }

    if (regUserPasswordVal.length > 32) {
      const message =
        "The password field can not be more than 32 characters long";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }

    if (regConfirmPassword === "") {
      const message = "The confirm password Feild can not be empty";
      registrationErrorMessage(message);
      confirmPassword.focus();
      return false;
    }
    const regE = /[a-zA-Z0-9]/;
    let regUserPasswordEx = regE.test(regUserPasswordVal);
    if (!regUserPasswordEx) {
      const message = `Invalid password`;
      registrationErrorMessage(message);
      regUserPassword.focus();
      return false;
    }

    if (regUserPasswordVal !== regConfirmPassword) {
      const message = "Your password do not match";
      registrationErrorMessage(message);
      regUserPassword.focus();
      return false;
    }
  }
  //==================================================================//
  //---------------- Function to create error message ----------------//
  function registrationErrorMessage(message) {
    errorDisplay.style.display = "block";
    errorDisplay.style.fontSize = "small";
    errorDisplay.textContent = message;
  }
  //==================================================================//
}
//===================================================================//
console.log("=================== Login Validation ===================");
//===================================================================//
//=================== Login Form Validation ===================//
//---------------- Body element cached cached ----------------//
const bodyTag = document.body;
const mainContainer = document.getElementsByClassName("container");
//---------------- Login form elements cached ----------------//
const loginForm = document.getElementById("log-form");
const loginEmail = loginForm.elements["email"];
const loginUserPassword = loginForm.elements["password"];
//--------------- Event Listner for login form ---------------//
loginForm.addEventListener("submit", loginFormSubmission);

function loginFormSubmission(e) {
  e.preventDefault();
  // Caching the name from local storage
  const loginUserNmae = localStorage.getItem("name");
  // Caching the username from local storage
  const loginUserEmail = localStorage.getItem("email");
  // Caching the password from local storage
  const storedPassword = localStorage.getItem("password");

  const userNameVal = validateLoginUsername();
  const userPasswordVal = validateLoginPassword();

  if (userNameVal === false) {
    e.returnValue = false;
    return false;
  }

  if (userPasswordVal === false) {
    e.returnValue = false;
    return false;
  }
  //------------------ Login Success Actions ------------------//
  // Success message
  const successMessage = "You have succesfully Logged in";
  //-----------------------------------------------------------//
  // New div to contain the success message
  const successDiv = document.createElement("div");
  successDiv.style.width = "500px";
  successDiv.style.height = "50px";
  successDiv.style.padding = "15px";
  successDiv.style.margin = "15px auto";
  successDiv.style.color = "white";
  successDiv.style.backgroundColor = "orange";
  successDiv.style.border = "2px solid white";
  successDiv.style.borderRadius = "15px";
  bodyTag.appendChild(successDiv);

  const pTag = document.createElement("p");
  pTag.style.textAlign = "center";
  pTag.style.color = "green";
  pTag.textContent = successMessage;
  successDiv.appendChild(pTag);
  assessmentForm(loginUserNmae);
  loginForm.reset();
  //------------------- Login Validaiton Function --------------------//

  // Validation function for the login User Name
  function validateLoginUsername() {
    // Storing the username in lower case
    let userEmailValue = loginEmail.value.toLowerCase();

    if (userEmailValue !== loginUserEmail) {
      const message = "Username doesn't exist";
      loginErrorMessage(message);
      loginEmail.focus();
      return false;
    }
  }

  // Validation function for the login password
  function validateLoginPassword() {
    let userPasswordValue = loginUserPassword.value;

    if (userPasswordValue !== storedPassword) {
      const message = "Incorrect Password";
      loginErrorMessage(message);
      loginUserPassword.focus();
      return false;
    }
  }
  //==================================================================//
  //---------------- Function to create error message ----------------//
  function loginErrorMessage(message) {
    errorDisplay.style.display = "block";
    errorDisplay.style.fontSize = "small";
    errorDisplay.textContent = message;
  }
  //==================================================================//
}

function assessmentForm(name) {
  // New div to contain the message to fill out assessment form
  const assessmentDiv = document.createElement("div");
  assessmentDiv.style.width = "80%";
  assessmentDiv.style.height = "80%";
  assessmentDiv.style.margin = "15px auto";
  assessmentDiv.style.color = "white";
  assessmentDiv.style.backgroundColor = " rgb(185, 184, 184)";
  assessmentDiv.style.border = "2px solid white";
  assessmentDiv.style.borderRadius = "15px";

  // Fill our assisment form message
  const assessmentFormReq = ` ${name} please fill out the assessment form`;
  const h1Tag = document.createElement("h1");
  h1Tag.style.textAlign = "center";
  h1Tag.style.textDecoration = "underline";
  h1Tag.textContent = assessmentFormReq;
  assessmentDiv.appendChild(h1Tag);
  bodyTag.appendChild(assessmentDiv);

  // Create a form dynamically
  const form = document.createElement("form");
  form.className = "assessment-form";
  form.style.width = "50%";
  form.style.height = "60%";
  form.style.borderRadius = "15px";

  // Create an input element
  const bodyWeightGoal = document.createElement("input");
  bodyWeightGoal.id = "bodyWeight";
  bodyWeightGoal.style.color = "black";
  bodyWeightGoal.style.backgroundColor = "white";
  bodyWeightGoal.style.border = "2px solid  rgb(185, 184, 184)";
  bodyWeightGoal.style.marginBottom = "10px";
  bodyWeightGoal.style.width = "310px";
  bodyWeightGoal.focus;
  bodyWeightGoal.setAttribute("type", "text");
  bodyWeightGoal.setAttribute("name", "bodyWeight");
  bodyWeightGoal.setAttribute("placeholder", "Enter your current weight");
  form.appendChild(bodyWeightGoal);

  // Create an text area
  const fitnessGoals = document.createElement("TEXTAREA");
  fitnessGoals.style.padding = "5px";
  fitnessGoals.id = "fitnessGoals";
  fitnessGoals.cols = "35";
  fitnessGoals.rows = "15";
  fitnessGoals.placeholder = "Please describe your fitness goals";
  form.appendChild(fitnessGoals);

  // create a submit button
  const submitButton = document.createElement("input");
  submitButton.style.width = "310px";
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Submit");
  form.appendChild(submitButton);
  // Append assessment form to the div
  assessmentDiv.appendChild(form);

  const startingBodyWeight = document.getElementById("bodyWeight");
  const fitnessGoal = document.getElementById("fitnessGoals");

  const assessmentGoalTable = document.createElement("table");
  const assessmentGoalFragment = document.createDocumentFragment();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //----------------------------------------------------------------//
    // New div to contain the values inputed inside the assessment form
    const assessmentGoalDiv = document.createElement("div");
    assessmentGoalDiv.style.width = "80%";
    assessmentGoalDiv.style.height = "80%";
    assessmentGoalDiv.style.margin = "15px auto";
    assessmentGoalDiv.style.color = "white";
    assessmentGoalDiv.style.backgroundColor = " rgb(185, 184, 184)";
    assessmentGoalDiv.style.border = "2px solid white";
    assessmentGoalDiv.style.borderRadius = "15px";

    bodyTag.appendChild(assessmentGoalDiv);

    const weightInput = startingBodyWeight.value;
    const goalInput = fitnessGoal.value;
    const assessmentArr = [weightInput, goalInput];
    let incrementor = 1;
    assessmentArr.forEach((data) => {
      // const outPutTag = document.createElement("p");
      // outPutTag.style.fontSize = "large";
      // outPutTag.style.margin = "10px";
      // outPutTag.style.color = "green";
      // assessmentDiv.appendChild(outPutTag);
      const outPutTr = document.createElement("tr");
      const outPutTd = document.createElement("td");
      outPutTd.style.textAlign = "center";
      outPutTd.textContent = `${incrementor}. ${data}`;
      outPutTr.appendChild(outPutTd);
      assessmentGoalFragment.appendChild(outPutTr);
      incrementor++;
    });

    assessmentGoalTable.appendChild(assessmentGoalFragment);

    form.reset();

    const loginSuccessMessage = assessmentDiv.previousElementSibling;
    loginSuccessMessage.style.display = "none";
  });
}
