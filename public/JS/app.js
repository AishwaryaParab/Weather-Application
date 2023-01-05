console.log("Client side Js file has been loaded."); //will be visible in the browser's developer tools

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  // fetch(`http://localhost:3000/weather?address=${address}`)
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // return console.log(data.error);
        messageOne.textContent = 'Error:'
        messageTwo.textContent = data.error;
      } else {
        // console.log(data.placeName);
        // console.log(data.forecast);
        messageOne.textContent = data.placeName;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
