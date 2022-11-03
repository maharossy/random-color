const colons = document.querySelectorAll('.col');

function createRandomColors() {
  const colorCode = '0123456789ABCDEF';

  color = '';
  for (let i = 0; i < 6; i++) {
    color += colorCode[Math.floor(Math.random() * colorCode.length)];
  }
  return '#' + color;
}

function getRandomColor() {
  colons.forEach((col) => {
    const text = col.querySelector('h2');
    const color = createRandomColors();
    text.textContent = color;
    col.style.background = color;
  });
}

getRandomColor();
