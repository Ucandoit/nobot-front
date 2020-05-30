const getStar = (star: number) => {
  if (star === 1) {
    return '\u2606';
  } else if (star === 2) {
    return '\u2606\u2606';
  } else {
    return '';
  }
};

export default {
  getStar
};
