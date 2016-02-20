package com.daan.domain.auth;

/**
 * Created by reach-pc on 2016/1/19.
 */

import java.util.Date;


public class UserProfiles {
    //[主键id] — 关键字id， 使用【系统id规则】
    private String id;

    //[用户id] — 对应users.id
    private String userId;

    //[属性名称] — 保存属性的key值
    private String propertyName;

    //[属性值] — 保存jason内容.每个用户可以对多个配置key 记录。属性值内容如：
//    {
//        "profile":[
//        {"default_org":1234567890987654321,"default_app":123456789012345678}
//        ]
//    }
    private String propertyValue;

    //[时间版本] — 当新增、修改都需要把当前服务器时间写入次字段，用于同步数据用。
    private Date timeVersion;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPropertyName() {
        return propertyName;
    }

    public void setPropertyName(String propertyName) {
        this.propertyName = propertyName == null ? null : propertyName.trim();
    }

    public String getPropertyValue() {
        return propertyValue;
    }

    public void setPropertyValue(String propertyValue) {
        this.propertyValue = propertyValue == null ? null : propertyValue.trim();
    }

    public Date getTimeVersion() {
        return timeVersion;
    }

    public void setTimeVersion(Date timeVersion) {
        this.timeVersion = timeVersion;
    }
}
