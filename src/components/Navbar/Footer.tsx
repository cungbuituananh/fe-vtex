import { ImLocation2 } from "react-icons/im";
import { BsTelephone } from "react-icons/bs";

const Footer = () => {
  return (
    <div
      style={{
        // background: "#324150",
        color: "#bfc9d1",
        padding: "12px",
        // fontSize: 18,
        // position: "relative",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          maxWidth: "100vw",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>
            © Công ty TNHH Giải pháp Phát triển Bền vững Dệt May Việt Nam
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span role="img" aria-label="location">
              <ImLocation2 />
            </span>
            <span>
              Tầng 7, tòa nhà C1, Thành Công, Ba Đình, Hà Nội, Việt Nam
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span role="img" aria-label="phone">
              <BsTelephone />
            </span>
            <span>(+84) 943 - 613862</span>
          </div>
        </div>
        <div style={{ textAlign: "right", minWidth: 160 }}>
          <div>Tháng Ba 2022</div>
          <div>Made in Vietnam</div>
          <div>v0.0.2</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
