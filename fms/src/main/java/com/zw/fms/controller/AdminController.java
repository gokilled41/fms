package com.zw.fms.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zw.fms.Constants;
import com.zw.fms.model.User;
import com.zw.fms.service.UserService;
import com.zw.fms.utils.ControllerUtil;
import com.zw.fms.utils.EncryptUtil;
import com.zw.fms.utils.SessionUtil;

@Controller
@RequestMapping("/admin")
public class AdminController {

    protected static final Log logger_ = LogFactory.getLog(AdminController.class);

    @Autowired
    private UserService userService;

    @RequestMapping("login")
    public String login(HttpServletRequest request, String userName, String password, ModelMap modelMap) {
        if (userName == null || userName.isEmpty())
            return relogin(modelMap, "请输入用户名和密码", false);
        User user = userService.getUserByUserName(userName);
        if (user == null)
            return relogin(modelMap, "用户名不存在", true);
        if (user.getStatus().equals(Constants.UserStatusFreezed))
            return relogin(modelMap, "用户已冻结", true);
        if (user.getPassword() == null || !user.getPassword().equals(EncryptUtil.md5(password)))
            return relogin(modelMap, "密码不正确", true);

        if (logger_.isInfoEnabled()) {
            logger_.info("user login: " + userName);
        }
        SessionUtil.setLoginUser(request, user);
        return "/admin/index";
    }

    private String relogin(ModelMap modelMap, String msg, boolean error) {
        String messsage = msg;
        if (error)
            messsage = "<b style=\"color:red\">" + msg + "</b>";
        modelMap.addAttribute("message", messsage);
        return "/admin/login";
    }

    @RequestMapping("logout")
    public void logout(HttpServletRequest request, HttpServletResponse response, String callback) {
        String userName = SessionUtil.getLoginUser(request).getUserName();
        if (logger_.isInfoEnabled()) {
            logger_.info("user logout: " + userName);
        }
        SessionUtil.removeLoginUser(request);
        SessionUtil.removeCookie(request, response, "autoLoginUser");
        SessionUtil.removeCookie(request, response, "sessionid");
        ControllerUtil.responseBoolean(response, callback, true);
    }

    @RequestMapping(value = "changeUserPassword")
    public void changeUserPassword(HttpServletRequest request, HttpServletResponse response, String password,
            String oldPassword, String callback) {
        User user = SessionUtil.getLoginUser(request);
        String encrypted = EncryptUtil.md5(password);
        String oldEncrypted = EncryptUtil.md5(oldPassword);
        boolean success;
        String reason = "";
        if (user.getPassword().equals(oldEncrypted)) {
            userService.updateUserPasswordByUserName(user.getUserName(), encrypted);
            user.setPassword(encrypted);
            success = true;
        } else {
            success = false;
            reason = "原密码不正确";
        }
        ControllerUtil.responseJson(response, callback, "success", success, "reason", reason);
    }

}
