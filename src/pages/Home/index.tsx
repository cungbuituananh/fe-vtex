import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation("common");
  return <>{t("ok")}</>;
}

export default HomePage;
