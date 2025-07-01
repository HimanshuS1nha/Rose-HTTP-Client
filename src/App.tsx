import Sidebar from "./components/sidebar";

const App = () => {
  return (
    <main className="flex w-dvw h-dvh">
      <div className="w-[20%] border-r border-r-gray-300">
        <Sidebar />
      </div>
      <div className="w-[45%] border-r border-r-gray-300"></div>
      <div className="w-[35%] border-r border-r-gray-300"></div>
    </main>
  );
};

export default App;
