import PropTypes from 'prop-types';

const productShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  productTypeId: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
});

export default productShape;
