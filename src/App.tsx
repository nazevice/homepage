function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50">
      <div className="absolute inset-0 opacity-5 bg-repeat" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%2315803d' stroke-width='1' fill='none'/%3E%3C/svg%3E")`
           }}>
      </div>
      
      <div className="relative z-10">
        <header className="container mx-auto px-4 pt-12 pb-8">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-red-700">
              🐼 Robert Kommeter
            </div>
            <div className="hidden md:flex space-x-8 text-green-700 font-medium">
              <a href="#about" className="hover:text-red-600 transition-colors">About</a>
              <a href="#projects" className="hover:text-red-600 transition-colors">Projects</a>
              <a href="#blog" className="hover:text-red-600 transition-colors">Blog</a>
              <a href="#contact" className="hover:text-red-600 transition-colors">Contact</a>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-8xl md:text-9xl mb-8 animate-bounce">
              🐼
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
              Robert Kommeter
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Developer • Creator • Panda Enthusiast
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg">
                View My Work
              </button>
              <button className="px-8 py-3 border-2 border-green-600 text-green-700 rounded-full font-medium hover:bg-green-600 hover:text-white transition-all transform hover:scale-105">
                Get In Touch
              </button>
            </div>
          </div>
        </main>
        <footer className="container mx-auto px-4 py-12 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-green-600 hover:text-red-600 transition-colors text-2xl">
              🐙
            </a>
            <a href="#" className="text-green-600 hover:text-red-600 transition-colors text-2xl">
              💼
            </a>
            <a href="#" className="text-green-600 hover:text-red-600 transition-colors text-2xl">
              🐦
            </a>
          </div>
          <div className="flex justify-center items-center space-x-2 text-gray-600">
            <span>Made with</span>
            <span className="text-red-500 text-xl">❤️</span>
            <span>and</span>
            <span className="text-green-500 text-xl">🎋</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App