package com.zw.fms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.zw.fms.utils.ConfigUtil;
import com.zw.fms.utils.ControllerUtil;
import com.zw.fms.utils.Util;

@Controller
@RequestMapping("/config")
public class ConfigController {

    protected static final Log logger_ = LogFactory.getLog(ConfigController.class);

    @RequestMapping(value = "getBusinessTypes", method = RequestMethod.POST)
    public void getBusinessTypes(HttpServletRequest request, HttpServletResponse response, String callback) {
        List<String> l = ConfigUtil.getBusinessTypes();
        ControllerUtil.responseList(response, callback, l);
    }

    @RequestMapping(value = "getBusinessTypesWithAll", method = RequestMethod.POST)
    public void getBusinessTypesWithAll(HttpServletRequest request, HttpServletResponse response, String callback) {
        List<String> l = Util.toList("全部");
        Util.addWithoutDup(l, ConfigUtil.getBusinessTypes());
        ControllerUtil.responseList(response, callback, l);
    }

}
