/**
 * Workout Input Schemas
 *
 * Schemi per input API (request validation)
 * UNICA FONTE DI VERITÀ per input workout
 */
import { z } from 'zod';
/**
 * Workout request schema (for consistency)
 */
export declare const workoutRequestBaseSchema: z.ZodObject<{
    goals: z.ZodArray<z.ZodString>;
    difficulty: z.ZodEnum<{
        beginner: "beginner";
        intermediate: "intermediate";
        advanced: "advanced";
    }>;
    durationWeeks: z.ZodNumber;
    daysPerWeek: z.ZodNumber;
    equipmentIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * Workout stream request schema
 */
export declare const workoutStreamRequestSchema: z.ZodObject<{
    goals: z.ZodArray<z.ZodString>;
    difficulty: z.ZodEnum<{
        beginner: "beginner";
        intermediate: "intermediate";
        advanced: "advanced";
    }>;
    durationWeeks: z.ZodNumber;
    daysPerWeek: z.ZodNumber;
    equipmentIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        google: "google";
        anthropic: "anthropic";
        openai: "openai";
        xai: "xai";
        openrouter: "openrouter";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    reasoningEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoningEffort: z.ZodOptional<z.ZodEnum<{
        high: "high";
        medium: "medium";
        low: "low";
    }>>;
}, z.core.$strip>;
/**
 * Workout session creation schema
 */
export declare const createWorkoutSessionSchema: z.ZodObject<{
    programId: z.ZodString;
    weekNumber: z.ZodNumber;
    dayNumber: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Workout session update schema
 */
export declare const updateWorkoutSessionSchema: z.ZodObject<{
    exercises: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * ============================================================================
 * AGENTIC INPUT SCHEMAS (AI Generation Stack)
 * ============================================================================
 */
/**
 * User profile for workout schema
 */
export declare const workoutUserProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    weight: z.ZodNumber;
    height: z.ZodNumber;
    age: z.ZodNumber;
    gender: z.ZodEnum<{
        other: "other";
        male: "male";
        female: "female";
    }>;
    experienceLevel: z.ZodEnum<{
        beginner: "beginner";
        intermediate: "intermediate";
        advanced: "advanced";
    }>;
    currentLifts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    injuries: z.ZodOptional<z.ZodArray<z.ZodString>>;
    fitnessLevel: z.ZodEnum<{
        moderate: "moderate";
        active: "active";
        sedentary: "sedentary";
        light: "light";
        very_active: "very_active";
    }>;
}, z.core.$strip>;
export type WorkoutUserProfile = z.infer<typeof workoutUserProfileSchema>;
/**
 * Workout goals schema
 */
export declare const workoutGoalsSchema: z.ZodObject<{
    primary: z.ZodEnum<{
        strength: "strength";
        hypertrophy: "hypertrophy";
        endurance: "endurance";
        power: "power";
        general_fitness: "general_fitness";
    }>;
    targetMuscles: z.ZodArray<z.ZodString>;
    daysPerWeek: z.ZodNumber;
    duration: z.ZodNumber;
    sessionDuration: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type WorkoutGoals = z.infer<typeof workoutGoalsSchema>;
/**
 * One rep max (1RM) data schema
 */
export declare const oneRepMaxDataSchema: z.ZodObject<{
    exerciseId: z.ZodString;
    exerciseName: z.ZodString;
    weight: z.ZodNumber;
    weightUnit: z.ZodEnum<{
        kg: "kg";
        lbs: "lbs";
    }>;
    dateRecorded: z.ZodCoercedDate<unknown>;
    estimated: z.ZodBoolean;
}, z.core.$strip>;
export type OneRepMaxData = z.infer<typeof oneRepMaxDataSchema>;
/**
 * Exercise Selection Input Schema
 */
export declare const exerciseSelectionInputSchema: z.ZodObject<{
    goals: z.ZodObject<{
        primary: z.ZodEnum<{
            strength: "strength";
            hypertrophy: "hypertrophy";
            endurance: "endurance";
            power: "power";
            general_fitness: "general_fitness";
        }>;
        targetMuscles: z.ZodArray<z.ZodString>;
        daysPerWeek: z.ZodNumber;
        duration: z.ZodNumber;
        sessionDuration: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    constraints: z.ZodObject<{
        equipment: z.ZodArray<z.ZodString>;
        difficulty: z.ZodEnum<{
            beginner: "beginner";
            intermediate: "intermediate";
            advanced: "advanced";
            elite: "elite";
        }>;
        injuries: z.ZodOptional<z.ZodArray<z.ZodString>>;
        timePerSession: z.ZodNumber;
    }, z.core.$strip>;
    preferences: z.ZodOptional<z.ZodObject<{
        preferredExercises: z.ZodOptional<z.ZodArray<z.ZodString>>;
        avoidedExercises: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
    availableExercises: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type ExerciseSelectionInput = z.infer<typeof exerciseSelectionInputSchema>;
/**
 * Workout Planning Input Schema
 */
export declare const workoutPlanningInputSchema: z.ZodObject<{
    selectedExercises: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        exerciseId: z.ZodString;
        category: z.ZodEnum<{
            compound: "compound";
            isolation: "isolation";
            core: "core";
            cardio: "cardio";
            mobility: "mobility";
        }>;
        targetMuscles: z.ZodArray<z.ZodString>;
        equipment: z.ZodArray<z.ZodString>;
        difficulty: z.ZodEnum<{
            beginner: "beginner";
            intermediate: "intermediate";
            advanced: "advanced";
            elite: "elite";
        }>;
        sets: z.ZodNumber;
        reps: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        restSeconds: z.ZodNumber;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    weeklyStructure: z.ZodObject<{
        splitType: z.ZodEnum<{
            custom: "custom";
            full_body: "full_body";
            upper_lower: "upper_lower";
            push_pull_legs: "push_pull_legs";
            bro_split: "bro_split";
        }>;
        workouts: z.ZodArray<z.ZodObject<{
            day: z.ZodString;
            focus: z.ZodString;
            exerciseNames: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    goals: z.ZodObject<{
        primary: z.ZodEnum<{
            strength: "strength";
            hypertrophy: "hypertrophy";
            endurance: "endurance";
            power: "power";
            general_fitness: "general_fitness";
        }>;
        targetMuscles: z.ZodArray<z.ZodString>;
        daysPerWeek: z.ZodNumber;
        duration: z.ZodNumber;
        sessionDuration: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    difficulty: z.ZodEnum<{
        beginner: "beginner";
        intermediate: "intermediate";
        advanced: "advanced";
        elite: "elite";
    }>;
}, z.core.$strip>;
export type WorkoutPlanningInput = z.infer<typeof workoutPlanningInputSchema>;
/**
 * Workout generation input schema (Orchestrator Level)
 */
export declare const workoutGenerationInputSchema: z.ZodObject<{
    userId: z.ZodString;
    userProfile: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        weight: z.ZodNumber;
        height: z.ZodNumber;
        age: z.ZodNumber;
        gender: z.ZodEnum<{
            other: "other";
            male: "male";
            female: "female";
        }>;
        experienceLevel: z.ZodEnum<{
            beginner: "beginner";
            intermediate: "intermediate";
            advanced: "advanced";
        }>;
        currentLifts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        injuries: z.ZodOptional<z.ZodArray<z.ZodString>>;
        fitnessLevel: z.ZodEnum<{
            moderate: "moderate";
            active: "active";
            sedentary: "sedentary";
            light: "light";
            very_active: "very_active";
        }>;
    }, z.core.$strip>;
    goals: z.ZodObject<{
        primary: z.ZodEnum<{
            strength: "strength";
            hypertrophy: "hypertrophy";
            endurance: "endurance";
            power: "power";
            general_fitness: "general_fitness";
        }>;
        targetMuscles: z.ZodArray<z.ZodString>;
        daysPerWeek: z.ZodNumber;
        duration: z.ZodNumber;
        sessionDuration: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    constraints: z.ZodObject<{
        equipment: z.ZodArray<z.ZodString>;
        location: z.ZodEnum<{
            gym: "gym";
            home: "home";
            outdoor: "outdoor";
        }>;
        timePerSession: z.ZodNumber;
    }, z.core.$strip>;
    preferences: z.ZodOptional<z.ZodObject<{
        preferredExercises: z.ZodOptional<z.ZodArray<z.ZodString>>;
        dislikedExercises: z.ZodOptional<z.ZodArray<z.ZodString>>;
        workoutTime: z.ZodOptional<z.ZodEnum<{
            morning: "morning";
            afternoon: "afternoon";
            evening: "evening";
        }>>;
    }, z.core.$strip>>;
    additionalNotes: z.ZodOptional<z.ZodString>;
    availableExercises: z.ZodOptional<z.ZodArray<z.ZodString>>;
    oneRepMaxData: z.ZodOptional<z.ZodArray<z.ZodObject<{
        exerciseId: z.ZodString;
        exerciseName: z.ZodString;
        weight: z.ZodNumber;
        weightUnit: z.ZodEnum<{
            kg: "kg";
            lbs: "lbs";
        }>;
        dateRecorded: z.ZodCoercedDate<unknown>;
        estimated: z.ZodBoolean;
    }, z.core.$strip>>>;
    feedbackData: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
export type WorkoutGenerationInput = z.infer<typeof workoutGenerationInputSchema>;
export type WorkoutRequestBase = z.infer<typeof workoutRequestBaseSchema>;
export type WorkoutStreamRequest = z.infer<typeof workoutStreamRequestSchema>;
export type CreateWorkoutSession = z.infer<typeof createWorkoutSessionSchema>;
export type UpdateWorkoutSession = z.infer<typeof updateWorkoutSessionSchema>;
