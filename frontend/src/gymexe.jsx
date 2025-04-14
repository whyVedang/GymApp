import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useWorkoutContext from './useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
function Gymexe() {
  const { workouts, dispatch } = useWorkoutContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleDelete = async (workoutId) => {
    try {
      const res = await fetch(`http://localhost:4000/workouts/${workoutId}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error('Failed to delete workout');

      dispatch({ type: "DELETE_WORKOUT", payload: { _id: workoutId } });

      console.log("Workout deleted:", workoutId);
    } catch (err) {
      console.error("Error deleting workout:", err);
      setError("Failed to delete workout. Please try again.");
      setTimeout(() => setError(null), 2000);
    }
  };
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch('http://localhost:4000/workouts');
        const data = await res.json();
        console.log(data)
        if (res.ok)
          dispatch({ type: 'UPDATE_WORKOUT', payload: data });
        else
          throw new Error('Failed to fetch workouts');
        console.log(workouts)
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkout();
  }, [dispatch]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120
      }
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 10,
      transition: {
        duration: 0.2
      }
    }
  };

  const deleteButtonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      boxShadow: "0 4px 8px rgba(239, 68, 68, 0.25)",
      transition: { duration: 0.15 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };


  const LoadingComponent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center h-screen bg-gray-900"
    >
      <div className="relative">
        <motion.div
          animate={{
            rotate: 360,
            transition: {
              repeat: Infinity,
              duration: 1.2,
              ease: "linear"
            }
          }}
          className="w-16 h-16 rounded-full border-t-2 border-b-2 border-indigo-500"
        />
        <motion.div
          animate={{
            rotate: -360,
            transition: {
              repeat: Infinity,
              duration: 1.8,
              ease: "linear"
            }
          }}
          className="absolute top-1 left-1 w-14 h-14 rounded-full border-t-2 border-b-2 border-purple-500"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5
          }}
          className="absolute inset-0 flex items-center justify-center text-indigo-400 text-sm font-medium"
        >
          LOADING
        </motion.div>
      </div>
    </motion.div>
  );

  const ErrorComponent = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto mt-12 bg-gradient-to-r from-red-900 to-red-800 text-white px-6 py-5 rounded-lg shadow-lg border border-red-700"
    >
      <div className="flex items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            delay: 0.2
          }}
          className="mr-4 bg-red-700 p-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </motion.div>
        <div>
          <h3 className="font-bold text-lg">Error</h3>
          <p className="text-red-200 mt-1">{error}</p>
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen h-screen overflow-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto pb-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 uppercase tracking-wider">
            Fitness Tracker
          </h1>
          <div className="mt-3 text-gray-400 font-light text-lg">
            Track your progress. Achieve your goals.
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {workouts && workouts.length > 0 ? (
            <motion.div
              key="workout-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {workouts.map((workout) => (
                <motion.div
                  key={workout._id}
                  variants={itemVariants}
                  layout
                  className="backdrop-blur-sm bg-gray-800/80 bg-opacity-80 rounded-xl overflow-hidden shadow-lg border border-gray-700"
                >
                  <div className="px-6 py-5">
                    <h2 className="text-2xl font-semibold text-white mb-4 truncate">
                      {workout.title}
                    </h2>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm uppercase tracking-wider">Reps</span>
                        <span className="bg-indigo-900/50 text-indigo-300 font-medium px-3 py-1 rounded-full text-sm">
                          {workout.reps}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm uppercase tracking-wider">Weight</span>
                        <span className="bg-purple-900/50 text-purple-300 font-medium px-3 py-1 rounded-full text-sm">
                          {workout.weight} kg
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm uppercase tracking-wider">Date :</span>
                        <span className="text-blue-300 font-medium px-3 py-1 rounded-full text-sm">
                          {formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}
                        </span>
                      </div>

                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-2"
                      />
                    </div>

                    <motion.button
                      variants={deleteButtonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handleDelete(workout._id)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-2.5 px-4 rounded-lg shadow-md
                      hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="text-sm font-medium">Delete Exercise</span>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-16 px-4 bg-gray-800/30 rounded-2xl border border-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-300 text-xl font-medium mb-2">No workouts found</p>
              <p className="text-gray-500 text-sm max-w-md text-center">
                Create your first workout to start tracking your fitness journey
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Gymexe;