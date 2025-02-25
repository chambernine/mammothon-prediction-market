import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGetBalance(address?: string) {
  const { data, error, mutate, isValidating } = useSWR(
    address ? `/api/user-wallet?address=${address}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
    }
  );

  return {
    balance: data?.balance || "0.0000",
    error,
    isLoading: isValidating,
    refetch: mutate,
  };
}
