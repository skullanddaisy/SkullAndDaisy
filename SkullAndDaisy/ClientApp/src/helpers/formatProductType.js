const formatProductType = (productTypeId) => {
  if (productTypeId === 1) {
    return 'Potion';
  } if (productTypeId === 2) {
    return 'Poison';
  } if (productTypeId === 3) {
    return 'Herb';
  } return 'Healing Crystal';
};

export default formatProductType;
