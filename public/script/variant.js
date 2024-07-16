
// const modelViewerVariants = document.querySelector("model-viewer#shoe");
// const select = document.querySelector('#variant');

// modelViewerVariants.addEventListener('load', () => {
//   const names = modelViewerVariants.availableVariants;
//   for (const name of names) {
//     const option = document.createElement('option');
//     option.value = name;
//     option.textContent = name;
//     select.appendChild(option);
//   }
//   // Adds a default option.
//   const option = document.createElement('option');
//     option.value = 'default';
//     option.textContent = 'Default';
//     select.appendChild(option);
// });

// select.addEventListener('input', (event) => {
//   modelViewerVariants.variantName = event.target.value === 'default' ? null : event.target.value;
// });





  const modelViewerVariants = document.querySelector("model-viewer"); 
  const select = document.querySelector('#variant'); 
  modelViewerVariants.addEventListener('load', () => { 
    const names = modelViewerVariants.availableVariants; 
    for (const name of names) { 
      const color = document.createElement('button'); 
      color.value = name; 
      color.textContent = name; 
      color.classList.add('button-35');
      select.appendChild(color); 
    } 
  }); 
    document.getElementById('variant').addEventListener('click', (event) => { modelViewerVariants.variantName = event.target.value;
  });

