function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Personal Site</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Built with Vite, React, TypeScript, and Tailwind CSS
          </p>
        </header>
        
        <main className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your personal website is ready to be customized! This is a clean starting point
              with modern tooling including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>⚡ Vite for fast development</li>
              <li>⚛️ React with TypeScript</li>
              <li>🎨 Tailwind CSS for styling</li>
              <li>🌙 Dark mode support</li>
              <li>📱 Responsive design</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App