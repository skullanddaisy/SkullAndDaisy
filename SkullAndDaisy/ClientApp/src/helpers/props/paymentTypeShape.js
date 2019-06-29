import PropTypes from 'prop-types';

const paymentTypeShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  accountNumber: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired
});

export default paymentTypeShape;
