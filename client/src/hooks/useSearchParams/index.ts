import { useSearchParams as useNextSearchParams } from "next/navigation";

export default function useSearchParams(): URLSearchParams {
    const searchParams: URLSearchParams = useNextSearchParams()

    return searchParams
}