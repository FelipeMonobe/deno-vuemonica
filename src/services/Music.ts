import type { HarmonicaNote } from "@/domain/Harmonica";
import { diatonicInCNotes } from "@/domain/Harmonica";

export const transpose = (tablature: string, pitchAdjustment = -1): string => {
  const standardizedTablature = _standardizeNotations(tablature);
  const mappedNotes = _mapTablatureToDefinition(
    standardizedTablature,
    diatonicInCNotes
  );
  const transposedTablature = mappedNotes.map((mn: HarmonicaNote | "\\n") => {
    if (mn === "\\n") {
      return { octave: 0, key: "", hole: "\n" } as HarmonicaNote;
    }

    const note = diatonicInCNotes.find(
      (x: HarmonicaNote) =>
        x.octave === mn.octave + pitchAdjustment && x.key === mn.key
    );

    if (!note) {
      throw new Error(`"${mn.hole}" not found for "${pitchAdjustment}" pitch.`);
    }

    return note;
  });

  return transposedTablature
    .map((x: HarmonicaNote) => x.hole)
    .join(" ")
    .replace(/^\s+/gm, "");
};

function _standardizeNotations(tablature: string): string {
  return tablature
    .replace(/(\d'*)\n/g, "$1 \\n ")
    .replace(/(?<![+-])(\d)/g, "+$1");
}

function _mapTablatureToDefinition(
  tablature: string,
  definition: HarmonicaNote[]
): (HarmonicaNote | "\\n")[] {
  const isHoleNotation = /\d/.test(tablature);
  const holeOrKey = isHoleNotation ? "hole" : "key";
  const getNote = (notes: HarmonicaNote[], note: string) => {
    const realNote = notes.find((n: HarmonicaNote) => n[holeOrKey] === note);
    if (!realNote) throw new Error(`Invalid input note ${note}.`);
    return realNote;
  };

  return tablature.split(/\s+/).map((note) => {
    if (/\\n/.test(note)) return "\\n";
    return getNote(definition, note);
  });
}
