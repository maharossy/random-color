const colons = document.querySelectorAll('.col');

document.addEventListener('keydown', (e) => {
  e.code === 'Space' ? document.location.reload() : '';
});
// function createRandomColors() {
//   const colorCode = '0123456789ABCDEF';

//   color = '';
//   for (let i = 0; i < 6; i++) {
//     color += colorCode[Math.floor(Math.random() * colorCode.length)];
//   }
//   return '#' + color;
// }
function cracolor() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  return rgb(r, g, b);
}

document.addEventListener('click', (e) => {
  const type = e.target.dataset.type;
  if (type === 'lock') {
    const node =
      e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  }
});

function rgb(red, green, blue) {
  return (
    (red & 0xf0 ? '#' : '#0') + ((red << 16) | (green << 8) | blue).toString(16)
  );
}

function getRandomColor() {
  colons.forEach((col) => {
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    const color = cracolor();
    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

getRandomColor();
