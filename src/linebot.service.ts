import { getDataSheat, logging, checkEnglish } from './util';
import { Question } from './question.service';
import { MessagingApi } from './messaging-api.service';
import { vocaBook } from './vocabook.service';
import { googleTranslationApi } from './google.translation-api.service';
import { wordsApi } from './wordsapi.service';
import { getExampleText } from './flexbox-data/example-textdara';


export class lineBot {

  static replyMessage(e: any): any {
    // WebHookで受信した応答用Token
    const replyToken = JSON.parse(e.postData.contents).events[0].replyToken;

    JSON.parse(e.postData.contents).events.map(function(event) {

      switch (event.type) {
        // ユーザーからメッセージがきた時
        case 'message':
          // ユーザーのメッセージを取得
          const userMessage = JSON.parse(e.postData.contents).events[0].message.text;

          // 「えいご」以外のメッセージは受け付けない
          if (userMessage == 'えいご') {
            Question.pushTodayQuestion(replyToken);
          }

          if (userMessage == 'この英単語を追加します') {
            const addWord = getDataSheat()
              .getRange(8, 4)
              .getValue();
            if (addWord) {
              MessagingApi.push(addWord + 'を追加します');
              vocaBook.addWordSet(addWord, 1);

              // 英単語をGoogle翻訳する
              const jpWord = googleTranslationApi.translateEnToJp(addWord);

              vocaBook.addWordSet(jpWord, 2);
              getDataSheat()
                .getRange(8, 4)
                .setValue('');
              MessagingApi.push('「' + addWord + '」を追加しました。');
            } else {
              MessagingApi.push(addWord + '追加する英単語がありません。');
            }
          }

          if (userMessage == 'この英単語を削除します') {
            const targetWord = getDataSheat()
              .getRange(5, 4)
              .getValue();
            vocaBook.deleteWordSet(targetWord);
            MessagingApi.push('「' + targetWord + '」を削除しました。');
          }

          if (checkEnglish(userMessage)) {
            const textFinder = getDataSheat().createTextFinder("^" + userMessage+ "$").useRegularExpression(true);
            if (textFinder.findAll().length == 0) {
              getDataSheat()
                .getRange(8, 4)
                .setValue(userMessage);
            } else {
              MessagingApi.push('その英単語はすでに登録済みです');
            }
          }

          break;

        // ユーザーがボタンで解答したとき
        case 'postback':
          const targetAnswer = getDataSheat()
            .getRange(2, 4)
            .getValue();
          if (targetAnswer == event.postback.data) {
            const messages = {
              type: 'text',
              text: 'ピンポーン！'
            };
            MessagingApi.reply(replyToken, messages);
            const targetWord = getDataSheat()
              .getRange(5, 4)
              .getValue();
            const exampleTxt = wordsApi.getHowToUseWord(targetWord);
            let translatedTxt = '';
            if (exampleTxt) {
              translatedTxt = googleTranslationApi.translateEnToJp(exampleTxt);
            }
            MessagingApi.pushFlexBox(getExampleText(exampleTxt, translatedTxt));
          } else {
            const messages = {
              type: 'text',
              text: 'ブッブー！'
            };
            MessagingApi.reply(replyToken, messages);
          }

          break;

        // フォロー、友達追加されたとき
        case 'follow':
          logging('フォローされたよ');
          const messages = {
            type: 'text',
            text:
              'お友達追加ありがとうございます！毎日、英単語を１つ呟きます。もう１問聞きたいときは「えいご」と入力してください。'
          };
          MessagingApi.reply(replyToken, messages);

          break;

        default:
          logging('その他のイベント');
      }
    });
  }
}
