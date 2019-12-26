import { MessagingApi } from './messaging-api.service';
import { logging } from './util';

export class wordsApi {
  static getHowToUseWord(targetWord: string): any {
    const response = (() => {
      try {
        return UrlFetchApp.fetch(
          'https://wordsapiv1.p.rapidapi.com/words/' + targetWord + '/examples',
          {
            headers: {
              'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
              'x-rapidapi-key': '4f4bfe681dmsh849b898ce9458cap1e3beajsn9ea061edab8d'
            },
            method: 'get'
          }
        ).getContentText();

      } catch(e) {
        logging("message:" + e.message + "\nfileName:" + e.fileName + "\nlineNumber:" + e.lineNumber + "\nstack:" + e.stack);
      }
    })();
    const content = JSON.parse(response);
    if (content.examples[0] == undefined) {
      MessagingApi.push('例文が見つからなかったよ');
      return;
    }
    return content.examples[0];
  }
}
