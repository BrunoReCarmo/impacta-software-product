"use client";

import { Tabs } from "@/components/core";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { SearchKeys } from "@/enum/search-keys";
import useSearchParams from "@/hooks/useSearchParams";
import useAuthOptions from "@/hooks/useAuthOptions";
import useTranslation from "@/lib/i18n";

export default function Options() {
  const router = useRouter();
  const search = useSearchParams();
  const { t } = useTranslation('common')
  const { isRegister } = useAuthOptions()

  const authOptions = useMemo(
    () => [
      { label: t(`sign_in`), value: "login", isActive: !isRegister },
      { label: t(`sign_up`), value: "register", isActive: isRegister },
    ],
    [t, isRegister]
  );

  const handleSwitch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(search.toString());
      params.set(SearchKeys.AuthOptions, value);
      router.push(`?${params.toString()}`);
    },
    [search, router]
  );

  return <Tabs tabs={authOptions} handleSetValue={handleSwitch} />;
}
