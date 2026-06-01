import { useState } from 'react'
import PLCLearningApp from './PLCLearningApp'
import PLCAdminDashboard from './PLCAdminDashboard'
import './index.css'

function App() {
  const [view, setView] = useState('user')
  return (
    <div>
      {/* View Toggle — for demo/development */}
      <div className="fixed bottom-5 right-5 z-50 flex gap-2 shadow-xl">
        <button
          onClick={() => setView('user')}
          className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${view === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          👨‍🎓 User View
        </button>
        <button
          onClick={() => setView('admin')}
          className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${view === 'admin' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          🔧 Admin View
        </button>
      </div>
      {view === 'user' ? <PLCLearningApp /> : <PLCAdminDashboard />}
    </div>
  )
}

export default App
