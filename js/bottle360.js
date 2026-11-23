(() => {
  const viewer = document.getElementById('bottle360');
  if (!viewer) return;
  const image = document.getElementById('bottle360Image');
  if (!image) return;

  const total = 20;
  const mod = value => (value % total + total) % total;
  const src = index => `images/botella-360/display/frame-${String(mod(index)).padStart(2, '0')}.webp?v=4`;

  // Precarga sólo el frame actual y sus vecinos, no los 20 a la vez.
  const preloaded = new Set();
  function preload(index) {
    const i = mod(index);
    if (preloaded.has(i)) return;
    preloaded.add(i);
    const img = new Image();
    img.decoding = 'async';
    img.src = src(i);
  }

  let frame = 0;
  let dragStartX = null;
  let dragStartFrame = 0;

  function showFrame(index) {
    const next = mod(index);
    if (next === frame) return;
    frame = next;
    image.src = src(frame);
    preload(frame + 1);
    preload(frame - 1);
  }

  preload(1);
  preload(total - 1);

  viewer.addEventListener('pointerdown', event => {
    dragStartX = event.clientX;
    dragStartFrame = frame;
    viewer.setPointerCapture?.(event.pointerId);
  });
  viewer.addEventListener('pointermove', event => {
    if (dragStartX === null) return;
    const steps = Math.round((dragStartX - event.clientX) / 12);
    showFrame(dragStartFrame + steps);
  });
  const endDrag = () => { dragStartX = null; };
  viewer.addEventListener('pointerup', endDrag);
  viewer.addEventListener('pointercancel', endDrag);
  viewer.addEventListener('lostpointercapture', endDrag);
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showFrame(frame + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showFrame(frame - 1);
    }
  });
})();
