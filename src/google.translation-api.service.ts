import { logging } from './util';

export class googleTranslationApi {
  static translateEnToJp(targetEnTxt: string): string {
    const translatedText = (() => {
      try {
        const p = {
          text: targetEnTxt,
          source: 'en',
          target: 'ja'
        };
        return LanguageApp.translate(p.text, p.source, p.target);
      } catch(e) {
        logging("message:" + e.message + "\nfileName:" + e.fileName + "\nlineNumber:" + e.lineNumber + "\nstack:" + e.stack);
      }

    })();
    return translatedText;
  }
}
