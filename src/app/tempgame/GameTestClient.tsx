'use client'

import { useState } from 'react'

import { uploadGameEntry } from './actions'

const GameTestClient = ({ user }: { user: any }) => {
  const [isLoading, setIsLoading] = useState(false)

  const tempGameData = {
    mode: 'WORDS',
    language: 'EN',
    wpm: 100,
    charsTyped: 120,
    clicks: 130,
    accuracy: (120 / 130) * 100,
    gameDuration: 60,
    wordGoal: 20,
    timeGoal: null,
    timestamp: new Date().toISOString(), // Add a timestamp to identify when the game was played
  }

  const handleUploadGameData = async () => {
    if (!user) {
      console.log('User not logged in. Saving game data locally.')

      // Get existing game data from localStorage
      const storedGameData = JSON.parse(
        localStorage.getItem('gameData') || '[]'
      )

      // Add new game data to the list
      const updatedGameData = [tempGameData, ...storedGameData]

      // Keep only the 10 most recent entries
      if (updatedGameData.length > 10) {
        updatedGameData.pop()
      }

      // Save updated data back to localStorage
      localStorage.setItem('gameData', JSON.stringify(updatedGameData))

      return
    }

    setIsLoading(true)

    try {
      const response = await uploadGameEntry(tempGameData)
      if (response.success) {
        console.log('Game data uploaded successfully!')
      } else {
        console.error('Error uploading game data')
      }
    } catch (error) {
      console.error('Error uploading game data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="game-test-page">
      <h1>Test Game Page</h1>
      <button onClick={handleUploadGameData} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload Game Data'}
      </button>
    </div>
  )
}

export default GameTestClient
