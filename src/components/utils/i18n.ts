import i18n from "../../i18n";

export const t = (namespace: string, id: string) => {
  return i18n.t(`${namespace}.${id}`);
};
export const tCommon = (id: string) => t("common", id);
