import { FaStar } from 'react-icons/fa';

const Star = function ({color = 'red', rating}) {
  return (
    <>
      <FaStar color={color} />{rating}
    </>
  );
}

export default Star;