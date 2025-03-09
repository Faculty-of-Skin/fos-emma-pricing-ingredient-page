
export const HeroHeader = () => {
  return (
    <header className="space-y-4">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brutal-black leading-tight font-mono uppercase relative">
        <span className="inline-block transform hover:scale-105 transition-transform duration-300">
          The AI Assistant
        </span>
        <span className="block relative">
          <span className="absolute -inset-1 bg-brutal-gray blur opacity-30"></span>
          For Your Spa Business
        </span>
        <div className="absolute -right-4 -top-4 w-20 h-20 border-4 border-brutal-black rotate-12 bg-brutal-dark opacity-20"></div>
        <div className="absolute -left-4 -bottom-4 w-16 h-16 border-4 border-brutal-black -rotate-12 bg-brutal-gray opacity-20"></div>
      </h1>
    </header>
  );
};
