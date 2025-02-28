import './Loader.scss';

type LoaderProps = {
  visible?: boolean;
};

const Loader = (props: LoaderProps) => {
  const { visible } = props;

  return (
    <div className={`${visible ? "Loader_visible" : "Loader" }`}>
      <div className={`Loader__dots`}>
        <span className={`Loader__dot`}></span>
        <span className={`Loader__dot`}></span>
        <span className={`Loader__dot`}></span>
      </div>
    </div>
  );
};

export default Loader;