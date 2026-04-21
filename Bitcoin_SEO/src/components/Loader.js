const Loader = () => {
  return (
    <div
      className="loader-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="loader-icon"
        style={{
          fill: "var(--primary-color)",
          height: "70px",
          width: "70px",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              transform={`rotate(${i * 45} 16 16)`}
              cx="16"
              cy="3"
              r="0"
            >
              <animate
                attributeName="r"
                values="0;3;0;0"
                dur="1s"
                repeatCount="indefinite"
                begin={`${i * 0.125}s`}
                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                calcMode="spline"
              />
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Loader;