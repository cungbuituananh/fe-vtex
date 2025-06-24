import { Button } from "antd";
import { useEffect, useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

interface SearchResultProps {
  results: any[];
  onResultClick: (location: any) => void;
}

function SearchResult({ results, onResultClick }: SearchResultProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (results.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [results]);

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        show ? "translate-x-0" : ""
      }`}
      style={{
        position: "absolute",
        top: "0px",
        right: "0px",
        zIndex: 40,
        borderRadius: "8px 0 0 8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        overflowY: show ? "auto" : "hidden",
        overflowX: "hidden",
        ...(show && { height: "100%", width: "300px", background: "white" }),
      }}
    >
      <div
        className={`${show && "flex items-center gap-3 py-2 px-3 border-b"}`}
      >
        <Button
          type="text"
          className="cursor-pointer flex-shrink-0"
          onClick={() => setShow(!show)}
          style={{ padding: 0 }}
        >
          {show ? (
            <FiArrowRightCircle style={{ fontSize: "20px" }} />
          ) : (
            <FiArrowLeftCircle style={{ fontSize: "20px" }} />
          )}
        </Button>
        {show && (
          <>
            <span> | </span>
            <span className="font-semibold text-base whitespace-nowrap">
              Bộ lọc tìm kiếm
            </span>
          </>
        )}
      </div>

      {show && (
        <div
          className="opacity-0 animate-fadeIn"
          style={{
            animationDelay: "150ms",
            animationFillMode: "forwards",
          }}
        >
          {results.map((location) => (
            <div
              key={location.id}
              onClick={() => onResultClick(location)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
              }}
            >
              <strong>{location.label}</strong>
              <br />
              <small style={{ color: "#666" }}>
                {location.coordinates[1].toFixed(4)},{" "}
                {location.coordinates[0].toFixed(4)}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
