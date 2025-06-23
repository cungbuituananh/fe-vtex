interface SearchResultProps {
  results: any[];
  onResultClick: (location: any) => void;
}
function SearchResult({ results, onResultClick }: SearchResultProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        right: "0px",
        zIndex: 40,
        background: "white",
        padding: "15px",
        borderRadius: "8px 0 0 8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        minWidth: "300px",
        height: "100%",
        // maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>
        Kết quả tìm kiếm ({results.length})
      </h4>
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
  );
}

export default SearchResult;
