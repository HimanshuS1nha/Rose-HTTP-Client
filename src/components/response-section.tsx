const ResponseSection = () => {
  return (
    <div className="px-2 py-3 flex flex-col gap-y-1.5 overflow-y-auto">
      <div className="flex gap-x-4 items-center">
        <p>
          Status: <span className="text-emerald-600 font-semibold">200</span>
        </p>
        <p>
          Size: <span className="text-emerald-600 font-semibold">2 KB</span>
        </p>
        <p>
          Time: <span className="text-emerald-600 font-semibold">300 ms</span>
        </p>
      </div>
    </div>
  );
};

export default ResponseSection;
