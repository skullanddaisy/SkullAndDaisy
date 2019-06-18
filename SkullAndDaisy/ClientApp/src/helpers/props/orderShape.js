import PropTypes from 'prop-types';
import productShape from './productShape';

const orderShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  orderStatus: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  orderDate: PropTypes.string.isRequired,
  PaymentTypeId: PropTypes.number,
  userId: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productShape).isRequired,
});

export default orderShape;
