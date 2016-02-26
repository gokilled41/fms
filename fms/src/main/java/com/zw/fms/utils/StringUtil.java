package com.zw.fms.utils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * String工具类
 * 
 * @author andy
 * @date 2013-5-16 下午4:04:22
 * 
 */
public class StringUtil {

    private StringUtil() {
        super();
    }

    /**
     * 出去null和""
     * @param src
     * @return
     */
    public static String formatNull(String src) {
        return (src == null || "null".equals(src)) ? "" : src;
    }

    /**
     * 判断字符串是否为空的正则表达式，空白字符对应的unicode编码
     */
    private static final String EMPTY_REGEX = "[\\s\\u00a0\\u2007\\u202f\\u0009-\\u000d\\u001c-\\u001f]+";

    /**
     * 验证字符串是否为空
     * 
     * @param input
     * @return
     */
    public static boolean isEmpty(String input) {
        return input == null || input.equals("") || input.matches(EMPTY_REGEX);
    }

    private static final String NUM_REG = "(\\+|\\-)?\\s*\\d+(\\.\\d+)?";

    /**
     * 判断是否数字
     * 
     * @param str
     * @return
     */
    public static boolean isNumber(String str) {
        if (isEmpty(str)) {
            return false;
        }

        if (str.trim().matches(NUM_REG)) {
            return true;
        }

        return false;
    }

    /**
     * 判断是否包含有乱码的数据,如果字符串中包含有替换字符就认为是乱码
     * 
     * @param str
     * @return
     */
    public static boolean containUnreadableCode(String str) {
        return contain(str, "\\ufffd");
    }

    /**
     * 判读是否包含数字
     * 
     * @param str
     * @return
     */
    public static boolean containNumber(String str) {
        return contain(str, "\\d");
    }

    /**
     * 判断是否包含a-zA-Z_0-9
     * 
     * @param str
     * @return
     */
    public static boolean containWord(String str) {
        return contain(str, "\\w");
    }

    /**
     * 是否包含有标点符号
     * 
     * @param str
     * @return
     */
    public static boolean containPunct(String str) {
        return contain(str, PUNCT_REG);
    }

    public static boolean contain(String str, String regex) {
        if (isEmpty(str) || isEmpty(regex)) {
            return false;
        }

        if (str.trim().matches(regex)) {
            return true;
        }

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(str);
        if (matcher.find()) {
            return true;
        }

        return false;
    }

    /**
     * 替换所有的（不区分大小写）
     * 
     * @param input
     * @param regex
     * @param replacement
     * @return
     */
    public static String replaceAll(String input, String regex, String replacement) {
        return Pattern.compile(regex, Pattern.CASE_INSENSITIVE).matcher(input).replaceAll(replacement);
    }

    /**
     * 移除所有的空格
     * 
     * @param text
     * @return
     */
    public static String removeAllSpace(String text) {
        if (isEmpty(text)) {
            return text;
        }

        return text.replaceAll("[ ]+", "");
    }

    private static final String PUNCT_REG = "[^a-zA-Z0-9\\u4e00-\\u9fa5]";

    /**
     * 移除字符串中的所有的中英文标点符号
     * 
     * @param str
     * @return
     */
    public static String removeAllPunct(String str) {
        if (isEmpty(str)) {
            return str;
        }

        return str.replaceAll(PUNCT_REG, "");
    }

    public static List<String> removeAllPunct(List<String> list) {
        if (CollectionUtil.isEmpty(list)) {
            return list;
        }

        List<String> result = new ArrayList<String>();
        for (String str : list) {
            str = removeAllPunct(str);
            result.add(str);
        }

        return result;
    }

    /**
     * 计算str中包含多少个子字符串sub
     * 
     * @param str
     * @param sub
     * @return
     */
    public static int countMatches(String str, String sub) {
        if (isEmpty(str) || isEmpty(sub)) {
            return 0;
        }

        int count = 0;
        int idx = 0;
        while ((idx = str.indexOf(sub, idx)) != -1) {
            count++;
            idx += sub.length();
        }

        return count;
    }

    /**
     * 获得源字符串的一个子字符串
     * 
     * @param str
     *            ：源字符串
     * @param beginIndex
     *            ：开始索引（包括）
     * @param endIndex
     *            ：结束索引（不包括）
     * @return
     */
    public static String substring(String str, int beginIndex, int endIndex) {
        if (isEmpty(str)) {
            return str;
        }

        int length = str.length();

        if (beginIndex >= length || endIndex <= 0 || beginIndex >= endIndex) {
            return null;
        }

        if (beginIndex < 0) {
            beginIndex = 0;
        }
        if (endIndex > length) {
            endIndex = length;
        }

        return str.substring(beginIndex, endIndex);
    }

    /**
     * 计算str中包含子字符串sub所在位置的前一个字符或者后一个字符和sub所组成的新字符串
     * 
     * @param str
     * @param sub
     * @return
     */
    public static Set<String> substring(String str, String sub) {
        if (isEmpty(str) || isEmpty(sub)) {
            return null;
        }

        Set<String> result = new HashSet<String>();
        int idx = 0;
        while ((idx = str.indexOf(sub, idx)) != -1) {
            String temp = substring(str, idx - 1, idx + sub.length());
            if (!isEmpty(temp)) {
                temp = removeAllPunct(temp);
                if (!sub.equalsIgnoreCase(temp) && !containWord(temp)) {
                    result.add(temp);
                }

            }

            temp = substring(str, idx, idx + sub.length() + 1);
            if (!isEmpty(temp)) {
                temp = removeAllPunct(temp);
                if (!sub.equalsIgnoreCase(temp) && !containWord(temp)) {
                    result.add(temp);
                }
            }

            idx += sub.length();
        }

        return result;
    }

    /**
     * 过滤掉XML中无法解析的非法字符
     * 
     * @param content
     * @return
     */
    public static String wrapXmlContent(String content) {
        if (isEmpty(content)) {
            return "";
        }

        StringBuilder result = new StringBuilder();

        for (int i = 0; i < content.length(); i++) {
            char ch = content.charAt(i);
            if ((ch == '\t') || (ch == '\n') || (ch == '\r') || ((ch >= ' ') && (ch <= 55295))
                    || ((ch >= 57344) && (ch <= 65533)) || ((ch >= 65536) && (ch <= 1114111))) {
                result.append(ch);
            }
        }

        return result.toString();
    }

    /**
     * 判断字符串的长度
     * 
     * @param str
     * @return
     */
    public static boolean overLength(String str) {
        if (isEmpty(str)) {
            return false;
        }

        return str.length() > 1 ? true : false;
    }

    /**
     * 字符串中含有特殊字符的处理
     * 
     * @param str
     * @return
     */
    public static String specialStr(String str) {
        str = str.replaceAll("[^\\u4e00-\\u9fa5 | 0-9| a-zA-Z | \\.]+", " ").replaceAll("[\\.]{2,}", " ").trim();
        return str;
    }

    /**
     * 将特殊符号去掉，但是保留空格
     * 
     * @param str
     * @return
     */
    public static String replaceInValidateChar(String str) {
        return str.replaceAll("[^a-zA-Z0-9\\u4e00-\\u9fa5\\s+]", " ");
    }

    /**
     * 返回字符串对应的unicode编码
     * 
     * @param str
     * @return
     */
    public static String[] toHexString(String str) {
        char[] chars = str.toCharArray();

        String[] result = new String[chars.length];

        for (int i = 0; i < chars.length; i++) {
            result[i] = Integer.toHexString((int) chars[i]);
        }

        return result;
    }

    /**
     * 去标签和特殊符号
     * 
     * @param content
     * @return
     */
    public static String replaceSpecialChar(String content) {

        content = content.replaceAll("<[^>]+>", "\n");
        content = content.replaceAll("\n+", "\n");

        String text = content.replaceAll("&quot;", "\"");
        text = text.replaceAll("�", "");
        text = text.replaceAll("&ldquo;", "“");
        text = text.replaceAll("&rdquo;", "”");
        text = text.replaceAll("&middot;", "·");
        text = text.replaceAll("&#8231;", "·");
        text = text.replaceAll("&#8212;", "——");
        text = text.replaceAll("&#28635;", "濛");
        text = text.replaceAll("&hellip;", "…");
        text = text.replaceAll("&#23301;", "嬅");
        text = text.replaceAll("&#27043;", "榣");
        text = text.replaceAll("&#8226;", "·");
        text = text.replaceAll("&#40;", "(");
        text = text.replaceAll("&#41;", ")");
        text = text.replaceAll("&#183;", "·");
        text = text.replaceAll("&amp;", "&");
        text = text.replaceAll("&bull;", "·");
        text = text.replaceAll("&lt;", "<");
        text = text.replaceAll("&#60;", "<");
        text = text.replaceAll("&gt;", ">");
        text = text.replaceAll("&#62;", ">");
        text = text.replaceAll("&nbsp;", " ");
        text = text.replaceAll("&nbsp", " ");
        text = text.replaceAll("&#160;", " ");
        text = text.replaceAll("&tilde;", "~");
        text = text.replaceAll("&mdash;", "—");

        text = text.replaceAll("&copy;", "@");
        text = text.replaceAll("&#169;", "@");
        text = text.replaceAll("♂", "");
        text = text.replaceAll("●", "");
        text = text.replaceAll("&emsp;", " ");
        text = text.replaceAll("\r\n|\r", "\n");

        text = text.replaceAll("<[^>]+>", "\n");
        text = text.replaceAll("\n+", "\n");

        text = text.replaceAll("\uff10", "0");
        text = text.replaceAll("\uff11", "1");
        text = text.replaceAll("\uff12", "2");
        text = text.replaceAll("\uff13", "3");
        text = text.replaceAll("\uff14", "4");
        text = text.replaceAll("\uff15", "5");
        text = text.replaceAll("\uff16", "6");
        text = text.replaceAll("\uff17", "7");
        text = text.replaceAll("\uff18", "8");
        text = text.replaceAll("\uff19", "9");

        return text;
    }
}
