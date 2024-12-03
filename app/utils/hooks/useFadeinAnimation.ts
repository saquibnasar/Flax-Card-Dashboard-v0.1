export const fadeInAnimationVariants = () => ({
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      // delay: 0.5,
      duration: 0.9,
    },
  },
});

export const zoomOutAnimationVariants = () => ({
  initial: {
    scale: 2,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
});

export const moveInAnimationVariants = () => ({
  initial: {
    x: 250,
    y: 250,
  },
  animate: {
    x: 1,
    y: 0,

    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
});
