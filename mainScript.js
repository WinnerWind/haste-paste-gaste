const formSelector = ".verticalForm"
const fileNameSelector = "fileName"
const mainContentSelector = "mainContent"

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector(formSelector);
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(form);
      handleFormData(formData.get(fileNameSelector), formData.get(mainContentSelector));
    });
  }
});

function handleFormData(inputValue, textareaValue) {
  // Do something with inputValue and textareaValue
  alert(`Input: ${inputValue}\nTextarea: ${textareaValue}`);
}
