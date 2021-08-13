const fileInput = document.getElementById('file-input');
const img = document.getElementById('img');
const pred = document.getElementById('Prediction');
const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');

const constraints = {
  video: true,
};
captureButton.addEventListener('click', () => {
context.drawImage(player, 0, 0, canvas.width, canvas.height);
cocoSsd.load().then(model => {

  model.detect(canvas).then(predictions => {
    console.log('Predictions: ', predictions);
    console.log(Object.values(predictions)[0].class)
    pred.innerHTML ="This is a : " + Object.values(predictions)[0].class
  });
}); 
});

navigator.mediaDevices.getUserMedia(constraints)
.then((stream) => {
  player.srcObject = stream;
});


