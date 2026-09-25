// Scene two lifecycle — a cinematic live composition using Madhu's figure.
// The old supplied montage video is intentionally not used: its embedded
// subject could not be replaced cleanly without changing the source footage.
// The environment artwork remains, while the portfolio's own full-body cutout
// is animated into the centre of the scene.

export async function initUniverse() {
  const section = document.getElementById('universe');
  const scene = section?.querySelector('.universe__scene');
  const veil = document.getElementById('uniVeil');
  if (!section || !scene || !veil) return null;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = { visible: false, entered: false };

  const reveal = () => {
    if (state.entered) return;
    state.entered = true;
    section.classList.add('is-on');
    veil.style.opacity = '0';
  };

  new IntersectionObserver((entries) => {
    for (const e of entries) {
      state.visible = e.isIntersecting;
      if (e.isIntersecting) {
        reveal();
        if (!reduced) scene.classList.add('is-live');
      } else {
        scene.classList.remove('is-live');
      }
    }
  }, { threshold: 0.30 }).observe(section);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state.visible) reveal();
  });

  // Keep reduced-motion behaviour simple: the same composition, no float.
  if (reduced) scene.classList.add('is-reduced');

  return { section, scene };
}
