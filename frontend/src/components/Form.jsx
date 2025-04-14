import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useWorkoutContext from '../useWorkoutContext'


function WorkoutForm() {
    const {dispatch}=useWorkoutContext()
    const [title,setTitle]=useState("")
    const [reps,setReps]=useState('')
    const [weight,setWeight]=useState('')
    const nav=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(title,reps,weight)
        const workout={title,reps,weight}
        console.log(workout)
        const response=await fetch('http://localhost:4000/workouts/',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:
            {
                'Content-Type':'application/json'
            }
            })
        const out=await response.json()
        console.log(response)
        if(response.ok)
        {
            console.log('new workout added:', out)
            setTitle('')
            setReps('')
            setWeight('')
            dispatch({ type: 'CREATE_WORKOUT', payload: out })
        }
        console.log("Perfection")
        if(!response.ok)
            console.log("Error adding")
        nav('/')
  }
  
    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8"
        >
            <h2 className="text-center text-3xl font-bold text-white mb-8">Workout Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Workout Title:</label>
                    <motion.input 
                        whileFocus={{ scale: 1.02 }}
                        type="text" 
                        placeholder='Name of exercise'
                        required 
                        value={title} 
                        onChange={(e)=>setTitle(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Reps:</label>
                    <motion.input 
                        whileFocus={{ scale: 1.02 }}
                        type="Number" 
                        placeholder='Reps x No'
                        required 
                        value={reps} 
                        onChange={(e)=>setReps(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Weight:</label>
                    <motion.input 
                        whileFocus={{ scale: 1.02 }}
                        type='Number'
                        placeholder='Weight in kgs'
                        required 
                        value={weight} 
                        onChange={(e)=>setWeight(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold uppercase tracking-wide 
                    hover:bg-emerald-700 transition-all duration-300 ease-in-out"
                >
                    Add Workout
                </motion.button>
            </form>
        </motion.div>
    </div>
  )
}

export default WorkoutForm