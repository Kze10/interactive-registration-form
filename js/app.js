'use strict';

/* =============================================================================
                                GLOBAL VARIABLES
*///============================================================================
// Name Section  =============================================
const nameInput = document.querySelector('#name');
const nameLabel = nameInput.previousElementSibling;
const nameValidation = /^[A-Za-z]*\s{1}[A-Za-z]*$/;

// Email Section  ============================================
const emailInput = document.querySelector('#mail');
const emailLabel = emailInput.previousElementSibling;
const emailValidation = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Name Section  =============================================
const selectJob = document.querySelector('#title');
const otherOption = selectJob.lastElementChild;
const inputOtherJob = document.querySelector('#other-title');

// Theme Section  ============================================
const theme = document.querySelector('#design');
    const themeJsPuns = theme.querySelector('.theme__jsPuns');
    const themeHeartJs = theme.querySelector('.theme__heartJs');

// Color Section  ============================================
const colorDiv = document.querySelector('#colors-js-puns');
    const colors = document.querySelector('#color');
        const optionColor = colors.children;

// Activities Section  =======================================
const activities = document.querySelector('.activities');
    const actLegend = activities.firstElementChild;
	const actLabel = activities.getElementsByTagName('label');
        const actCheckbox = activities.querySelectorAll('[type=checkbox]');
const total = document.querySelector('.total__amount');
let actChecked;

// Payment Section  ==========================================
const paymentSection = document.querySelector('.payment__section');
    const paymentMethod = paymentSection.querySelector('#payment');
        const creditCard = paymentSection.querySelector('.credit-card');
        const paypal = paymentSection.querySelector('.paypal');
        const bitcoin = paymentSection.querySelector('.bitcoin');

// Credit Card Section  ======================================
const cardInput = document.querySelector('#cc-num');
const cardLabel = cardInput.previousElementSibling;

// Zip Code Section  =========================================
const zipInput = document.querySelector('#zip');
const zipLabel = zipInput.previousElementSibling;

// CVV Section  ==============================================
const cvvInput = document.querySelector('#cvv');
const cvvLabel = cvvInput.previousElementSibling;

// Payment Validation  ======================================= 
const payValidation = /^[0-9]*$/;

// Subimt Button  ============================================
const submit = document.querySelector('[type="submit"]');

// Create autofocus in the name field  =======================
nameInput.focus();

/* =============================================================================
                         HIDE OR DISPLAY OTHER JOBS FIELD
*///============================================================================

inputOtherJob.style.display = 'none';

selectJob.addEventListener('change', (e) => {
    if (otherOption.selected) {
        inputOtherJob.style.display = 'block';
    } else {
        inputOtherJob.style.display = 'none';
    }
});

/* =============================================================================
                           HIDE OR DISPLAY THEME COLORS
*///============================================================================

colorDiv.style.display = 'none';
// Event to display and hide theme colors
theme.addEventListener('change', (e) => {
    hideColors();
    colorDiv.style.display = 'block';

    if (themeJsPuns.selected) {
        optionColor[0].selected = true;
        displayElements(1, 3, optionColor);
    } else if (themeHeartJs.selected) {
        optionColor[0].selected = true;
        displayElements(4, 6, optionColor);
    } else {
        hideColors();
    }
});

function hideColors() {
    for (let i = 0; i < 7; i++) {
        optionColor[i].style.display = 'none';
        colorDiv.style.display = 'none';
    }
}

function displayElements(start, end, element) {
    for (let i = start; i <= end; i++) {
        element[i].style.display = 'block';
    }
}

/* =============================================================================
                                  ACTIVITIES
*///============================================================================

// Disable actitivity options that are happening at the same day and time
activities.addEventListener('change', (e) => {
    actCheckbox[1].checked ? actCheckbox[3].disabled = true : actCheckbox[3].disabled = false;
    actCheckbox[3].checked ? actCheckbox[1].disabled = true : actCheckbox[1].disabled = false;
    actCheckbox[2].checked ? actCheckbox[4].disabled = true : actCheckbox[4].disabled = false;
    actCheckbox[4].checked ? actCheckbox[2].disabled = true : actCheckbox[2].disabled = false;
    calculateActivities();
});
// Calculate the total cost for the activities
function calculateActivities() {
    let finalCost = 0;
    if (actCheckbox[0].checked) {
        finalCost = 200;
    }
    for (let i = 1; i < actCheckbox.length; i++) {
        if (actCheckbox[i].checked) {
            finalCost += 100;
        }
    }
    total.textContent = finalCost;
}

/* =============================================================================
                                 PAYMENT EVENT
*///============================================================================

// Credit card as default option
paymentMethod[1].selected = true;
defaultPayment();

// Hide or display payment selections
paymentSection.addEventListener('change', (e) => {
    if (paymentMethod[2].selected) {
        creditCard.style.display = 'none';
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
    } else if (paymentMethod[3].selected) {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'block';
    } else {
        defaultPayment();
    }
});

/* =============================================================================
                                VALIDATION EVENTS
*///============================================================================

// Event for name field - show different erros while typing
nameInput.addEventListener('keyup', (e) => {
    validateName();
});

// Event for email field - show different erros while typing
emailInput.addEventListener('keyup', (e) => {
    validateEmail();
});

// Event for submitting the form
submit.addEventListener('click', (e) => {
    const name = nameInput.value;
    const email = emailInput.value;
    const card = cardInput.value;
    const zip = zipInput.value;
    const cvv = cvvInput.value;

    // validation for name field
    if (name === '' || !name.match(nameValidation)) {
        e.preventDefault();
    }
    validateName();

    // validation for email field
    if (email === '' || !email.match(emailValidation)) {
        e.preventDefault();
    }
    validateEmail();

    // validation for activities section    
    validateActivities();
    if (!actChecked) {
        e.preventDefault();
        actLegend.textContent = '* Please select at least one Activity.';
        actLegend.style.color = 'red';
    } else {
        actLegend.textContent = 'Register for Activities';
        actLegend.style.color = '';
    }

    // validation for payment section   
    if (paymentMethod[0].selected || paymentMethod[1].selected) {
        // validation for credit card   
        if (!card || !card.match(payValidation) || card.length > 0 && card.length < 13 || card.length > 16) {
            e.preventDefault();
        }
        validateCard();
       // validation for zip code   
        if (!zip || !zip.match(payValidation) || zip.length !== 5) {
            e.preventDefault();
        }
        validateZip();
       // validation for cvv  
        if (!cvv || !cvv.match(payValidation) || cvv.length !== 3) {
            e.preventDefault();
        }
        validateCVV();
    }
});

/* =============================================================================
                            FUNCTION FOR DEFAULT PAYMENT
*///============================================================================

function defaultPayment() {
    if (paymentMethod[0].selected || paymentMethod[1].selected) {
        creditCard.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    }
}

/* =============================================================================
						  FUNCTIONS FOR VALIDATION EVENTS
*///============================================================================

function validateName() {
    const name = nameInput.value;
    // validation for empty field 
    if (name.length === 0) {
        errorMessage('* Name is required.', nameLabel, 'red', nameInput, '2px solid red', '#fff');
        return false;
    // validation for letters only and also name + surname        
    } else if (!name.match(nameValidation)) {
        errorMessage('* Name and surname are required. Only letters will be accepted.', nameLabel, 'red', nameInput, '2px solid red', '#fff');
        return false;
    // when valid the label returns to original values      
    } else {
        errorMessage('Name:', nameLabel, '', nameInput, '', '');
        return true
    }
}

function validateEmail() {
    const email = emailInput.value;
    // validation for empty field 
    if (email.length === 0) {
        errorMessage('* Email is required.', emailLabel, 'red', emailInput, '2px solid red', '#fff');
        return false;
    // validation for email characters      
    } else if (!email.match(emailValidation)) {
        errorMessage('* Please make sure you type a valid email', emailLabel, 'red', emailInput, '2px solid red', '#fff');
        return false;
    // when valid the label returns to original values       
    } else {
        errorMessage('Valid email:', emailLabel, '', emailInput, '', '');
        return true
    }
}

// Checkbox will start as false and will turn to true if any checkbox is checked 
function validateActivities() {
    actChecked = false;
    for (let i = 0; i < actCheckbox.length; i++) {
        let checkbox = actCheckbox[i];
        if (checkbox.checked) {
            actChecked = true;
            break;
        }
    }
    return actChecked;
}

function validateCard() {
    const card = cardInput.value;
    // Quick style adjustment to display the message in 1 line  
    errorPayment(cardLabel);
    // validation for empty field 
    if (card.length === 0) {
        errorMessage('*Card Number is required', cardLabel, 'red', cardInput, '2px solid red', '#fff');
        return false;
    // validation for numbers only and no space  
    } else if (!card.match(payValidation)) {
        errorMessage('*Please type a valid number with no space', cardLabel, 'red', cardInput, '2px solid red', '#fff');
        return false;
    // validation for minimal and maximum length        
    } else if (card.length > 0 && card.length < 13 || card.length > 16) {
        errorMessage('*13 to 16 digits are required', cardLabel, 'red', cardInput, '2px solid red', '#fff');
        return false;
    // when valid the label returns to original values     
    } else {
        errorMessage('Card Number:', cardLabel, '', cardInput, '', '');
        // Return text size and margin to the original values 
        cardLabel.style.fontSize = '';
        cardLabel.style.marginBottom = '';
        return true;
    }
}

function validateZip() {
    const zip = zipInput.value;
    // Quick style adjustment to display the message in 1 line      
    errorPayment(zipLabel);
    // validation for empty field 
    if (zip.length === 0) {
        errorMessage('*Zip Code is required', zipLabel, 'red', zipInput, '2px solid red', '#fff');
        return false;
    // validation for numbers only       
    } else if (!zip.match(payValidation)) {
        errorMessage('*Zip Code is invalid', zipLabel, 'red', zipInput, '2px solid red', '#fff');
        return false;
   // validation for exact length   
    } else if (zip.length !== 5) {
        errorMessage('*5 digits are required', zipLabel, 'red', zipInput, '2px solid red', '#fff');
        return false;
    // when valid the label returns to original values          
    } else {
        errorMessage('Zip Code:', zipLabel, '', zipInput, '', '');
        // Return text size and margin to the original values         
        zipLabel.style.fontSize = '';
        zipLabel.style.marginBottom = '';
        return true;
    }
}

function validateCVV() {
    const cvv = cvvInput.value;
    // Quick style adjustment to display the message in 1 line      
    errorPayment(cvvLabel);
    // Quick margin adjustment to not affect 'Expiration Date' element when error message is displayed
    cvvInput.style.marginBottom = '20px';
    // validation for empty field 
    if (cvv.length === 0) {
        errorMessage('*CVV is required', cvvLabel, 'red', cvvInput, '2px solid red', '#fff');
        return false;
    // validation for numbers only           
    } else if (!cvv.match(payValidation)) {
        errorMessage('*CVV is invalid', cvvLabel, 'red', cvvInput, '2px solid red', '#fff');
        return false;
   // validation for exact length           
    } else if (cvv.length !== 3) {
        errorMessage('*3 digits are required', cvvLabel, 'red', cvvInput, '2px solid red', '#fff');
        return false;
    // when valid the label returns to original values                
    } else {
        errorMessage('CVV:', cvvLabel, '', cvvInput, '', '');
        // Return text size and margin to the original values             
        cvvLabel.style.fontSize = '';
        cvvLabel.style.marginBottom = '';
        return true;
    }
}

// Display error message
function errorMessage(message, label, color, input, borderStyle, bkgColor) {
    label.textContent = message;
    label.style.color = color;
    input.style.border = borderStyle;
    input.style.backgroundColor = bkgColor;
}

// Quick style adjustment to display the message in 1 line   
function errorPayment(label) {
    label.style.fontSize = '13px';
    label.style.marginBottom = '0.9em';
}

