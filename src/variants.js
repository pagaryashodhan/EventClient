export function fadeInUp(x1, y1, x2, y2) {
  return {
    initial: { x: x1, y: y1, opacity: 0 },
    animate: {
      x: x2,
      y: y2,
      opacity: 1,
      transition: {
        duration: 1,
        // duraiton: 3,
        ease: "easeInOut",
      },
    },
  };
}
export function staggerContainer(stagger, delay) {
  return {
    initial: {},
    animate: {
      transition: {
        // delay: 10,
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };
}
export function springAnimation(x1, y1, x2, y2, delay) {
  return {
    initial: { x: x1, y: y1, opacity: 0 },
    animate: {
      x: x2,
      opacity: 1,
      y: y2,
      transition: {
        delay: delay,
        duration: 1.2,
        type: "spring",
      },
    },
  };
}
export default staggerContainer;
