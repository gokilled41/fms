package com.zw.fms.service;

public interface ConfigService {

    public String getProperty(String key);

    public String setProperty(String key, String value);

}
