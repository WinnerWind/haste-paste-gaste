const formSelector = ".verticalForm"
const fileNameSelector = "fileName"
const mainContentSelector = "mainContent"
const presetSelector = "randomizePreset"
const linkToggleSelector = "linkToggle"
const fileNameLengthSelector = "fileNameLength"

const minimumPasteSize = 3

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector(formSelector);
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(form);
      handleFormData(formData.get(fileNameSelector), formData.get(fileNameLengthSelector), formData.get(mainContentSelector), formData.get(presetSelector), formData.get(linkToggleSelector));
    });
  }
});

function handleFormData(fileName, fileNameLength, content, randomizePreset, isLink) {
  if (!fileName) {
    const numFileNameLength = Number(fileNameLength)
    switch (randomizePreset){
      case "decimal":
        fileName = String(getRandomIntInclusive(1,(10**fileNameLength)-1)).padStart(fileNameLength,'0')
        break;
      case "hexadecimal":
        fileName = getRandomIntInclusive(1,(16**fileNameLength)-1).toString(16).padStart(fileNameLength, '0')
        break;
      case "alphabet":
        fileName = GetAlphabetFromNumber(getRandomIntInclusive(1,(26**fileNameLength)-1)).padStart(fileNameLength, 'a')
        break;
      case "base64":
        fileName = GetBase64FromNumber(getRandomIntInclusive(1, (64**fileNameLength)-1)).padStart(fileNameLength, '0')
        break;
    }
  }
  createNewPaste(fileName, isLink, content)
}

function createNewPaste(fileName,isLink, content) {
  const url = "https://api.winnerwind.in/pastebin"
  // const url = "http://192.168.68.105:5000/pastebin"
  const headers = {
    'content-type': 'application/json',
  }
  fetch(url, {method: 'POST', headers : headers , body: JSON.stringify(
  {
    "content": content,
    "filename": fileName,
    "is_link": isLink,
  })
  }).then(response => response.json())
  .then(data => {
  console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Helper Functions
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetAlphabetFromNumber(number) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  let result = "";
  if (number === 0) {
    return alphabet[0].toLowerCase();
  }
  while (number > 0) {
    let remainder = number % 26;
    result = alphabet[remainder] + result;
    number = Math.floor(number / 26);
  }
  return result.toLowerCase();
}

function GetBase64FromNumber(number) {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"
  let result = "";
  if (number === 0) {
    return alphabet[0].toLowerCase();
  }
  while (number > 0) {
    let remainder = number % 64;
    result = alphabet[remainder] + result;
    number = Math.floor(number / 64);
  }
  return result.toLowerCase();
}
