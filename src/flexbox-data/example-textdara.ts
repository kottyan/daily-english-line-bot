export const getExampleText = (exampleTxt: string, translatedTxt: string) => {
  const exampleText = {
    "to": "U5b6b263ee84b0cf9f689749af787a98c",
    "messages": [
      {
        "type": "flex",
        "altText": "どうやって使うの？",
        "contents": {
          "type": "bubble",
          "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "どうやって使うの？",
                "weight": "bold",
                "color": "#ffffff",
                "size": "md",
                "align": "center",
                "wrap": true
              }
            ],
            "backgroundColor": "#FF6B6E",
            "paddingTop": "19px",
            "paddingAll": "12px",
            "paddingBottom": "16px"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": exampleTxt,
                    "align": "center",
                    "color": "#000000",
                    "size": "sm",
                    "wrap": true
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "filler"
                          }
                        ],
                        "width": "100%",
                        "backgroundColor": "#FF6B6E",
                        "height": "2px"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": translatedTxt,
                    "align": "center",
                    "color": "#8C8C8C",
                    "size": "sm",
                    "wrap": true
                  }
                ],
                "flex": 1,
                "spacing": "lg"
              }
            ],
            "paddingAll": "20px"
          }
        }
      }
    ]
  };

  return exampleText;
};
