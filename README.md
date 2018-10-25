# utils
工作中使用的工具类

## isInteger(number)
判断number是否是整数。
```javascript 1.5
    Utils.isInteger(1); //true
    Utils.isInteger(1.1);//false
    Utils.isInteger('1');//false
```
## isString(str)
判断str是否是字符串。
```javascript 1.5
    Utils.isString('1');                //true
    Utils.isString(new String('1'));    //true
    Utils.isString(1);                  //false
```
## isBoolean(val)
判断是不是布尔型。
```javascript 1.5
    Utils.isBoolean(true);//true
    Utils.isBoolean(false);//true
    Utils.isBoolean(new Boolean(true));//true
    Utils.isBoolean('true');//false
```
## numberAndEnglishToCDB(str)
全角英数字转换为半角英数字（不包含全角空格）。
```javascript 1.5
    Utils.numberAndEnglishToCDB("ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｓｙｚ");//abcdefghijklmnopqrstuvwsyz
    Utils.numberAndEnglishToCDB("ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＳＹＺ");//ABCDEFGHIJKLMNOPQRSTUVWSYZ
    Utils.numberAndEnglishToCDB("１２３４５６７８９０");//1234567890
```
## spacesToCDB(str)
字符串中的全角空格转换为半角空格。
```javascript 1.5
    Utils.spacesToCDB("ａｂｃ　ＡＢＣ　１２３");//ａｂｃ ＡＢＣ １２３
    Utils.spacesToCDB("ａｂｃ ＡＢＣ　１２３");//ａｂｃ ＡＢＣ １２３
```

## kaNaToCDB(str)
全角カナ转换成半角カナ。
```javascript 1.5
    Utils.kaNaToCDB("アイウエオ");//ｱｲｳｴｵ
    Utils.kaNaToCDB("ｱｲｳｴｵ");//ｱｲｳｴｵ
```

## toCDB(str,isNE, isSpaces, isKaNa)
全角字符串转换成半角字符串，默认英数字，空格，カナ都准换。
* 如果isNE为false的话，不转英数字；
* 如果isSpaces为false的话，不转空格；
* 如果isKaNa为false的话，不转カナ。
```javascript 1.5
    Utils.toCDB("ａｂｃ　ＡＢＣ　１２３ アイウエオ");//abc ABC 123 ｱｲｳｴｵ
    Utils.toCDB("ａｂｃ ＡＢＣ　１２３　アイウエオ",false,false);//ａｂｃ ＡＢＣ　１２３　ｱｲｳｴｵ
```