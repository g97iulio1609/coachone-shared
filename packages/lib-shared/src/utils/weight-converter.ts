/**
 * Weight Converter Utilities
 *
 * Utility functions per conversione e formattazione pesi
 */


/**
 * Converte chilogrammi in libbre
 * Gestisce gracefully valori nulli, undefined, NaN o negativi ritornando 0
 * @param kg - Peso in chilogrammi
 * @returns Peso in libbre (0 se input invalido)
 */
export function kgToLbs(kg: number | null | undefined): number {
  // Defensive: gestisci null, undefined, NaN e valori negativi
  if (kg === null || kg === undefined || Number.isNaN(kg) || kg < 0) {
    return 0;
  }
  return kg * 2.20462;
}

/**
 * Converte libbre in chilogrammi
 * Gestisce gracefully valori nulli, undefined, NaN o negativi ritornando 0
 * @param lbs - Peso in libbre
 * @returns Peso in chilogrammi (0 se input invalido)
 */
export function lbsToKg(lbs: number | null | undefined): number {
  // Defensive: gestisci null, undefined, NaN e valori negativi
  if (lbs === null || lbs === undefined || Number.isNaN(lbs) || lbs < 0) {
    return 0;
  }
  return lbs / 2.20462;
}

/**
 * Formatta il peso in base all'unità preferita
 * @param weightKg - Peso in chilogrammi (può essere null)
 * @param weightLbs - Peso in libbre (opzionale, calcolato se non fornito)
 * @param unit - Unità preferita ('KG' o 'LBS')
 * @returns Stringa formattata con valore e unità
 */
export function formatWeightByUnit(
  weightKg: number | null,
  weightLbs: number | null | undefined,
  unit: 'KG' | 'LBS'
): string {
  if (weightKg === null || weightKg === undefined) {
    return 'N/A';
  }
  if (unit === 'LBS') {
    const lbs = weightLbs !== null && weightLbs !== undefined ? weightLbs : (weightKg >= 0 ? kgToLbs(weightKg) : 0);
    return `${lbs.toFixed(1)} lbs`;
  }
  return `${weightKg.toFixed(1)} kg`;
}

/**
 * Ottiene il valore del peso in base all'unità preferita
 * @param weightKg - Peso in chilogrammi (può essere null)
 * @param weightLbs - Peso in libbre (opzionale, può essere null)
 * @param unit - Unità preferita ('KG' o 'LBS')
 * @returns Valore del peso nell'unità richiesta
 */
export function getWeightValue(
  weightKg: number | null | undefined,
  weightLbs: number | null | undefined,
  unit: 'KG' | 'LBS'
): number | undefined {
  if (weightKg === undefined || weightKg === null) {
    return undefined;
  }

  if (unit === 'LBS') {
    return weightLbs !== null && weightLbs !== undefined ? weightLbs : (weightKg >= 0 ? kgToLbs(weightKg) : 0);
  }
  return weightKg;
}

// Note: kgToLbs and lbsToKg are already exported above

/**
 * Sincronizza peso in kg e lbs, assicurando che entrambi siano sempre presenti
 * Se manca uno dei due, lo calcola dall'altro
 * @param weightKg - Peso in chilogrammi (opzionale)
 * @param weightLbs - Peso in libbre (opzionale)
 * @returns Oggetto con weightKg e weightLbs sempre sincronizzati
 */
export function syncWeightUnits(
  weightKg?: number | null,
  weightLbs?: number | null
): { weightKg?: number; weightLbs?: number } | null {
  // Se non abbiamo nessuno dei due valori, ritorna null
  if (!weightKg && !weightLbs) {
    return null;
  }

  let finalWeightKg: number | undefined;
  let finalWeightLbs: number | undefined;

  if (weightKg !== undefined && weightKg !== null && weightKg > 0) {
    // Abbiamo kg, usa quello come fonte di verità
    finalWeightKg = weightKg;
    finalWeightLbs = kgToLbs(weightKg);
  } else if (weightLbs !== undefined && weightLbs !== null && weightLbs > 0) {
    // Abbiamo solo lbs, converti in kg
    finalWeightKg = lbsToKg(weightLbs);
    finalWeightLbs = weightLbs;
  } else {
    // Valori non validi
    return null;
  }

  return {
    weightKg: finalWeightKg,
    weightLbs: finalWeightLbs,
  };
}
