import { STYLE_NAV_LINK, STYLE_SUB_TITLE_COMMON } from "@/constants/color";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo_company from "@/assets/imgs/company/logo_company.png";

interface SearchResultProps {
  results: any[];
  onResultClick: (location: any) => void;
  loadMore: () => void;
  totalElements?: number;
}

function SearchResult({
  results,
  onResultClick,
  loadMore,
  totalElements,
}: SearchResultProps) {
  const [show, setShow] = useState(false);

  // const [pagination, setPagination] = useState({ page: 0, size: 10 });

  // const form = Form.useFormInstance();
  const navigate = useNavigate();

  useEffect(() => {
    if (results.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [results]);

  // const handleLoadMore = async () => {
  //   const values = form.getFieldsValue();
  //   const nextPage = pagination.page + 1;
  //   setPagination({ page: nextPage, size: pagination.size });

  //   // Call the loadMore function passed from props
  //   await loadMore(values, nextPage, pagination.size, true);
  // };

  return (
    <div
      className={`transition-all duration-750 ease-in-out `}
      style={{
        position: "absolute",
        top: "0px",
        right: show ? "0px" : "-270px",
        zIndex: 40,
        borderRadius: "8px 0 0 8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        overflowY: show ? "auto" : "hidden",
        overflowX: "hidden",
        height: show ? "100%" : "50px",
        minWidth: "300px",
        maxWidth: "400px",
        background: "#F6F8FB",
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

      <div
        className="opacity-0 animate-fadeIn border-t"
        style={{
          animationDelay: "150ms",
          animationFillMode: "forwards",
        }}
      >
        {results.map((location, index) => (
          <div
            style={{
              cursor: "pointer",
              borderBottom: "1px solid #eee",
              transition: "background-color 0.2s",
            }}
            key={`${location.companyDraftId}-${index}`}
          >
            <div
              onClick={() => onResultClick(location)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
              }}
              className="p-3 hover:bg-gray-100"
            >
              <div className="flex justify-between gap-6">
                <div className="col-8">
                  <Link
                    to={`/company/${location.companyId}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/company/${location.companyId}`);
                    }}
                    className={`${STYLE_NAV_LINK} ${STYLE_SUB_TITLE_COMMON}`}
                  >
                    {location.name}
                  </Link>
                  <div className="px-1">
                    <p>
                      <strong>Nhóm ngành:</strong>{" "}
                      <span>{location.industry}</span>
                    </p>
                    <div className="pb-2">
                      <p>
                        <strong>Hotline:</strong>{" "}
                        <span className="text-blue-500">
                          {location.hotline}
                        </span>
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        <span className="text-blue-500">{location.email}</span>
                      </p>
                      <p>
                        <strong>Website:</strong>{" "}
                        <span className="text-blue-500">
                          {location.website}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <img
                    src={location.logoUrl || logo_company}
                    alt={location.name}
                    className="w-[80px] h-auto rounded-lg shadow-sm object-cover"
                  />
                </div>
              </div>
              <div className=" px-1 flex justify-between items-center">
                {/* <p>
                  <strong>Mở cửa:</strong> {location.workingHours.opening} -{" "}
                  <strong>Đóng cửa:</strong> {location.workingHours.closing}
                </p>
                <p>({location.workingHours.workingDays})</p> */}
              </div>

              <div className="px-1">
                <p>
                  <strong>Văn phòng: </strong>
                  {location.office}
                </p>
                <p>
                  <strong>Nhà máy: </strong>
                  {location.factory}
                </p>
              </div>

              {/* <div className="mt-1 text-end">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      navigate(`/company/${location.id}`);
                    }}
                    style={{
                      // border: "1px solid rgb(105, 105, 105)",
                      borderRadius: "9999px",
                      fontSize: "12px",
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </div> */}
            </div>
          </div>
        ))}
        {/* Handle loadmore button here */}
        {totalElements && results.length < totalElements && (
          <div className="text-center p-2">
            <Button
              type="primary"
              onClick={loadMore}
              style={{
                width: "100%",
                borderRadius: "9999px",
                fontSize: "14px",
              }}
            >
              Xem thêm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
