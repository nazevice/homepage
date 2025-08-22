

import River from './River';
import KatanaWithAura from './KatanaWithAura';



function App() {
  return (
    <div className="h-screen w-screen bg-gray-950 overflow-hidden">
      <River />

      <div className="absolute inset-0 flex items-center justify-center">
        <main className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-left max-w-2xl absolute z-20">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 text-white leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Robert<br />Kommeter
              </h1>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-red-500 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Full Stack Software Engineer
              </h2>

              <div className="flex flex-col sm:flex-row sm:justify-start space-y-2 sm:space-y-0 sm:space-x-6 mb-6">
                <a href="https://github.com/nazevice" className="text-gray-200 hover:text-red-700 transition-colors text-base sm:text-lg">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/robertkommeter/" className="text-gray-200 hover:text-red-700 transition-colors text-base sm:text-lg">
                  LinkedIn
                </a>
                <a href="mailto:hello@kommeterr.dev" className="text-gray-200 hover:text-red-700 transition-colors text-base sm:text-lg">
                  hello@kommeterr.dev
                </a>
              </div>
          </div>
          <KatanaWithAura />
        </main>
      </div>
    </div>
  )
}

export default App