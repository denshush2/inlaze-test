import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useRouter = () => {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
      blank: (href: string) => window.open(href, "_blank"),
    }),
    [navigate]
  );

  return router;
};
