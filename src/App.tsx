import Sidebar from "@/components/sidebar";
import RequestSection from "@/components/request-section";
import ResponseSection from "./components/response-section";

const App = () => {
  return (
    <main className="flex w-dvw h-dvh">
      <div className="w-[20%] border-r border-r-gray-300">
        <Sidebar />
      </div>
      <div className="w-[45%] border-r border-r-gray-300">
        <RequestSection />
      </div>
      <div className="w-[35%] border-r border-r-gray-300">
        <ResponseSection />
      </div>
    </main>
  );
};

export default App;
