import { QueryClient } from "@tanstack/react-query";

const defaultQueryConfig = { staleTime: 60000 }; // staleTime: 1 minute, caches: 5 minutes

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
});