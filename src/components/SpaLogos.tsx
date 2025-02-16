
export const SpaLogos = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-spa-stone text-sm uppercase tracking-wider">
            Works with your favorite spa software
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
            <img 
              src="/lovable-uploads/44cb127a-3102-4e33-bf98-e24271681e14.png" 
              alt="Vagaro" 
              className="h-12 w-auto opacity-70 hover:opacity-100" 
            />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
            <img 
              src="/lovable-uploads/a79d8272-2c27-4c85-9074-5b475398b218.png" 
              alt="Mangomint" 
              className="h-10 w-auto opacity-70 hover:opacity-100" 
            />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
            <img 
              src="/lovable-uploads/2e8d7e13-e806-49be-af90-ea8c2af91109.png" 
              alt="Fresha" 
              className="h-8 w-auto opacity-70 hover:opacity-100" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
