import { FC } from "react";
import { Helmet } from "react-helmet-async";
import TaskPageView from "../../views/TasksPageView";
import { useParams } from "react-router-dom";

const TaskPage: FC = () => {
  const { username } = useParams<{
    username: string;
  }>();
  if (!username) return <div>No hay usuario</div>;
  return (
    <>
      <Helmet>
        <title>Tareas del usuario tal cual</title>
      </Helmet>
      <TaskPageView username={username} />
    </>
  );
};
export default TaskPage;
