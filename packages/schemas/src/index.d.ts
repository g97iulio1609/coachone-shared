/**
 * @onecoach/schemas
 *
 * UNICA FONTE DI VERITÀ per tutti gli schemi Zod
 * Esportazione centralizzata per uso cross-package
 */
export * from './core/common.schemas';
export * from './core/profile.schemas';
export * from './core/onboarding.schemas';
export * from './core/payment.schemas';
export * from './core/conversations.schemas';
export * from './nutrition/base.schemas';
export * from './nutrition/validation.schemas';
export * from './nutrition/input.schemas';
export * from './nutrition/pattern.schemas';
export { AIMacrosSchema, AIFoodItemSchema as AIMealFoodItemSchema, type AIFoodItem as AIMealFoodItem, } from './nutrition/ai.schemas';
export * from './food/base.schemas';
export * from './food/input.schemas';
export * from './food/ai-generated.schemas';
export * from './exercise/input.schemas';
export * from './one-rep-max';
export * from './workout/base.schemas';
export * from './workout/imported-workout.schema';
export * from './workout/input.schemas';
export * from './workout';
export * from './ai/chat.schemas';
export * from './ai/agents.schemas';
export * from './ai/tool-params.schemas';
export * from './analytics/body-measurements.schemas';
