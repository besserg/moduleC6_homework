const Url = "wss://echo.websocket.org"

const sendbtn = document.querySelector('.j-btn-send');
const geobtn = document.querySelector('.j-btn-geo');
const output = document.getElementById("chatbox");
const msgtext = document.getElementById("clientmsg");
const closebtn = document.querySelector('.j-btn-close');
let latitude;
let longitude;
let isGeo;

const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
};

const success = (position) => {
  console.log('position', position);
  latitude  = position.coords.latitude;
  longitude = position.coords.longitude;
  isGeo = true;
  sendData(`Широта: ${latitude} °, Долгота: ${longitude} °`);
  const link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  writeToScreen(link);
};

let websocket;


function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  if (!isGeo || !message.includes('Responce')) {
    output.appendChild(pre);
  };
}

closebtn.addEventListener('click', () => {
  websocket.close();
  websocket = null;
}
);

sendbtn.addEventListener('click', () => {
  isGeo = false;
 sendData(msgtext.value);
}
);

function sendData(msg) {
  writeToScreen("Client message: " + msg);
  websocket.send(msg);
}

function socApi(url) {
  
    websocket = new WebSocket(url);
    websocket.onopen = function(evt) {
      writeToScreen('Connection opened!');
    };
    websocket.onclose = function(evt) {
      writeToScreen('Connection closed!');
    };
      websocket.onmessage = function(evt) {
        writeToScreen("Server Responce: " + evt.data)
      };
    websocket.onerror = function(evt) {
      writeToScreen("Server ERROR: " + evt.data )
    };
};

geobtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    writeToScreen('Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
);

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', console.log('loaded'));
}
else {
   socApi(Url);
};