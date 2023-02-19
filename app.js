const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
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

canvas.addEventListener("mousemove", onMove);
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