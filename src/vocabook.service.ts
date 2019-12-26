import { getDataSheat } from './util';

export class vocaBook {
  static addWordSet(registerWord: string, column: number): void {
    let existData = [];
    if (column == 1) {
      // TODO:変数のスコープについて
      existData = getDataSheat()
        .getRange('A:A')
        .getValues();
    } else if (column == 2) {
      existData = getDataSheat()
        .getRange('B:B')
        .getValues();
    }
    const newRow = existData.filter(String).length + 1;
    getDataSheat()
      .getRange(newRow, column)
      .setValue(registerWord);
  }

  // TODO:英単語リストから英語探すように変更or英単語クイズを出題したら英単語欄から消す
  static deleteWordSet(englishWord: string): void {
    // すでに登録されている英単語かどうかチェック
    var lastRowA = getDataSheat().getRange("A:A").getLastRow();
    const textFinder = getDataSheat().getRange(1, 1, lastRowA).createTextFinder(englishWord);
    const result = textFinder.findAll();
    const row = result[0].getRow();
    const column = result[0].getColumn();
    getDataSheat()
      .getRange(row, column, 1, 2)
      .deleteCells(SpreadsheetApp.Dimension.ROWS);
  }
}
