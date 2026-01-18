import React, { useState, useEffect } from 'react'

/*
  Locofy annotations added below as `data-locofy-component` and `data-locofy-element`.
  - Mark repeating structures: `DayColumn` (each column) and `HourRow` (each table row)
  - Mark `Cell` for cell states and `EditorAside` for the sidebar/editor area
  These attributes are harmless in the DOM and help Locofy map layers -> components.
*/

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = Array.from({ length: 12 }, (_, i) => 7 + i) // 7:00 - 18:00

function sampleGrid() {
  return DAYS.map(day => ({ day, slots: HOURS.map(() => null) }))
}

const DEFAULT_SUBJECTS = [
  { id: 'math', name: 'Math', emoji: '📐', color: '#3b82f6' },
  { id: 'eng', name: 'English', emoji: '📚', color: '#fb7185' },
  { id: 'bio', name: 'Biology', emoji: '🧬', color: '#10b981' },
  { id: 'hist', name: 'History', emoji: '🏺', color: '#f59e0b' }
]

export default function TimetablePlanner() {
  const [grid, setGrid] = useState(() => {
    const saved = localStorage.getItem('timetable-grid')
    return saved ? JSON.parse(saved) : sampleGrid()
  })
  const [selected, setSelected] = useState({ dayIndex: 0, hourIndex: 0 })
  const [task, setTask] = useState('')
  const [subjectId, setSubjectId] = useState(DEFAULT_SUBJECTS[0].id)
  const [subjects] = useState(DEFAULT_SUBJECTS)

  useEffect(() => {
    localStorage.setItem('timetable-grid', JSON.stringify(grid))
  }, [grid])

  function addTask() {
    if (!task.trim()) return
    const subj = subjects.find(s => s.id === subjectId)
    setGrid(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      copy[selected.dayIndex].slots[selected.hourIndex] = {
        title: task.trim(),
        subject: subj?.name || '',
        emoji: subj?.emoji || '',
        color: subj?.color || '#ddd'
      }
      return copy
    })
    setTask('')
  }

  function clearSlot(dayIndex, hourIndex) {
    setGrid(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      copy[dayIndex].slots[hourIndex] = null
      return copy
    })
  }

  function loadSample() {
    const g = sampleGrid()
    // add some easy sample items like a student might
    g[0].slots[2] = { title: 'Math homework', subject: 'Math', emoji: '📐', color: '#3b82f6' }
    g[2].slots[4] = { title: 'Read chapter', subject: 'English', emoji: '📚', color: '#fb7185' }
    g[4].slots[1] = { title: 'Biology lab prep', subject: 'Biology', emoji: '🧬', color: '#10b981' }
    setGrid(g)
  }

  function clearAll() {
    if (!confirm('Clear all timetable data?')) return
    const g = sampleGrid()
    setGrid(g)
  }

  // Quick dev helper: print a tiny summary to console so a student can see state
  // (This is intentionally casual — remove in production)
  useEffect(() => {
    console.log('Timetable grid size:', grid.length, 'days')
  }, [grid])

  return (
    <section data-locofy-component="TimetableGrid" className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="overflow-auto border rounded">
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2"></th>
                  {DAYS.map(d => (
                    <th key={d} className="p-2 text-left">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map((h, hourIndex) => (
                  <tr key={h} data-locofy-component="HourRow" className="odd:bg-surface">
                    <td className="p-2 align-top w-24">{h}:00</td>
                    {grid.map((col, dayIndex) => {
                      const cell = col.slots[hourIndex]
                      return (
                        <td key={col.day} data-locofy-component="DayColumn" className="p-2 align-top border-l">
                          <div data-locofy-element="Cell" className="min-h-[48px] flex items-center justify-between">
                            <div className="text-sm">
                              {cell ? (
                                <span className="inline-flex items-center gap-2">
                                  <span data-locofy-component="SubjectPill" className="cell-pill" style={{ backgroundColor: cell.color + '22', color: cell.color }}>
                                    <span className="emoji">{cell.emoji}</span>
                                    {cell.title}
                                  </span>
                                </span>
                              ) : ('')}
                            </div>
                            <div className="flex gap-1">
                              <button
                                data-locofy-element="AddButton"
                                aria-label={`Select ${col.day} ${h}:00`}
                                className="text-xs px-2 py-1 rounded border"
                                onClick={() => setSelected({ dayIndex, hourIndex })}
                              >
                                +
                              </button>
                              {cell && (
                                <button
                                  data-locofy-element="DeleteButton"
                                  className="text-xs px-2 py-1 rounded bg-red-100 text-red-600"
                                  onClick={() => clearSlot(dayIndex, hourIndex)}
                                >
                                  x
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside data-locofy-component="EditorAside" className="w-full lg:w-80">
          <div className="sticky top-6 space-y-3">
            <div className="p-3 border rounded">
              <div className="text-sm text-gray-600">Selected</div>
              <div className="mt-1 font-medium">
                {DAYS[selected.dayIndex]} at {HOURS[selected.hourIndex]}:00
              </div>
            </div>

            <div className="p-3 border rounded">
              <label className="block text-sm font-medium">Subject</label>
              <select
                className="mt-1 w-full border rounded px-2 py-1"
                value={subjectId}
                onChange={e => setSubjectId(e.target.value)}
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>
                ))}
              </select>

              <label className="block text-sm font-medium mt-3">What are you doing?</label>
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={task}
                onChange={e => setTask(e.target.value)}
                placeholder="e.g., Finish exercise 4"
              />

              <div className="mt-3 flex gap-2">
                <button
                  data-locofy-element="AddToSlotButton"
                  onClick={addTask}
                  className="flex-1 px-3 py-2 rounded bg-studentBlue text-white"
                >
                  Add to slot
                </button>
                <button
                  data-locofy-element="CancelButton"
                  onClick={() => { setTask('') }}
                  className="px-3 py-2 rounded border"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="p-3 border rounded text-sm text-gray-600">
              <div className="flex gap-2">
                <button onClick={loadSample} className="px-3 py-1 rounded bg-studentPink text-white">Load sample</button>
                <button onClick={clearAll} className="px-3 py-1 rounded border">Clear all</button>
              </div>
              <div className="mt-2 student-note">Tip: click a + on any cell to select it, choose a subject, type the task and press "Add to slot" — saved locally.</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
