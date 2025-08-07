import ProjectList from "./components/ProjectList";
import FeaturedProjects from "./components/FeaturedProjects";
import ErrorProjectList from "./components/ErrorProjectList";
function App() {
  return (
    <div>
      <h1>Apollo Client Mastery</h1>
      {/* <ProjectList /> */}
      {/* <FeaturedProjects /> */}
      <ErrorProjectList />
    </div>
  );
}

export default App;
