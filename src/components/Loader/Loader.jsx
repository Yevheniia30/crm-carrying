import DotLoader from "react-spinners/DotLoader";

const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center app">
      <DotLoader
        color="#212529"
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
