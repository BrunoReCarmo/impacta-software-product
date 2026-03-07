"use client"

import commonPt from "@/locales/pt/common.json";
import { createContext, useContext, ReactNode } from "react";

type NamespaceMap = {
  [namespace: string]: Record<string, any>;
};

const translations: NamespaceMap = {
  common: commonPt,
};

const I18nContext = createContext<NamespaceMap>(translations);

export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nContext.Provider value={translations}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook para usar traduções
 * @example
 * const { t } = useTranslation();
 * t("linktree__banner__title")
 * t("offer_percentage", { value: 50 }) // "50% OFF 🔥"
 *
 * // com namespace
 * const { t } = useTranslation("seo");
 * t("1__title")
 */
export function useTranslation(ns: keyof typeof translations = "common") {
  const dicts = useContext(I18nContext);
  const dict = dicts[ns];

  const t = (key: string, params?: Record<string, string | number>) => {
    // Support nested keys with dot notation (e.g., "groups_to_join.1.title")
    const keys = key.split(".");
    let value: unknown = dict;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = undefined;
        break;
      }
    }
    let text = typeof value === "string" ? value : key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{{\\s*${k}\\s*}}`, "g"), String(v));
      });
    }
    return text;
  };

  return { t };
}

/**
 * Componente Trans para traduções com HTML
 * @example
 * <Trans i18nKey="vitrine_title" />
 * <Trans i18nKey="1__title" ns="seo" />
 */
export function Trans({ 
  i18nKey, 
  values, 
  ns,
}: { 
  i18nKey: string; 
  values?: Record<string, string | number>;
  ns?: keyof typeof translations;
}) {
  const { t } = useTranslation(ns);
  const text = t(i18nKey, values);

  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

export default useTranslation;
