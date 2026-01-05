import { z } from 'zod';
import { workoutDaySchema, workoutProgramSchema } from '../workout/base.schemas';
// ---------------------------------------------------------------------------
// Nutrition Tool Params
// ---------------------------------------------------------------------------
export const ValidateMacrosParamsSchema = z.object({
    macros: z.object({
        calories: z.number(),
        protein: z.number(),
        carbs: z.number(),
        fats: z.number(),
        fiber: z.number().optional(),
    }),
    tolerance: z
        .number()
        .default(0.05)
        .describe('Tolleranza percentuale per validazione (default: 0.05 = 5%)'),
});
export const CalculateNutritionNeedsParamsSchema = z.object({
    weight: z.number().positive().describe('Peso in kg'),
    height: z.number().positive().describe('Altezza in cm'),
    age: z.number().int().positive().describe('Età in anni'),
    gender: z.enum(['male', 'female', 'other']).describe('Genere'),
    activityLevel: z
        .enum(['sedentary', 'light', 'moderate', 'active', 'very_active'])
        .describe('Livello attività fisica'),
    goal: z
        .enum([
        'weight_loss',
        'muscle_gain',
        'maintenance',
        'performance',
        'health',
        'body_recomposition',
    ])
        .describe('Obiettivo nutrizionale'),
    dietType: z
        .enum(['omnivore', 'vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'mediterranean'])
        .default('omnivore')
        .describe('Tipo di dieta'),
});
export const CalculateDayTotalsParamsSchema = z.object({
    meals: z.array(z.object({
        foods: z.array(z.object({
            macros: z.object({
                calories: z.number(),
                protein: z.number(),
                carbs: z.number(),
                fats: z.number(),
            }),
            quantity: z.number(),
        })),
    })),
});
export const AggregateDayParamsSchema = z.object({
    meals: z.array(z.any()), // Keeping as any for flexibility, can be refined later
});
export const CheckFoodAvailabilityParamsSchema = z.object({
    queries: z.array(z.string().min(1)),
});
export const ValidateWeekParamsSchema = z.object({
    week: z.any(), // Keeping as any to allow casting in tool
});
export const SuggestFoodSwapsParamsSchema = z.object({
    currentFoodItemId: z.string().optional(),
    reason: z.string().optional(),
    restrictions: z.array(z.string()).optional(),
    maxResults: z.number().int().min(1).max(20).default(5),
});
export const CalculateMealMacrosParamsSchema = z.object({
    foods: z
        .array(z.object({
        name: z.string().describe("Nome dell'alimento"),
        quantity: z.number().positive().describe('Quantità'),
        unit: z.string().describe('Unità di misura (g, ml, oz, cup, tbsp, tsp, piece)'),
        macrosPer100g: z
            .object({
            calories: z.number(),
            protein: z.number(),
            carbs: z.number(),
            fats: z.number(),
            fiber: z.number().optional(),
        })
            .describe("Macro per 100g dell'alimento"),
    }))
        .describe('Array di alimenti con quantità e macro per 100g'),
});
export const AdjustMealMacrosParamsSchema = z.object({
    foods: z
        .array(z.object({
        name: z.string(),
        quantity: z.number().positive(),
        unit: z.string(),
        macros: z
            .object({
            calories: z.number(),
            protein: z.number(),
            carbs: z.number(),
            fats: z.number(),
        })
            .describe('Macro già calcolati per la quantità specificata'),
    }))
        .describe('Array di alimenti con macro già calcolati'),
    targetMacros: z
        .object({
        calories: z.number(),
        protein: z.number(),
        carbs: z.number(),
        fats: z.number(),
    })
        .describe('Macro target da raggiungere'),
    tolerance: z.number().default(0.05).describe('Tolleranza percentuale (default 5%)'),
    prioritizeMacro: z
        .enum(['calories', 'protein', 'carbs', 'fats'])
        .default('calories')
        .describe('Quale macro prioritizzare per gli aggiustamenti'),
});
export const CreateFoodParamsSchema = z.object({
    foods: z
        .array(z.object({
        name: z.string().min(1).describe('Nome alimento'),
        macrosPer100g: z
            .object({
            calories: z.number(),
            protein: z.number(),
            carbs: z.number(),
            fats: z.number(),
            fiber: z.number().optional(),
        })
            .describe('Macro per 100g'),
        unit: z.string().default('g').describe('Unità di misura'),
        servingSize: z.number().default(100).describe('Porzione standard'),
        description: z.string().optional().describe('Descrizione alimento'),
        brandName: z.string().optional().describe('Nome brand'),
        category: z.string().optional().describe('Categoria alimento'),
    }))
        .describe('Array di alimenti da creare o matchare nel catalogo'),
});
// ---------------------------------------------------------------------------
// Workout Tool Params
// ---------------------------------------------------------------------------
export const ExerciseSetForVolumeSchema = z.object({
    reps: z.number().optional(),
    duration: z.number().optional(),
    weight: z.number().nullable().optional(),
    weightDone: z.number().optional(),
    repsDone: z.number().optional(),
    durationDone: z.number().optional(),
});
export const SetGroupForVolumeSchema = z.object({
    id: z.string(),
    count: z.number(),
    baseSet: ExerciseSetForVolumeSchema,
    sets: z.array(ExerciseSetForVolumeSchema),
});
export const CalculateVolumeParamsSchema = z.object({
    exercises: z.array(z.object({
        name: z.string().optional(),
        setGroups: z.array(SetGroupForVolumeSchema),
    })),
});
export const WorkoutDayTotalsParamsSchema = z.object({
    day: workoutDaySchema,
});
export const ValidateWorkoutWeekParamsSchema = z.object({
    // Using shape accessor to get the week schema if possible, or just re-defining structure
    // For now using safe approach assuming structure matches what was in tool
    week: z.any(),
});
export const ValidateWorkoutProgramParamsSchema = z.object({
    program: workoutProgramSchema,
});
