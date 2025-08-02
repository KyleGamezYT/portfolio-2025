import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ShareXRedirect() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      router.replace(`/uploads/${slug}`);
    }
  }, [slug]);

  return null;
}
