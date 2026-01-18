import React from 'react'
import TimetablePlanner from './components/TimetablePlanner'

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-primary">
      {/* Header component (mapped for Locofy) */}
      <header data-locofy-component="Header" className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div>
          {/* Title: make it look like a student scribbled it */}
          <h1 data-locofy-element="Title" className="text-2xl font-semibold app-title handwritten">Study Buddy ✏️</h1>
          {/* small subtitle explaining what the app is for */}
          <div data-locofy-element="Subtitle" className="text-sm text-gray-600">A simple student-built timetable — quick & casual</div>
          {/* NOTE: this header is intentionally casual — feel free to change the emoji */}
        </div>
        <nav data-locofy-element="Nav" className="hidden sm:flex gap-4">
          <button data-locofy-element="PrimaryButton" className="px-3 py-1 rounded bg-studentBlue text-white">New plan</button>
          <button data-locofy-element="SecondaryButton" className="px-3 py-1 rounded bg-studentPink text-white">Load sample</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <TimetablePlanner />
      </main>

      <footer className="max-w-6xl mx-auto p-6 text-sm text-gray-500">
        Built with accessibility & responsive-first design in mind.
      </footer>
    </div>
  )
}
