/**
 * AI Nutrition Schemas - SINGLE SOURCE OF TRUTH
 *
 * Schemas specifici per la generazione AI nel dominio nutrizione.
 * Include definizioni per gli output dei meal composer e nutrition agents.
 *
 * @module @onecoach/schemas/nutrition/ai
 */
import { z } from 'zod';
/**
 * Macros schema with stricter limits for AI generation context
 */
export declare const AIMacrosSchema: z.ZodObject<{
    calories: z.ZodNumber;
    protein: z.ZodNumber;
    carbs: z.ZodNumber;
    fats: z.ZodNumber;
    fiber: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * AI Food Item Schema
 * Represents a food item generated or processed by AI.
 * Includes optional metadata fields like barcode/brand that might be inferred.
 */
export declare const AIFoodItemSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    quantity: z.ZodNumber;
    unit: z.ZodDefault<z.ZodString>;
    macros: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    notes: z.ZodOptional<z.ZodString>;
    foodItemId: z.ZodOptional<z.ZodString>;
    brandName: z.ZodOptional<z.ZodString>;
    barcode: z.ZodOptional<z.ZodString>;
    servingSize: z.ZodOptional<z.ZodNumber>;
    imageUrl: z.ZodOptional<z.ZodString>;
    done: z.ZodOptional<z.ZodBoolean>;
    actualQuantity: z.ZodOptional<z.ZodNumber>;
    actualMacros: z.ZodOptional<z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type AIFoodItem = z.infer<typeof AIFoodItemSchema>;
