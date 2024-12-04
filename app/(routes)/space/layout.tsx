const SpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-screen flex">
      <div className="flex-grow w-full h-full overflow-x-hidden overflow-y-hidden">
        {children}
      </div>
    </div>
  );
};

export default SpaceLayout;
