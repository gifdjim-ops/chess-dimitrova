const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

document.querySelectorAll('.social-link').forEach((link) => {
  const setOrigin = (event) => {
    const bounds = link.getBoundingClientRect();
    const x = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
    const y = Math.max(0, Math.min(bounds.height, event.clientY - bounds.top));
    const radius = Math.hypot(Math.max(x, bounds.width - x), Math.max(y, bounds.height - y));
    link.style.setProperty('--entry-x', `${x}px`);
    link.style.setProperty('--entry-y', `${y}px`);
    link.style.setProperty('--fill-size', `${Math.ceil(radius * 2 + 4)}px`);
  };

  link.addEventListener('pointerenter', (event) => {
    if (!finePointer.matches) return;
    setOrigin(event);
    link.classList.add('is-hovered');
  });
  link.addEventListener('pointerleave', (event) => {
    if (!finePointer.matches) return;
    setOrigin(event);
    link.classList.remove('is-hovered');
  });
  link.addEventListener('pointercancel', () => link.classList.remove('is-hovered'));
  link.addEventListener('focus', () => {
    if (link.matches(':focus-visible')) {
      const bounds = link.getBoundingClientRect();
      setOrigin({ clientX: bounds.left + bounds.width / 2, clientY: bounds.top + bounds.height / 2 });
    }
  });
});

document.addEventListener('visibilitychange', () => {
  document.querySelectorAll('.float-wrap').forEach((wrapper) => {
    wrapper.style.animationPlayState = document.hidden ? 'paused' : '';
  });
});
