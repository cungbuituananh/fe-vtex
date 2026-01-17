import {
  useQuery,
  type QueryFunctionContext,
  type UseQueryOptions,
} from "@tanstack/react-query";

interface UseFetchDataProps<TData, TError> {
  queryKey: string | string[];
  queryFn: (context: QueryFunctionContext) => Promise<TData>;
  options?: Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn">;
}

function useFetchData<TData = unknown, TError = unknown>({
  queryKey,
  queryFn,
  options = {},
}: UseFetchDataProps<TData, TError>) {
  // Access the client
  const { data, error, isLoading, isError } = useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn,
    ...options,
  });

  return { data: data || [], error, isLoading, isError };
}

export default useFetchData;
