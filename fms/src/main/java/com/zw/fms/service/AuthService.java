package com.zw.fms.service;

import com.zw.fms.model.UserGroups;

public interface AuthService {

    public UserGroups getAllUsers();

    public UserGroups getUsers(String applyId);

    public UserGroups parseUsers(String users);

    public void addAuth(String applyId, String users);

    public void updateUsers(String applyId, String users);

    public void deleteAuth(String applyId);

}
