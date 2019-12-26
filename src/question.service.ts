import { getDataSheat } from './util';
import { MessagingApi } from './messaging-api.service';
import { getQuestionData } from './flexbox-data/questiondata';

// linebotserviceより親の存在

export class Question {
  static pushTodayQuestion(replyToken: string): void {
    const qandAset = Question.selectAnswerGroup(3);
    const randomAnswers = Question.makeRandomAnswer(qandAset.answerGroup);
    getDataSheat()
      .getRange(2, 4)
      .setValue(qandAset.targetAnswer);
    getDataSheat()
      .getRange(5, 4)
      .setValue(qandAset.targetEnglishWord);

    MessagingApi.reply(replyToken, getQuestionData(qandAset, randomAnswers));
  }

  static selectAnswerGroup(buttonNum: number): any {
    // TODO:ここの範囲は指定列を取得するように変更
    const lastrow = getDataSheat().getLastRow();
    // シートに登録した解答群を全取得
    const sheetAnswers = getDataSheat()
      .getRange(2, 2, lastrow - 1)
      .getValues();
    // シートに登録した単語群を全取得
    const sheetEnglishWords = getDataSheat()
      .getRange(2, 1, lastrow - 1)
      .getValues();
    const answerGroup = [];
    let answer = '';
    let targetEnglishWord = '';

    for (let i = 0; i < buttonNum; i++) {
      const targetRow = Math.floor(Math.random() * Math.floor(sheetAnswers.length));
      if (i == 0) {
        answer = sheetAnswers[targetRow][0];
        targetEnglishWord = sheetEnglishWords[targetRow][0];
      }

      answerGroup.push(sheetAnswers[targetRow][0]);
      // 一度選択したものは消す
      sheetAnswers.splice(targetRow, 1);
    }

    const qandAset = {
      targetEnglishWord: targetEnglishWord,
      targetAnswer: answer,
      answerGroup: answerGroup
    };
    return qandAset;
  }

  static makeRandomAnswer(answerGroup: Array<string>): Array<string> {
    const RandomAnswer = [];
    const times = answerGroup.length;
    for (let i = 0; i < times; i++) {
      const random = Math.floor(Math.random() * Math.floor(answerGroup.length));
      const pop = answerGroup.splice(random, 1);
      RandomAnswer.push(pop[0]);
    }
    return RandomAnswer;
  }
}
