import { logging } from './util';

const ACCESS_TOKEN =
  'qFEWU3g89aEbZ49ncMQE4oOPxmeAkka8hq9dACUkbFXisKQb+7KIjKjG4g6okeBvfd2IuVy+g9zwfphOMNGkRBx1J1V6nzpL7R70A0MyemT+hfgfBvg2JsmxmD3CbDSCv3AkNrOl2rpYnt7Uz219egdB04t89/1O/w1cDnyilFU=';
const REPLY_URL = 'https://api.line.me/v2/bot/message/reply';
const PUSH_URL = 'https://api.line.me/v2/bot/message/push';

export class MessagingApi {

  static reply(replyToken: string, message: any): any {

    try {
      UrlFetchApp.fetch(REPLY_URL, {
        "headers": {
          "Content-Type": "application/json; charset=UTF-8",
          "muteHttpExceptions": "true",
          "Authorization": "Bearer " + ACCESS_TOKEN,
        },
        "method": "post",
        "payload": JSON.stringify({
          "replyToken": replyToken,
          "messages": [ message ]
        })
      });
      return ContentService.createTextOutput(JSON.stringify({ "content": "post ok" })).setMimeType(
        ContentService.MimeType.JSON
      );
    } catch(e) {
      logging("message:" + e.message + "\nfileName:" + e.fileName + "\nlineNumber:" + e.lineNumber + "\nstack:" + e.stack);
    }
  }

  static push(pushMessage: string): any {
    try {
      UrlFetchApp.fetch(PUSH_URL, {
        "headers": {
          "Content-Type": "application/json; charset=UTF-8",
          "muteHttpExceptions": "true",
          "Authorization": "Bearer " + ACCESS_TOKEN
        },
        "method": "post",
        "payload": JSON.stringify({
          "to": "U5b6b263ee84b0cf9f689749af787a98c",
          "messages": [
            {
              "type": "text",
              "text": pushMessage
            }
          ],
          "notificationDisabled": false
        })
      });
      return ContentService.createTextOutput(JSON.stringify({ "content": "post ok" })).setMimeType(
        ContentService.MimeType.JSON
      );
    } catch (e) {
      logging("message:" + e.message + "\nfileName:" + e.fileName + "\nlineNumber:" + e.lineNumber + "\nstack:" + e.stack);
    }
  }

  static pushFlexBox(flexbox: any): any {
    try {
          UrlFetchApp.fetch(PUSH_URL, {
            "headers": {
              "Content-Type": "application/json; charset=UTF-8",
              "muteHttpExceptions": "true",
              "Authorization": "Bearer " + ACCESS_TOKEN,
            },
            "method": "post",
            "payload": JSON.stringify(flexbox)
        })
        return ContentService.createTextOutput(JSON.stringify({"content": "post ok"})).setMimeType(ContentService.MimeType.JSON);
      } catch(e) {
        logging("message:" + e.message + "\nfileName:" + e.fileName + "\nlineNumber:" + e.lineNumber + "\nstack:" + e.stack);
      }

  }
}