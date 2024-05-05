console.log("=========== SBA The Document Object Model ===========");
console.log("===================== Home Page ====================");
//=================================================================//
console.log(
  "==================== Registration Validation ===================="
);
//====================================================================//
//=================== Registration Form Validation ===================//
//--------------------- Error display span cached --------------------//
let errorDisplay = document.querySelector("#reg-error");
//----------------- Registration form elements cached ----------------//
const registrationForm = document.getElementById("reg-form");
const regUserFName = registrationForm.elements["name"];
const regUserEmail = registrationForm.elements["email"];
const regUserPassword = registrationForm.elements["password"];
const confirmPassword = registrationForm.elements["confirmPassword"];

//---------------- Event Listner for registration form ----------------//
registrationForm.addEventListener("submit", registrationFormSubmission);
function registrationFormSubmission(e) {
  e.preventDefault();

  const userPasswordVal = validateRegPassword();
  const userEmailVal = validateRegEmail();
  const regUserNameVal = validateRegUsername();

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

  if (localStorage.length > 0) {
    // Caching the email from local storage is it exist
    const storedEmail = localStorage.getItem("email");
    if (valUserEmail === storedEmail.toLowerCase()) {
      const message = "Account already exist";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }
  }

  // Storing the name to local storage
  const storingUserName = localStorage.setItem("name", valUserFName);
  // Storing the email to local storage
  const storingEmail = localStorage.setItem("email", valUserEmail);
  // Storing the password to local storage
  const storingPassword = localStorage.setItem("password", valUsrPassword);
  // This line resets the form if registration is successful
  registrationForm.reset();
  //------------------------------------------------------------------//
  //==================================================================//
  //---------------- Registration Validaiton Function ----------------//
  // Validiation to check if name field is empty
  function validateRegUsername() {
    const regFnameVal = regUserFName.value.toLowerCase();
    if (regFnameVal === "") {
      const message = "The name Feild can not be empty";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }

    // Validiation to check if name field is less than 4 characters
    if (regFnameVal.length < 4) {
      const message = "The name field must be at least four characters long";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }
  }
  //===================================================================/
  // Validation For Email Registration
  function validateRegEmail() {
    // Validation to check if email is not empty
    if (regUserEmailVal === "") {
      const message = "The email Feild can not be empty";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }
    // Validation to check if email is valid
    const regUserEmailVal = regUserEmail.value.toLowerCase();
    const regE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let regUserEmailEx = regE.test(regUserEmailVal);
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
    // Validation to check if password is not empty
    if (regUserPasswordVal === "") {
      const message = "The password Feild can not be empty";
      registrationErrorMessage(message);
      regUserPassword.focus();
      return false;
    }
    // Validiation to check if password field is less than 6 characters
    if (regUserPasswordVal.length < 6) {
      const message = "The password field must be at least six characters long";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }
    // Validiation to check if password field is not more than 32 characters
    if (regUserPasswordVal.length > 32) {
      const message =
        "The password field can not be more than 32 characters long";
      registrationErrorMessage(message);
      regUserFName.focus();
      return false;
    }
    // Validation to check if confirmation password is not empty
    if (regConfirmPassword === "") {
      const message = "The confirm password Feild can not be empty";
      registrationErrorMessage(message);
      confirmPassword.focus();
      return false;
    }
    // Validation to check if password is valid
    const regE = /[a-zA-Z0-9]/;
    let regUserPasswordEx = regE.test(regUserPasswordVal);
    if (!regUserPasswordEx) {
      const message = `Invalid password`;
      registrationErrorMessage(message);
      regUserPassword.focus();
      return false;
    }
    // Validation to check if both password inputs matches
    if (regUserPasswordVal !== regConfirmPassword) {
      const message = "Your password do not match";
      registrationErrorMessage(message);
      regUserPassword.focus();
      return false;
    }
  }
  //==================================================================//
  //--------- Function to create registration error message ----------//
  function registrationErrorMessage(message) {
    errorDisplay.style.display = "block";
    errorDisplay.style.fontSize = "small";
    errorDisplay.textContent = message;
  }
  //==================================================================//
}
//====================================================================//
console.log("=================== Login Validation ===================");
//====================================================================//
//====================== Login Form Validation =======================//
let loginErrorDisplay = document.querySelector("#login-error");
//-------------------- Body element cached cached --------------------//
const bodyTag = document.body;
const mainContainer = document.getElementsByClassName("container");
//-------------------- Login form elements cached --------------------//
const loginForm = document.getElementById("log-form");
const loginEmail = loginForm.elements["email"];
const loginUserPassword = loginForm.elements["password"];
//------------------- Event Listner for login form -------------------//
loginForm.addEventListener("submit", loginFormSubmission);

function loginFormSubmission(e) {
  e.preventDefault();
  // Caching the name from local storage
  const loginUserNmae = localStorage.getItem("name");
  // Caching the username from local storage
  const loginUserEmail = localStorage.getItem("email");
  // Caching the password from local storage
  const storedPassword = localStorage.getItem("password");
  // caching the validation functions to check if there are any errors
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
  // p tag for the success message
  const pTag = document.createElement("p");
  pTag.style.textAlign = "center";
  pTag.style.color = "green";
  pTag.textContent = successMessage;
  successDiv.appendChild(pTag);
  // Calling the assessmentForm() and passing the users name as an arguments
  assessmentForm(loginUserNmae);
  // This line resets the form if the login is successful
  loginForm.reset();
  //------------------- Login Validaiton Function --------------------//

  // Validation function for the login User Name
  function validateLoginUsername() {
    // Caching the email in lower case
    let userEmailValue = loginEmail.value.toLowerCase();
    // If the email inputed does not match the email in localstoage
    // the email does not exist
    if (userEmailValue !== loginUserEmail) {
      const message = "The email does not exist";
      loginErrorMessage(message);
      loginEmail.focus();
      return false;
    }
  }
  // Validation function for the login password
  function validateLoginPassword() {
    let userPasswordValue = loginUserPassword.value;
    // If the password inputed does not match the password in localstoage
    // the login fails
    if (userPasswordValue !== storedPassword) {
      const message = "Incorrect Password";
      loginErrorMessage(message);
      loginUserPassword.focus();
      return false;
    }
  }
  //===================================================================//
  //------------- Function to create login error message --------------//
  function loginErrorMessage(message) {
    loginErrorDisplay.style.display = "block";
    loginErrorDisplay.style.fontSize = "small";
    loginErrorDisplay.textContent = message;
  }
  //===================================================================//
}
//=====================================================================//
//=====================================================================//
//=============== Code For Creating The Assessment Form ===============//
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
  // Form event listner when submit button clicked
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Cached the body weight entered in the input
    const startingBodyWeight = document.getElementById("bodyWeight");
    // Cached the fitness goals entered in the input
    const fitnessGoal = document.getElementById("fitnessGoals");
    //----------------------------------------------------------------//
    // New div to contain the values inputed inside the assessment form
    const assessmentGoalDiv = document.createElement("div");
    assessmentDiv.id = "app";
    assessmentGoalDiv.style.width = "80%";
    assessmentGoalDiv.style.height = "80%";
    assessmentGoalDiv.style.margin = "25px auto";
    assessmentGoalDiv.style.color = "white";
    assessmentGoalDiv.style.backgroundColor = " rgb(185, 184, 184)";
    assessmentGoalDiv.style.border = "2px solid white";
    assessmentGoalDiv.style.borderRadius = "15px";

    bodyTag.appendChild(assessmentGoalDiv);
    // Create div element
    const templateDive = document.createElement("div");
    templateDive.id = "postTemplate";
    // Create H1 element
    const tempH1 = document.createElement("h1");
    tempH1.style.textAlign = "center";
    tempH1.style.textDecoration = "underline";
    tempH1.style.margin = "0 auto";
    tempH1.style.color = "white";
    tempH1.textContent = "Your Wellness Status";
    templateDive.appendChild(tempH1);
    // Create hr element
    const tempHr = document.createElement("hr");
    templateDive.appendChild(tempHr);
    // Create div element
    const tempDiv = document.createElement("div");
    tempDiv.style.padding = "0 15px";
    tempDiv.style.marginBottom = "50px";
    templateDive.appendChild(tempDiv);

    assessmentGoalDiv.appendChild(templateDive);

    // Assessment form data
    const weightInput = startingBodyWeight.value;
    const goalInput = fitnessGoal.value;

    // Array of assessment form data
    const assessmentArr = [weightInput, goalInput];
    // Document fragment will contain the users weight and goals
    // inputed in the form
    const dFrag = document.createDocumentFragment();
    templateDive.appendChild(dFrag);

    let incrementor = 1;
    assessmentArr.forEach((data) => {
      // Create paragragh element
      const tempPtag = document.createElement("p");
      tempPtag.style.fontSize = "large";
      tempPtag.textContent = `${incrementor}. ${data}`;
      dFrag.appendChild(tempPtag);
      tempDiv.appendChild(dFrag);
      console.log(`${incrementor}. ${data}`);
      incrementor++;
    });
    // Assessment form is cleared after values from the form is populated
    // to the p tag and the p tage appended to the temp div
    form.reset();
    // This removes the login success message from the page
    const loginSuccessMessage = assessmentDiv.previousElementSibling;
    loginSuccessMessage.style.display = "none";
  });
}
