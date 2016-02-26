package com.zw.fms.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zw.fms.model.Config;

public interface ConfigMapper {

    public List<Config> listConfigs();

    public List<Config> listConfigsByMap(Map<String, Object> map);

    public long countConfigsByMap(Map<String, Object> map);

    public Config getConfig(@Param("ckey") String ckey);

    public int updateConfig(Config config);

    public int insertConfig(Config config);

    public int deleteConfig(@Param("ckey") String ckey);

    public int deleteAllConfigs();

}
