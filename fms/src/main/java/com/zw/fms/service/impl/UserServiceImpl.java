package com.zw.fms.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zw.fms.dao.UserMapper;
import com.zw.fms.model.Item;
import com.zw.fms.model.Role;
import com.zw.fms.model.User;
import com.zw.fms.service.UserService;
import com.zw.fms.utils.EncryptUtil;
import com.zw.fms.utils.MenuUtil;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> listUsersByMap(Map<String, Object> map) {
        return userMapper.listUsersByMap(map);
    }

    @Override
    public long countUsersByMap(Map<String, Object> map) {
        return userMapper.countUsersByMap(map);
    }

    @Override
    public User getUser(int id) {
        return userMapper.getUser(id);
    }

    @Override
    public User getUserByUserName(String userName) {
        return userMapper.getUserByUserName(userName);
    }

    @Override
    public int updateUser(User user) {
        user.setPassword(EncryptUtil.md5(user.getPassword()));
        user.setTimestamp(new Date());
        return userMapper.updateUser(user);
    }

    @Override
    public void updateUserPasswordByUserName(String userName, String password) {
        userMapper.updateUserPasswordByUserName(userName, password);
    }

    @Override
    public int updateUserStatusById(int id, String status) {
        return userMapper.updateUserStatus(id, status);
    }

    @Override
    public int addUser(User user) {
        user.setPassword(EncryptUtil.md5(user.getPassword()));
        user.setCreateTime(new Date());
        user.setTimestamp(new Date());
        return userMapper.insertUser(user);
    }

    @Override
    public int deleteUserById(int id) {
        return userMapper.deleteUserById(id);
    }

    @Override
    public Role getRoleByUserName(String userName) {
        User user = getUserByUserName(userName);
        Role r = new Role();
        r.setUserId(user.getId());
        r.setUserName(userName);
        r.setApprovalRole(user.getApprovalRole());
        r.setAdminRole(user.getAdminRole());

        // approval
        List<Item> approvalItems = MenuUtil.getApprovalItems(user);
        r.setApprovalItems(approvalItems);
        r.setShowApproval(!approvalItems.isEmpty());
        // file
        List<Item> fileItems = MenuUtil.getFileItems(user);
        r.setFileItems(fileItems);
        r.setShowFile(!fileItems.isEmpty());
        // auth
        List<Item> authItems = MenuUtil.getAuthItems(user);
        r.setAuthItems(authItems);
        r.setShowAuth(!authItems.isEmpty());
        return r;
    }

}
