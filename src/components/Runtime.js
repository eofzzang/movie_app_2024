import { BsStopwatch } from "react-icons/bs";

const Runtime = function ({ runtime }) {
  return (
    <>
      <BsStopwatch />{runtime}min
    </>
  );
}

export default Runtime;