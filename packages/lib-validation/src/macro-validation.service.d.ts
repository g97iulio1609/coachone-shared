/**
 * Macro Validation Service
 *
 * Centralized service for macro validation and coherence checking.
 * This is a domain-agnostic validation service that can be used by
 * any package needing macro validation (nutrition, AI agents, etc).
 */
import { type Macros, type MacroCoherenceResult } from '@onecoach/lib-shared';
/**
 * Validation result for Atwater formula
 */
export interface AtwaterValidationResult {
    valid: boolean;
    expectedCalories: number;
    actualCalories: number;
    difference: number;
    differencePercent: number;
    message: string;
}
/**
 * Structure for meal validation
 */
interface MealStructure {
    name: string;
    foods: Macros[];
    expectedMealMacros: Macros;
}
/**
 * Hierarchical validation result for foods → meal → daily
 */
export interface HierarchicalValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
    details: {
        foodsToMeal?: MacroCoherenceResult;
        mealsToDaily?: MacroCoherenceResult;
        atwaterChecks?: AtwaterValidationResult[];
    };
}
/**
 * MacroValidationService
 *
 * Domain-agnostic service for validating macro nutrient data.
 * Provides validation for:
 * - Atwater formula coherence (calories match macros)
 * - Foods → Meal aggregation
 * - Meals → Daily totals aggregation
 * - Target comparison validation
 */
export declare class MacroValidationService {
    static validateAtwaterFormula(macros: Macros, tolerance?: number): AtwaterValidationResult;
    static validateFoodsToMeal(foodMacros: Macros[], mealMacros: Macros, tolerance?: number, context?: string): MacroCoherenceResult;
    static validateMealsToTotal(mealMacros: Macros[], totalMacros: Macros, tolerance?: number, context?: string): MacroCoherenceResult;
    static validateMealsToDaily(mealMacros: Macros[], totalMacros: Macros, tolerance?: number, context?: string): MacroCoherenceResult;
    static validateHierarchy(structure: {
        meals: MealStructure[];
        expectedDailyMacros: Macros;
    }, tolerance?: number): HierarchicalValidationResult;
    static validateAgainstTarget(actual: Macros, target: Macros, tolerance?: number, context?: string): MacroCoherenceResult;
}
export {};
//# sourceMappingURL=macro-validation.service.d.ts.map