/**
 * Copyright 2018 The Utils Developers
 *
 * @author Mr.Zhou
 * @version 1.0.0
 */
function Utils() {
}

Utils = {
    /**
     * 整数判断
     * @param number 值
     * @returns {boolean}
     */
    isInteger: function (number) {
        return (typeof number === 'number') && (number % 1 === 0) || Object.prototype.toString.call(number) === '[object Integer]';
    },
    /**
     * 字符串判断
     * @param str 值
     * @returns {boolean}
     */
    isString: function (str) {
        return (typeof str === 'string' || Object.prototype.toString.call(str) === '[object String]')
    },

    isBoolean: function (val) {
        return typeof val === 'boolean' || Object.prototype.toString.call(val) === '[object Boolean]';
    },
    isUndefined: function (val) {
        return typeof val === 'undefined';
    },
    /**
     * 全角英数字转换为半角英数字
     * @param str 值
     * @returns {string} 半角英数字
     */
    numberAndEnglishToCDB: function (str) {
        var tmp = "";
        if (this.isString(str)) {
            for (var i = 0; i < str.length; i++) {
                var code = str.charCodeAt(i);
                if (code >= 65281 && code <= 65373) {
                    tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
                } else {
                    tmp += str.charAt(i);
                }
            }
        } else {
            console.error('这不是一个字符串')
        }
        return tmp;
    },
    /**
     * 全角空格转换为半角空格。
     * @param str 字符串
     * @returns {string}
     */
    spacesToCDB: function (str) {
        var tmp = "";
        if (this.isString(str)) {
            for (var i = 0; i < str.length; i++) {
                var code = str.charCodeAt(i);
                if (code === 12288) {
                    tmp += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
                } else {
                    tmp += str.charAt(i);
                }
            }
        } else {
            console.log('这不是一个字符串')
        }
        return tmp;
    },
    /**
     * 全角カナ转换为半角カナ。
     * @param str
     * @returns {string}
     */
    kaNaToCDB: function (str) {
        var tmp = "";
        if (this.isString(str)) {
            var kanaMap = {
                'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ',
                'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ',
                'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ',
                'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ',
                'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ',
                'ヴ': 'ｳﾞ', 'ヷ': 'ﾜﾞ', 'ヺ': 'ｦﾞ',
                'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ',
                'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ',
                'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ',
                'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ',
                'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ',
                'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ',
                'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ',
                'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ',
                'ラ': 'ﾗ', 'リ': 'ﾘ', 'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ',
                'ワ': 'ﾜ', 'ヲ': 'ｦ', 'ン': 'ﾝ',
                'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｩ', 'ェ': 'ｪ', 'ォ': 'ｫ',
                'ッ': 'ｯ', 'ャ': 'ｬ', 'ュ': 'ｭ', 'ョ': 'ｮ',
                '。': '｡', '、': '､', 'ー': 'ｰ', '「': '｢', '」': '｣', '・': '･'
            };
            var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
            tmp = str.replace(reg, function (match) {
                return kanaMap[match];
            });
        } else {
            console.log('这不是一个字符串')
        }
        return tmp;
    },

    /**
     * 全角字符串转换成半角字符串
     * @param str 字符串
     * @param isNE 英数字是否转换，默认为true
     * @param isSpaces 空格是否转换，默认为true
     * @param isKaNa カナ是否转换，默认为true
     * @returns {string}
     */
    toCDB: function (str, isNE, isSpaces, isKaNa) {
        if (this.isUndefined(isNE)) {
            isNE = true;
        }
        if (this.isUndefined(isSpaces)) {
            isSpaces = true;
        }
        if (this.isUndefined(isKaNa)) {
            isKaNa = true;
        }
        var tmp = str;
        if (this.isString(str) && this.isBoolean(isNE) && this.isBoolean(isSpaces) && this.isBoolean(isKaNa)) {
            if (isNE) {
                tmp = this.numberAndEnglishToCDB(tmp);
            }
            if (isSpaces) {
                tmp = this.spacesToCDB(tmp);
            }
            if (isKaNa) {
                tmp = this.kaNaToCDB(tmp);
            }
        } else {
            console.log('参数不正确，第一个参数为string，后三个参数为boolean')
            tmp = "";
        }
        return tmp;
    },

    /**
     * 半角英数字转换成全角英数字。
     * @param str
     * @returns {string}
     */
    numberAndEnglishToDBC: function (str) {
        var tmp = "";
        if (this.isString(str)) {
            for (var i = 0; i < str.length; i++) {
                var code = str.charCodeAt(i);
                if (code > 32 && str.charCodeAt(i) < 127) {
                    tmp += String.fromCharCode(str.charCodeAt(i) + 65248);
                } else {
                    tmp += str.charAt(i)
                }
            }
        } else {
            console.error("这不是一个字符串");
        }
        return tmp;
    },
    /**
     * 半角空格转换成全角空格
     * @param str
     * @returns {string}
     */
    spacesToDBC: function (str) {
        var tmp = "";
        if (this.isString(str)) {
            for (var i = 0; i < str.length; i++) {
                var code = str.charCodeAt(i);
                if (code === 32) {
                    tmp += String.fromCharCode(12288);
                } else {
                    tmp += str.charAt(i)
                }
            }
        } else {
            console.error("这不是一个字符串");
        }
        return tmp;
    },
    /**
     * 半角カナ转换成全角カナ。
     * @param str
     * @returns {string}
     */
    kaNaToDBC: function (str) {
        var tmp = "";
        if (this.isString(str)) {
            var kanaMap = {
                'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
                'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
                'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
                'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
                'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
                'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
                'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
                'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
                'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
                'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
                'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
                'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
                'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
                'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
                'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
                'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
                'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
                'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
                '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
            };
            var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
            tmp = str.replace(reg, function (match) {
                return kanaMap[match];
            });
        } else {
            console.error("这不是一个字符串");
        }
        return tmp;
    },
    /**
     * 半角字符串转换成全角字符串。
     * @param str 字符串
     * @param isNE 英数字是否转换，默认为true
     * @param isSpaces 空格是否转换，默认为true
     * @param isKaNa カナ是否转换，默认为true
     * @returns {string}
     */
    toDBC: function (str, isNE, isSpaces, isKaNa) {
        if (typeof(str) !== "string") {
            console.error('str is not string');
            return;
        }
        if (this.isUndefined(isNE)) {
            isNE = true;
        }
        if (this.isUndefined(isSpaces)) {
            isSpaces = true;
        }
        if (this.isUndefined(isKaNa)) {
            isKaNa = true;
        }
        var tmp = str;
        if (this.isString(str) && this.isBoolean(isNE) && this.isBoolean(isSpaces) && this.isBoolean(isKaNa)) {
            if (isNE) {
                tmp = this.numberAndEnglishToDBC(tmp);
            }
            if (isSpaces) {
                tmp = this.spacesToDBC(tmp);
            }
            if (isKaNa) {
                tmp = this.kaNaToDBC(tmp);
            }
        } else {
            console.log('参数不正确，第一个参数为string，后三个参数为boolean');
            tmp = "";
        }
        return tmp;
    },
    /**
     * ひらがなをカタカナに変換する
     * @param str
     * @returns {string}
     */
    hiraToKaNa: function (str) {
        if (typeof(str) !== "string") {
            console.error('str is not string')
            return;
        }
        var tmp = str.replace(/[\u3041-\u3096]/g, function (match) {
            var chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
        return tmp;
    },
    /**
     * カタカナをひらがなに変換する
     * @param str
     * @returns {void | string | *}
     */
    kaNaToHira: function (str) {
        if (typeof(str) !== "string") {
            console.error('str is not string')
            return;
        }
        var tmp = str.replace(/[\u30a1-\u30f6]/g, function (match) {
            var chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
        return tmp;

    },
    /**
     * 日期格式化
     *      YYYY:年
     *      MM:月(带0)
     *      DD:日(带0)
     *      hh:时(带0)
     *      mm:分(带0)
     *      ss:秒(带0)
     *      M:月(不带0)
     *      D:日(不带0)
     *      h:时(不带0)
     *      m:分(不带0)
     *      s:秒(不带0)
     * @param date {Date}
     * @param strFormat {String}
     * @returns {string}
     */
    dateFormat(date, strFormat) {

        if (!(date instanceof Date)) {
            console.error('date is not Date');
            return;
        }
        console.log(typeof (strFormat))
        if (typeof(strFormat) !== 'string') {
            console.error('strFormat is not String');
            return;
        }
        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
            return '0' + index;
        });
        var dateFormatAfter = strFormat.replace(/YYYY/g, year)
            .replace(/MM/g, preArr[month] || month)
            .replace(/M/g, month)
            .replace(/DD/g, preArr[day] || day)
            .replace(/D/g, day)
            .replace(/hh/g, preArr[hour] || hour)
            .replace(/h/g, hour)
            .replace(/mm/g, preArr[min] || min)
            .replace(/m/g, min)
            .replace(/ss/g, preArr[sec] || sec)
            .replace(/s/g, sec);

        return dateFormatAfter;
    },

    /**
     * 字符串格式的日期，转换成Date对象
     * @param str
     * @returns {Date}
     */
    strToDate: function (str) {
        var dateStr = "";
        var pattern = "";
        if (str.length === 8) {
            pattern = /(\d{4})(\d{2})(\d{2})/;
            dateStr = str.replace(pattern, '$1/$2/$3');
        } else if (str.length === 14) {
            pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
            dateStr = str.replace(pattern, '$1/$2/$3 $4:$5:$6');
        } else {
            console.error('format error,eg:YYYYMMDD or YYYYMMDDhhmmss');
        }
        var date = "";
        date = new Date(dateStr);
        return date;
    },

    /**
     * 字符串格式的时间，转换成时间戳
     * @param str
     * @param separator
     * @returns {number}
     */
    strToTimestamp: function (str, separator) {
        var dateStr = str.replace("/" + separator + "/g", '/');
        var date = new Date(dateStr);
        var timestamp = Math.round(date.getTime() / 1000);
        return timestamp;
    },

    countDay: function (date, diff) {
        if (!(date instanceof Date)) {
            console.error('date is not Date');
            return;
        }
        var day = date.getDate();
        var newDate = day + diff;
        date.setDate(newDate);
        return date;
    }
};




