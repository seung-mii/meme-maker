const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// ctx(context) : canvas에서 사용할 브러쉬
canvas.width = 800;
canvas.height = 800;
// convas의 이미지 퀄리티를 높이기 위해 css에서 안 건드리고 js에서 canvas의 가로, 세로 크기를 조정 

ctx.skroke(0, 0, 10, 10); // .skroke : 실선을 그림
ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.fill();
ctx.rect(300, 300, 50, 50); 
// .rect들 후에 .fill을 하지 않으면 선만 그렸으므로 보이지 않음

ctx.beginPath(); // 이전 경로와 단절
// 다 같은 경로에 있는 그림들이라 beginPath()를 하지 않으면 앞선 검은색 사각형들까지 빨간색으로 바뀜
ctx.rect(350, 350, 100, 100);
ctx.rect(450, 450, 100, 100);
ctx.fillStyle = "red";
ctx.fill();

// 집 만들기
ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);
ctx.fillRect(300, 300, 50, 100);
ctx.fillRect(200, 200, 200, 20);
ctx.moveTo(200, 200); // moveTo: 선을 긋지 않으면서 연필을 움직임
ctx.lineTo(325, 100); // lineto : 선을 그으면서 연필을 움직임
ctx.lineTo(450, 200); 

// 사람 만들기
ctx.fillRect(210 - 40, 200 - 30, 15, 100);
ctx.fillRect(350 - 40, 200 - 30, 15, 100);
ctx.fillRect(260 - 40, 200 - 30, 60, 200);

ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(260 + 10, 80, 8, Math.PI, 2 * Math.PI); // 윗쪽 반달이 됨
ctx.arc(220 + 10, 80, 8, Math.PI, 2 * Math.PI);
// 원의 오른쪽 지점이 0이고, 0.5 * PI 는 아래 지점, 1 * PI 는 왼쪽 지점, 1.5 * PI은 위 지점, 그리고 다시 오른쪽 지점은 2 * PI 이다.
ctx.fill();