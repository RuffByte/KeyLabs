'use client'

import { useEffect, useState } from 'react'

// Define the structure of the leaderboard entry
interface LeaderboardEntry {
  id: string
  user: {
    name: string
  } | null
  wpm: number
  accuracy: number
  charsTyped: number
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/data/leaderboard')
        const data: LeaderboardEntry[] = await response.json()
        setLeaderboardData(data)
      } catch (error) {
        console.error('Error fetching leaderboard data:', error)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-6">Top 50 Scores (All Time)</h1>
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Player
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                WPM
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Accuracy
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                LettersTyped
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.length > 0 ? (
              leaderboardData.map((entry, index) => (
                <tr
                  key={entry.id}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.user?.name || 'Anonymous'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.wpm}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.accuracy.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.charsTyped}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
