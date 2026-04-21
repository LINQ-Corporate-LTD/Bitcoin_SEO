import { useApiData } from "./ApiContext";

/**
 * Returns the dynamic SEO meta fields for a given page from the backend.
 * Falls back to an empty object if no record exists for that pageName.
 *
 * @param {string} pageName - e.g. 'home', 'news', 'faq', 'agenda', etc.
 * @returns {{ pageMetaTitle?: string, pageMetaDescription?: string, pageOgImage?: string }}
 */
export function usePageSeo(pageName) {
  const { pageSeoSettings = [] } = useApiData();
  return pageSeoSettings.find((s) => s.pageName === pageName) || {};
}
