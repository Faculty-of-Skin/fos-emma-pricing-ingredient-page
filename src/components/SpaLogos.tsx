
export const SpaLogos = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-spa-stone text-sm uppercase tracking-wider">
            Works with your favorite spa software
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center max-w-5xl mx-auto">
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
            <img src="/placeholder.svg" alt="Vagaro" className="h-8 w-auto opacity-70 hover:opacity-100" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
            <img src="/placeholder.svg" alt="MINDBODY" className="h-8 w-auto opacity-70 hover:opacity-100" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
            <img src="/placeholder.svg" alt="Booker" className="h-8 w-auto opacity-70 hover:opacity-100" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
            <img src="/placeholder.svg" alt="Zenoti" className="h-8 w-auto opacity-70 hover:opacity-100" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all md:col-span-4 lg:col-span-1">
            <img src="/placeholder.svg" alt="Phorest" className="h-8 w-auto opacity-70 hover:opacity-100" />
          </div>
        </div>
      </div>
    </section>
  );
};
