import { useContext } from "react"
import { WorkoutContext } from "./WorkoutContext"

function useWorkoutContext(){
  const context=useContext(WorkoutContext)
  
  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutContext Provider")
  }

  
    return context
}

export default useWorkoutContext