import { logging } from './util';
import { lineBot } from './linebot.service';

export class gasApi {
  static doGet(e: any): void {
    const event = JSON.parse(e.postData.contents).events[0];
    logging(event);
  }

  // TODO:メソッドの型定義
  static doPost(e: any): any {
    lineBot.replyMessage(e);
  }
}
