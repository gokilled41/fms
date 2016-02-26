package com.zw.fms.service.impl;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zw.fms.dao.ConfigMapper;
import com.zw.fms.model.Config;
import com.zw.fms.service.ConfigService;
import com.zw.fms.utils.ConfigUtil;

@Service("configService")
public class ConfigServiceImpl implements ConfigService {

    @Autowired
    private ConfigMapper configMapper;

    @PostConstruct
    public void init() {
        List<Config> list = configMapper.listConfigs();
        for (Config c : list) {
            ConfigUtil.set(c.getCkey(), c.getCvalue());
            System.out.println("config: " + c.getCkey() + " = " + c.getCvalue());
        }
    }

    @Override
    public String getProperty(String key) {
        Config c = configMapper.getConfig(key);
        if (c != null)
            return c.getCvalue();
        return null;
    }

    @Override
    public String setProperty(String key, String value) {
        // TODO Auto-generated method stub
        return null;
    }

}
