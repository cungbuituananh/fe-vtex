import { useQuery } from "@tanstack/react-query";

interface UseFetchDataProps {
  queryKey: string | string[];
  queryFn: () => Promise<any>;
}

function useFetchData({ queryKey, queryFn }: UseFetchDataProps) {
  // Access the client
  const { data, error, isLoading, isError } = useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn,
  });
  console.log("error: ", error);

  return { data, error, isLoading, isError };
}

export default useFetchData;
