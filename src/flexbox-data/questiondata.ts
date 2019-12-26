export const getQuestionData = (qandAset: any, randomAnswers: Array<string>) => {
  const questionData = {
    "type": "flex",
    "altText": "今日の英単語は？？",
    "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "md",
        "contents": [
          {
            "type": "text",
            "text": "今日の英単語は？",
            "weight": "bold",
            "color": "#000080",
            "size": "sm",
            "align": "center"
          },
          {
            "type": "text",
            "text": qandAset.targetEnglishWord,
            "weight": "bold",
            "color": "#000080",
            "size": "xl",
            "align": "center"
          },
          {
            "type": "separator",
            "margin": "xxl"
          },
          {
            "type": "button",
            "style": "primary",
            "action": {
              "type": "postback",
              "label": randomAnswers[0],
              "data": randomAnswers[0],
              "displayText": randomAnswers[0]
            }
          },
          {
            "type": "button",
            "style": "primary",
            "action": {
              "type": "postback",
              "label": randomAnswers[1],
              "data": randomAnswers[1],
              "displayText": randomAnswers[1]
            }
          },
          {
            "type": "button",
            "style": "primary",
            "action": {
              "type": "postback",
              "label": randomAnswers[2],
              "data": randomAnswers[2],
              "displayText": randomAnswers[2]
            }
          }
        ]
      }
    }
  };
  return questionData;
};
