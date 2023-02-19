const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
// colorOptions는 HTML Collection이고 ArrayLike 객체일 뿐 배열은 아니기 때문에 배열로 만들어줌 
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// ctx(context) : canvas에서 사용할 브러쉬

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
// convas의 이미지 퀄리티를 높이기 위해 css에서 안 건드리고 js에서 canvas의 가로, 세로 크기를 조정 

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineCap = "round"; // 선 끝을 둥글게 설정
ctx.lineWidth = lineWidth.value;
// lineWidth의 기본값을 JS에서도 설정
// 딱 한 번만 실행됨

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath(); // 끊기면 새로운 경로를 줘야함
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value; // 선의 색깔을 바꿔줌 
  ctx.fillStyle = event.target.value;   // 채우기 색깔을 바꿔줌
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  // html에서 data-()에 원하는 데이터를 넣으면 JS에서 event.target.dataset이라는 값을 통해 사용 가능
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue; // html line 15에 위치한 input color로 나오는 색깔을 바꿔줌
}

function onModeClick() {
  if (isFilling) {     // 채우기 모드이면
    isFilling = false; // 채우기 모드 off
    modeBtn.innerText = "Fill"; // 버튼 이름 변경
  } else { // 채우기 모드가 아니면
    isFilling = true;  // 채우기 모드 on
    modeBtn.innerText = "Draw"; // 버튼 이름 변경
  }
}

function onCanvasClick() {
  if (isFilling) { // 채우기 모드이면 
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 컨버스 전체를 채우기
  }
}

function onDestroyClick() { // 하얀색으로 컨버스를 채움 -> 전체 삭제
  ctx.fillStyle = "white"; 
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() { // 지우는 것은 하얀색으로 선 긋는 것과 같음
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0]; // 파일 배열 중 첫 번째 파일을 불러옴
  const url = URL.createObjectURL(file);
  // 유저가 업로드한 이미지로부터 브라우저가 만든 브라우저에서만 사용 가능한 주소
  const image = new Image();
  image.src = url;
  // <img src="" /> 와 같은 거임 
  image.onload = function () { // image.onload : 이미지가 로드되었을 때    
    // = image.addEventListener("onload", function);
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null; // 계속 다른 파일을 추가할 수 있도록 
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") { // text에 값이 있다면
    ctx.save(); // .save : ctx의 현재 상태, 색상, 스타일 등 모든 것을 저장
    ctx.lineWidth = 1; // 글씨체 굵기를 1로 안하면 글씨가 제대로 안보임 
    ctx.font = "68px sans-serif";
    ctx.fillText(text, event.offsetX, event.offsetY); // 글씨체 내부가 채워서 출력됨 
    ctx.restore(); // .restore : 이전에 저장된 상태로 돌아감
    // 수정이 완료되면 .restore 사용
    // .save와 .restore 사이의 수정은 저장되지 않음
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  // 내가 만든 이미지가 url로 인코딩되어 결과로 나옴
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png"; // myDrawing.png 와 같은 이름으로 이미지를 저장 
  a.click(); // 저장하기 위해 a 태그를 임의로 클릭
  // <a href = "" download = ""> </a> 와 같음
}

canvas.addEventListener("dblclick", onDoubleClick);
// dblclick은 마우스가 더블 클릭한 상태
canvas.addEventListener("mousemove", onMove);
// mousemove는 마우스가 움직일 때마다 이벤트가 발생
canvas.addEventListener("mousedown", startPainting);
// mousedown은 마우스가 눌러지고 있는 상태
canvas.addEventListener("mouseup", cancelPainting);
// mouseup은 마우스를 눌러있다가 뗀 상태
canvas.addEventListener("mouseleave", cancelPainting);
// mouseleave는 마우스가 컨버스의 크기 밖으로 나간 상태 -> 마우스 클릭을 뗏을 때랑 같게 처리하면 됨
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
// 파일에 변화가 생기면 이벤트 발생
saveBtn.addEventListener("click", onSaveClick);