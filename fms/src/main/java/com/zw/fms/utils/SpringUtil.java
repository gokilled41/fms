package com.zw.fms.utils;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.ContextLoader;

/**
 * 创建时间：2015年7月6日 下午4:34:35
 * 
 * @author andy
 * @version 2.2
 */

public class SpringUtil {

    private static final Logger LOG = Logger.getLogger(SpringUtil.class);

    private static ApplicationContext ac;

    /**
     * 加载配置文件
     */
    static {
        ac = initApplicationContext();
    }

    /**
     * 优先从web容器中获得相应的ApplicationContext，如果获取失败再从资源路径中重新加载
     * 
     * @return
     */
    private static ApplicationContext initApplicationContext() {
        LOG.info("init ApplicationContext");

        ApplicationContext ac = initWebApplicationContext();
        if (ac == null) {
            LOG.warn("WebApplicationContext is null, load ClassPathXmlApplicationContext");
            ac = initClassPathXmlApplicationContext();
        }

        return ac;
    }

    /**
     * 从web容器中获得相应的ApplicationContext
     * @return
     */
    public static ApplicationContext initWebApplicationContext() {
        LOG.info("init WebApplicationContext");

        return ContextLoader.getCurrentWebApplicationContext();
    }

    /**
     * 从资源路径中加载ApplicationContext
     * @return
     */
    public static ApplicationContext initClassPathXmlApplicationContext() {
        LOG.info("init ClassPathXmlApplicationContext");
        return new ClassPathXmlApplicationContext("classpath*:applicationContext.xml", "classpath*:rest-servlet.xml");
    }

    /**
     * 获取相应的bean
     * @param str
     * @return
     */
    public static Object getBean(String str) {
        return ac.getBean(str);
    }

}
