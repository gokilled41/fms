package com.zw.fms.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ConfigUtil {

    private static final Map<String, String> map = new HashMap<String, String>();;

    private static List<String> fileTypes;
    private static List<String> businessTypes;

    public static String get(String k) {
        return map.get(k);
    }

    public static void set(String k, String v) {
        map.put(k, v);
    }

    public static String getZWHome() {
        String v = get("ZW_HOME");
        if (v == null)
            v = System.getenv("ZW_HOME");
        if (v == null)
            v = "c:/temp";
        return v;
    }

    public static List<String> getFileTypes() {
        if (fileTypes == null) {
            fileTypes = Util.splitToList(get("fileTypes"));
        }
        return fileTypes;
    }

    public static List<String> getBusinessTypes() {
        if (businessTypes == null) {
            businessTypes = Util.splitToList(get("businessTypes"));
        }
        return businessTypes;
    }

}
