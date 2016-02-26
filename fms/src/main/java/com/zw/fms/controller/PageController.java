package com.zw.fms.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zw.fms.model.User;
import com.zw.fms.utils.SessionUtil;

@Controller
public class PageController {

    @RequestMapping("/page/**")
    public String page(HttpServletRequest request) {
        String prefix = "page";
        String suffix = ".shtml";

        //get page value
        String url = request.getRequestURI();

        int index = url.indexOf(prefix);
        String page = url.substring(index + prefix.length(), url.indexOf(suffix));

        //for admin pages
        if (page != null && page.startsWith("/admin")) {
            //check if login
            User u = SessionUtil.getLoginUser(request);
            if (u == null) {
                return "/admin/login";
            } else {
                if (page.contains("login")) {
                    return "/admin/index";
                }
                return page;
            }
        }

        //for auto login
        return page;
    }
}
