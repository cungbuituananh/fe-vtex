import { Spin } from "antd";

function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16, fontSize: 16, color: "#666" }}>
          Loading Map...
        </div>
      </div>
    </div>
  );
}

export default Loading;
