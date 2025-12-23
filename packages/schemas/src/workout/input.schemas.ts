/**
 * Workout Input Schemas
 *
 * Schemi per input API (request validation)
 * UNICA FONTE DI VERITÀ per input workout
 */

import { z } from 'zod';
import { tierConfigSchema, reasoningConfigSchema } from '../nutrition/input.schemas';
import { cuid2Schema } from '../core/common.schemas';

// Validation constants
const VALIDATION_CONSTANTS = {
  MIN_DURATION_WEEKS: 1,
  MAX_DURATION_WEEKS: 16,
  MIN_DAYS_PER_WEEK: 2,
  MAX_DAYS_PER_WEEK: 6,
} as const;

/**
 * Workout request schema (for consistency)
 */
export const workoutRequestBaseSchema = z.object({
  goals: z.array(z.string()).min(1, 'Almeno un obiettivo richiesto'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced'], {
    message: 'Difficoltà non valida',
  }),
  durationWeeks: z
    .number()
    .int()
    .min(VALIDATION_CONSTANTS.MIN_DURATION_WEEKS)
    .max(VALIDATION_CONSTANTS.MAX_DURATION_WEEKS),
  daysPerWeek: z
    .number()
    .int()
    .min(VALIDATION_CONSTANTS.MIN_DAYS_PER_WEEK)
    .max(VALIDATION_CONSTANTS.MAX_DAYS_PER_WEEK),
  equipmentIds: z.array(z.string()).optional(),
});

/**
 * Workout stream request schema
 */
export const workoutStreamRequestSchema = workoutRequestBaseSchema
  .extend(tierConfigSchema.shape)
  .extend(reasoningConfigSchema.shape);

/**
 * Workout session creation schema
 */
export const createWorkoutSessionSchema = z.object({
  programId: cuid2Schema('ID programma non valido'),
  weekNumber: z.number().int().min(1, 'Numero settimana non valido'),
  dayNumber: z.number().int().min(1, 'Numero giorno non valido'),
  notes: z.string().optional(),
});

/**
 * Workout session update schema
 */
export const updateWorkoutSessionSchema = z.object({
  exercises: z.array(z.any()).optional(), // Validated by workout types
  completedAt: z.coerce.date().nullable().optional(),
  notes: z.string().optional(),
});

/**
 * ============================================================================
 * AGENTIC INPUT SCHEMAS (AI Generation Stack)
 * ============================================================================
 */

/**
 * User profile for workout schema
 */
export const workoutUserProfileSchema = z.object({
  name: z.string().optional(),
  weight: z.number().min(1),
  height: z.number().min(1),
  age: z.number().min(1),
  gender: z.enum(['male', 'female', 'other']),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  currentLifts: z.record(z.string(), z.number()).optional(),
  injuries: z.array(z.string()).optional(),
  fitnessLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
});
export type WorkoutUserProfile = z.infer<typeof workoutUserProfileSchema>;

/**
 * Workout goals schema
 */
export const workoutGoalsSchema = z.object({
  primary: z.enum(['strength', 'hypertrophy', 'endurance', 'power', 'general_fitness']),
  targetMuscles: z.array(z.string()),
  daysPerWeek: z.number().min(1).max(7),
  duration: z.number().min(1).max(4), // Max 4 weeks for performance
  sessionDuration: z.number().min(15).optional(),
});
export type WorkoutGoals = z.infer<typeof workoutGoalsSchema>;

/**
 * One rep max (1RM) data schema
 */
export const oneRepMaxDataSchema = z.object({
  exerciseId: z.string().min(1),
  exerciseName: z.string().min(1),
  weight: z.number().min(0),
  weightUnit: z.enum(['kg', 'lbs']),
  dateRecorded: z.coerce.date(),
  estimated: z.boolean(),
});
export type OneRepMaxData = z.infer<typeof oneRepMaxDataSchema>;

/**
 * Exercise Selection Input Schema
 */
export const exerciseSelectionInputSchema = z.object({
  goals: workoutGoalsSchema,
  constraints: z.object({
    equipment: z.array(z.string()),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'elite']),
    injuries: z.array(z.string()).optional(),
    timePerSession: z.number(),
  }),
  preferences: z
    .object({
      preferredExercises: z.array(z.string()).optional(),
      avoidedExercises: z.array(z.string()).optional(),
    })
    .optional(),
  availableExercises: z.array(z.string()).optional(),
});
export type ExerciseSelectionInput = z.infer<typeof exerciseSelectionInputSchema>;

/**
 * Workout Planning Input Schema
 */
export const workoutPlanningInputSchema = z.object({
  selectedExercises: z.array(
    z.object({
      name: z.string(),
      exerciseId: z.string(),
      category: z.enum(['compound', 'isolation', 'cardio', 'core', 'mobility']),
      targetMuscles: z.array(z.string()),
      equipment: z.array(z.string()),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'elite']),
      sets: z.number(),
      reps: z.union([z.string(), z.number()]),
      restSeconds: z.number(),
      notes: z.string().optional(),
    })
  ),
  weeklyStructure: z.object({
    splitType: z.enum(['full_body', 'upper_lower', 'push_pull_legs', 'bro_split', 'custom']),
    workouts: z.array(
      z.object({
        day: z.string(),
        focus: z.string(),
        exerciseNames: z.array(z.string()),
      })
    ),
  }),
  goals: workoutGoalsSchema,
  difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'elite']),
});
export type WorkoutPlanningInput = z.infer<typeof workoutPlanningInputSchema>;

/**
 * Workout generation input schema (Orchestrator Level)
 */
export const workoutGenerationInputSchema = z.object({
  userId: z.string().min(1),
  userProfile: workoutUserProfileSchema,
  goals: workoutGoalsSchema,
  constraints: z.object({
    equipment: z.array(z.string()),
    location: z.enum(['gym', 'home', 'outdoor']),
    timePerSession: z.number().min(1),
  }),
  preferences: z
    .object({
      preferredExercises: z.array(z.string()).optional(),
      dislikedExercises: z.array(z.string()).optional(),
      workoutTime: z.enum(['morning', 'afternoon', 'evening']).optional(),
    })
    .optional(),
  additionalNotes: z.string().optional(),
  availableExercises: z.array(z.string()).optional(),
  oneRepMaxData: z.array(oneRepMaxDataSchema).optional(),
  feedbackData: z.any().optional(), // Flexible feedback from agents
});
export type WorkoutGenerationInput = z.infer<typeof workoutGenerationInputSchema>;

export type WorkoutRequestBase = z.infer<typeof workoutRequestBaseSchema>;
export type WorkoutStreamRequest = z.infer<typeof workoutStreamRequestSchema>;
export type CreateWorkoutSession = z.infer<typeof createWorkoutSessionSchema>;
export type UpdateWorkoutSession = z.infer<typeof updateWorkoutSessionSchema>;
