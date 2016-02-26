package com.zw.fms.utils;

import java.util.HashSet;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

public class PinyinUtil {

    private static final Logger LOG = Logger.getLogger(PinyinUtil.class);

    private static HanyuPinyinOutputFormat hanyuPinyinOutputFormat;

    static {
        if (null == hanyuPinyinOutputFormat) {
            hanyuPinyinOutputFormat = new HanyuPinyinOutputFormat();
            // 初始化拼音输出格式 小写 五声调 v表示
            hanyuPinyinOutputFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
            hanyuPinyinOutputFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
            hanyuPinyinOutputFormat.setVCharType(HanyuPinyinVCharType.WITH_V);
        }
    }

    /**
     * 将汉字穿转换成拼音字符
     * @param src 源字符串
     * @param separator 分隔符，不写默认为","
     * @return
     */
    public static String getPinyin(String src, String separator) {
        if (StringUtils.isEmpty(src)) {
            return null;
        }
        if (StringUtils.isEmpty(separator)) {
            separator = ",";
        }

        char[] charArray = src.toCharArray();
        String pinyin = "";

        for (int i = 0; !ArrayUtil.isEmpty(charArray) && i < charArray.length; i++) {
            // 获取转换的字编码
            try {
                String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(charArray[i], hanyuPinyinOutputFormat);
                if (!ArrayUtil.isEmpty(pinyinArray)) {
                    Set<String> pinyinSet = new HashSet<String>();
                    // 含有重复的
                    for (String pinyinchar : pinyinArray) {
                        pinyinSet.add(pinyinchar);
                    }

                    for (String setString : pinyinSet) {
                        pinyin += setString;
                    }
                } else {
                    // 非汉字
                    pinyin += String.valueOf(charArray[i]).toLowerCase();
                }

            } catch (BadHanyuPinyinOutputFormatCombination e) {
                LOG.info("拼音转换内容为非汉字或转换异常");
                pinyin += String.valueOf(charArray[i]).toLowerCase();
            }

            if (!StringUtils.isEmpty(pinyin)) {
                pinyin += separator;
            }
        }

        return pinyin;
    }

    /**
     * 返回汉字串第一个汉字拼音的首字母 若非汉字返回第一个小写字符
     * 
     * @param src
     *            源字符串
     * @return
     */
    public static String getPinyinHeadChar(String src) {
        if (StringUtils.isEmpty(src)) {
            return null;
        }

        try {
            String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(src.charAt(0), hanyuPinyinOutputFormat);
            if (!ArrayUtil.isEmpty(pinyinArray)) {
                return String.valueOf(pinyinArray[0].charAt(0));
            }
        } catch (BadHanyuPinyinOutputFormatCombination e) {
            LOG.error("转换失败", e);
        }

        return src.toLowerCase().substring(0, 1);
    }

}
