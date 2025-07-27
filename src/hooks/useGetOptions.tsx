import { useState, useEffect } from "react";
import useFetchData from "./useFetchData";
import type { QueryFunctionContext } from "@tanstack/react-query";

function useGetOptions({
  api,
  queryKey,
  labelValueType,
}: {
  api: (context: QueryFunctionContext) => Promise<any>;
  queryKey: string;
  labelValueType: [string, string];
}) {
  const [options, setOptions] = useState([]);

  const { data } = useFetchData({
    queryKey,
    queryFn: api,
  });
  const [label, value] = labelValueType;

  useEffect(() => {
    if (data?.data) {
      const formattedOptions = data.data.map((item: any) => ({
        label: item[label],
        value: item[value],
      }));
      setOptions(formattedOptions);
    }
  }, [data]);

  return { options: options };
}

export default useGetOptions;
