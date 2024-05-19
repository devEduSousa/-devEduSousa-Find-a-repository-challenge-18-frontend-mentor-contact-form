// Elements
const messageContainerDiv = document.querySelector("#message-container");
const inputsTypeText = document.querySelectorAll("input[type='text']");
const inputTypeEmail = document.querySelector("input[type='email']");
const labelsWithInputTypeRadio = document.querySelectorAll(".radio-input-label");
const inputsCheckedImg = document.querySelectorAll(".radio-input-label img");
const inputsTypeRadio = document.querySelectorAll("input[name='type']");
const textarea = document.querySelector("textarea");
const inputTypeCheckbox = document.querySelector("input[type='checkbox']");
const errorsP = document.querySelectorAll('.error');
const submitBtnButton = document.querySelector('button');

// Functions
function checkInputsText() {
    inputsTypeText.forEach((input, index) => {
        if(!input.value) {
            errorsP[index].classList.remove("hidden");
            input.classList.add("red-border");
        };
    });
};

function checkInputEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!inputTypeEmail.value || !emailRegex.test(inputTypeEmail.value)) {
        errorsP[2].classList.remove("hidden");
        inputTypeEmail.classList.add("red-border");
    };
};

function checkInputsRadio() {
    let checked = 0;
    inputsTypeRadio.forEach((input) => {
        if(input.checked) checked++;
    });
    checked > 0 ? errorsP[3].classList.add("hidden") : errorsP[3].classList.remove("hidden");
};

function checkTextarea() {
    if(!textarea.value) {
        errorsP[4].classList.remove("hidden");
        textarea.classList.add("red-border");
    };
};

function checkCheckBox() {
    if(!inputTypeCheckbox.checked) errorsP[5].classList.remove("hidden");
};

function checkFiledsFilled() {
    let numberOfErrors = 0;
    errorsP.forEach((error) => {
        if(!error.classList.contains("hidden")) numberOfErrors++;
    });

    if(numberOfErrors === 0) {
        cleanFields();
        messageContainerDiv.classList.remove("hidden");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        setTimeout(() => messageContainerDiv.classList.add("hidden") , 3000);
    };    
};

function cleanFields() {
    for(const text of inputsTypeText) text.value = "";
    inputTypeEmail.value = "";
    inputsTypeRadio.forEach((radio, index) => {
        labelsWithInputTypeRadio[index].classList.remove("checked");
        inputsCheckedImg[index].classList.add("hidden");
        radio.checked = false;
    });
    textarea.value = "";
    inputTypeCheckbox.checked = false;
};

// Events
inputsTypeText.forEach((input, index) => input.addEventListener("click", () => {
    errorsP[index].classList.add('hidden');
    input.classList.remove("red-border");
}));
inputsTypeText.forEach((input, index) => input.addEventListener("focus", () => {
    errorsP[index].classList.add('hidden');
    input.classList.remove("red-border");
}));

inputsTypeRadio.forEach((input, index) => {
    input.addEventListener("click", () => {
        inputsTypeRadio.forEach((_, index) => {
            labelsWithInputTypeRadio[index].classList.remove("checked");
            inputsCheckedImg[index].classList.add("hidden");
        });
        errorsP[3].classList.add("hidden");
        labelsWithInputTypeRadio[index].classList.add("checked");
        inputsCheckedImg[index].classList.remove("hidden");
    });
    
});

inputTypeEmail.addEventListener("click", () => {
    inputTypeEmail.value = "";
    errorsP[2].classList.add("hidden");
    inputTypeEmail.classList.remove("red-border");
});
inputTypeEmail.addEventListener("focus", () => {
    inputTypeEmail.value = "";
    errorsP[2].classList.add("hidden");
    inputTypeEmail.classList.remove("red-border");
});

textarea.addEventListener("click", () => {
    errorsP[4].classList.add("hidden");
    textarea.classList.remove("red-border");
});
textarea.addEventListener("focus", () => {
    errorsP[4].classList.add("hidden");
    textarea.classList.remove("red-border");
});

inputTypeCheckbox.addEventListener("click", () => errorsP[5].classList.add("hidden"));

submitBtnButton.addEventListener("click", (e) => {
    e.preventDefault();
    checkInputsText();
    checkInputEmail();
    checkInputsRadio();
    checkTextarea();
    checkCheckBox();
    checkFiledsFilled();
});