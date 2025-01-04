import { Helmet } from "react-helmet-async";
import MainPageView from "../../views/MainPageView";

const MainPage = () => {
  return (
    <div>
      <Helmet>
        <title>Tareas</title>
      </Helmet>
      <MainPageView />
    </div>
  );
};

export default MainPage;
