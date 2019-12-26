// 英単語帳スプレッドシートを取得する
export const getDataSheat = () => {
  const spreadSheet = SpreadsheetApp.openById('1UIFYJtEadzEBg69AzWoWuxPz3_WF43R6j0rp0XsHCaE');
  return spreadSheet.getSheets()[0];
};

// デバッグ用スプレッドシートを取得する
export const getLogSheat = () => {
  const spreadSheet = SpreadsheetApp.openById('1Q7Hfep9PlJU0HJfaeIm1OKppogo_Zf-l0Tu7AXlpqn8');
  return spreadSheet.getSheets()[0];
};

// デバッグ用スプレッドシートへログを出力する
export const logging = (str: any) => {
  var ts = new Date().toLocaleString('japanese', { timeZone: 'Asia/Osaka' });
  getLogSheat().appendRow([ts, str]);
};

// 英語かどうか判定する
export const checkEnglish = (userMessage: string) => {
  var reg = new RegExp(/^[a-zA-Z]+$/);
  return reg.test(userMessage);
};
