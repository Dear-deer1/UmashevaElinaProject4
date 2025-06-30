document.addEventListener('DOMContentLoaded', () => {
  const galleryContent = document.querySelector('.helpgallerycontent');
  const cards = document.querySelectorAll('.card');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  function getCardWidthAndGap() {
    const gap = parseFloat(getComputedStyle(galleryContent).gap) || 0;
    const cardWidth = cards[0].offsetWidth;
    return { gap, cardWidth };
  }

  let currentIndex = 1;

  function updateSlider() {
    const { gap, cardWidth } = getCardWidthAndGap();
    const offset = (cardWidth + gap) * currentIndex;
    const centeringOffset = (window.innerWidth / 2.3) - (cardWidth / 2.3);
  
    let finalOffset = centeringOffset - offset;
  
    const maxRight = galleryContent.scrollWidth - window.innerWidth;
    const visibleRightEdge = -finalOffset + cardWidth;
  
    if (visibleRightEdge > maxRight) {
      finalOffset = -(maxRight - cardWidth / 4);
    }

    galleryContent.style.transform = `translateX(${finalOffset}px)`;
  }
  
  function updateButtons() {
    prevButton.disabled = currentIndex <= 0;
    nextButton.disabled = currentIndex >= 2;
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
      updateButtons();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < 1) {
      currentIndex++;
      updateSlider();
      updateButtons();
    }
  });

  window.addEventListener('resize', updateSlider);

  updateSlider();
  updateButtons();
});
