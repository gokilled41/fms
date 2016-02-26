package com.zw.fms.utils;

import java.util.ArrayList;
import java.util.List;

import com.zw.fms.model.Item;
import com.zw.fms.model.User;

public class MenuUtil {

    public static List<Item> getApprovalItems(User user) {
        String r = user.getApprovalRole();
        List<Item> l = new ArrayList<Item>();
        l.add(newItem("业务管理", "approvalmanage", "shopping-cart")); // every one has approval management
        if (r.contains("一级审批"))
            l.add(newItem("一级审批", "reviewmanage1", "shopping-cart"));
        if (r.contains("二级审批"))
            l.add(newItem("二级审批", "reviewmanage2", "shopping-cart"));
        if (r.contains("三级审批"))
            l.add(newItem("三级审批", "reviewmanage3", "shopping-cart"));
        if (r.contains("四级审批"))
            l.add(newItem("四级审批", "reviewmanage4", "shopping-cart"));
        return l;
    }

    public static List<Item> getFileItems(User user) {
        List<Item> l = new ArrayList<Item>();
        l.add(newItem("审批查阅", "approvalview", "shopping-cart"));
        l.add(newItem("报表上传", "filemanage", "shopping-cart")); // every one has file management
        l.add(newItem("报表查阅", "fileview", "shopping-cart"));
        return l;
    }

    public static List<Item> getAuthItems(User user) {
        String r = user.getAdminRole();
        List<Item> l = new ArrayList<Item>();
        if (r.contains("基本账号管理"))
            l.add(newItem("基本账号管理", "usermanage", "shopping-cart"));
        if (r.contains("文件查询权限管理"))
            l.add(newItem("文件查询权限管理", "authmanage", "shopping-cart"));
        if (r.contains("文件有效性管理"))
            l.add(newItem("文件有效性管理", "availabilitymanage", "shopping-cart"));
        return l;
    }

    private static Item newItem(String name, String page, String icon) {
        Item i = new Item();
        i.setName(name);
        i.setPage(page);
        i.setIcon(icon);
        return i;
    }

}
