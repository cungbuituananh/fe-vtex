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
      className={`transition-all duration-650 ease-in-out `}
      style={{
        position: "absolute",
        top: "0px",
        right: show ? "0px" : "-270px",
        zIndex: 40,
        borderRadius: "8px 0 0 8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        overflowY: show ? "auto" : "hidden",
        overflowX: "hidden",
        height: show ? "100%" : "6%",
        width: "300px",
        background: "white",
      }}
    >
      <div className={"flex items-center gap-3 p-2 "}>
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
          className="opacity-0 animate-fadeIn border-t"
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
