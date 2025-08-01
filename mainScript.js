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

function handleFormData(fileName, content) {
  // Do something with inputValue and textareaValue
  alert(`Input: ${fileName}\nTextarea: ${content}`);
  createNewPaste(fileName,content)
}

function createNewPaste(fileName,content) {
  const url = "https://api.winnerwind.in/pastebin"
  // const url = "http://192.168.68.105:5000/pastebin"
  const headers = {
    'content-type': 'application/json',
  }
  fetch(url, {method: 'POST', headers : headers , body: JSON.stringify(
  {
    "content": content,
    "filename": fileName,
    "is_link": false
  })
  }).then(response => response.json())
  .then(data => {
  console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
