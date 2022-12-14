const colons = document.querySelectorAll('.col');

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  //   e.code === 'Space' ? document.location.reload() : '';
  if (e.code.toLowerCase() == 'space') {
    getRandomColor();
  }
});

document.addEventListener('click', (e) => {
  const type = e.target.dataset.type;
  if (type === 'lock') {
    const node =
      e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyText(e.target.textContent);
  }
});

// function createRandomColors() {
//   const colorCode = '0123456789ABCDEF';

//   color = '';
//   for (let i = 0; i < 6; i++) {
//     color += colorCode[Math.floor(Math.random() * colorCode.length)];
//   }
//   return '#' + color;
// }

function copyText(text) {
  return navigator.clipboard.writeText(text);
}
// function cracolor() {
//   const r = Math.random() * 255;
//   const g = Math.random() * 255;
//   const b = Math.random() * 255;
//   return rgb(r, g, b);
// }

// function rgb(red, green, blue) {
//   return (
//     (red & 0xf0 ? '#' : '#0') + ((red << 16) | (green << 8) | blue).toString(16)
//   );
// }

function getRandomColor(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];
  colons.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('h2');
    const button = col.querySelector('button');

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color);
  }
  return [];
}

getRandomColor(true);
