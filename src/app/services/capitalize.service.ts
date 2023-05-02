export class CapitalizeService {

    /**
   * This function Capitalizes a word with the CapitalizeService.
   */
    capitalizedWord(word: string) {
        let firstLetter: string = word.charAt(0);
        let firstLetterCap: string = firstLetter.toUpperCase();
        let remainingLetters: string = word.slice(1);
        let capitalized: string = firstLetterCap + remainingLetters;
        return capitalized;
    }
}