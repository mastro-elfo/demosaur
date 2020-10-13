import { useLocation } from "react-router-dom";

export default function useSearchParams() {
  const { search } = useLocation();
  return reducer(search);
}

export const reducer = search =>
  search
    // Remove the first "?" character
    .substr(1)
    // Split each pair
    .split("&")
    // Split key/value
    .map(pair => pair.split("="))
    // Reduce to object
    .reduce((carry, [key, value]) => ({ ...carry, [key]: value }), {});
