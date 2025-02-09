import "./SpaceLoader.css";

export const SpaceLoader = () => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-white">
      <svg className="loader" viewBox="25 25 50 50">
        <circle className="loader-circle" r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};
