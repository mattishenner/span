import { writable } from 'svelte/store';

export const workoutData = writable({
  workoutLength: 30,
  bodyPartFocus: 'fullbody',
  workoutDifficulty: 'intermediate',
  workoutGoal: 'strength'
});