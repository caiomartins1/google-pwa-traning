/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// helper functions ----------

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem:', error);
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}

function readResponseAsText(response) {
  return response.text();
}


// Fetch JSON ----------

function fetchJSON() {
  fetch('examples/animals.json')
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError);
}
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);


// Fetch Image ----------
function readResponseAsBlob(response) {
  return response.blob();
}

function showImage(responseAsBlob) {
  const container = document.getElementById('img-container');
  const imgElement = document.createElement('img');
  container.appendChild(imgElement);

  const imgUrl = URL.createObjectURL(responseAsBlob);
  imgElement.src = imgUrl;
}

function fetchImage() {
  fetch('examples/fetching.jpg')
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError);
}
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);


// Fetch text ----------
function showText(responseAsText) {
  const message = document.getElementById('message');
  message.textContent = responseAsText;
}

function fetchText() {
  fetch('examples/words.txt')
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
}
const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);


// HEAD request ----------

function headRequest() {
  fetch('examples/words.txt', {
    method: 'HEAD'
  })
    .then(res => console.log(res.headers.get('content-length')))
  // .then(validateResponse)
  // .then(readResponseAsText)
  // .then(logResult)
  // .catch(logError)
}
const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest);


// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {
  const formData = new FormData(document.getElementById('msg-form'));
  const messageHeaders = { 'X-CUSTOM': 'hello world', 'Y-Custom': 'YCUSTOM' };
  const myHeaders = new Headers(messageHeaders);

  fetch('http://localhost:5000/', {
    method: 'POST',
    body: JSON.stringify({ lab: 'fetch', status: 'fun' }),
    headers: myHeaders
  })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
}
const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);
