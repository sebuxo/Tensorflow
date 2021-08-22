const fileInput = document.getElementById('file-input');
const img = document.getElementById('img');
const pred = document.getElementById('Prediction');
const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');

fileInput.addEventListener('change',(e) => {

console.log(URL.createObjectURL(e.target.files)[0])
 img.src =Object.values(e.target.files)[0]
  cocoSsd.load().then(model =>{
    model.detect(img).then(predictions => {
      console.log('Predictions: ', predictions);
      console.log(Object.values(predictions)[0].class)
      pred.innerHTML ="Y'a un pourcentage de : " + Object.values(predictions)[0].score*100  + " d'être un/une : "+ Object.values(predictions)[0].class
    }).catch(error =>{
      pred.innerHTML = "Unrecognized"
    });
  });

});

const constraints = {
  video: true,
};

captureButton.addEventListener('click', () => {
context.drawImage(player, 0, 0, canvas.width, canvas.height);
cocoSsd.load().then(model => {

  model.detect(canvas).then(predictions => {
    
    pred.innerHTML ="Y'a un pourcentage de : " + Math.floor((Object.values(predictions)[0].score*100))  + "% d'être un/une : "+ Object.values(predictions)[0].class
  }).catch(error =>{
    pred.innerHTML = "Unrecognized";
});
}); 
});

navigator.mediaDevices.getUserMedia(constraints)
.then((stream) => {
  player.srcObject = stream;
});


