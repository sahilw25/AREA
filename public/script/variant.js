
const modelViewerVariants = document.querySelector("model-viewer#shoe");
const select = document.querySelector('#variant');

modelViewerVariants.addEventListener('load', () => {
  const names = modelViewerVariants.availableVariants;
  for (const name of names) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  }
  // Adds a default option.
  const option = document.createElement('option');
    option.value = 'default';
    option.textContent = 'Default';
    select.appendChild(option);
});

select.addEventListener('input', (event) => {
  modelViewerVariants.variantName = event.target.value === 'default' ? null : event.target.value;
});
