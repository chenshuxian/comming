package com.daan.service;

import java.util.concurrent.TimeUnit;

/**
 * @author subanmiao
 * @ClassName: DataCacheService
 * @Description: TODO(数据缓存接口)
 * @date 2015年11月24日
 */
public interface DataCacheService {
    public void setObject(String key, Object obj);

    public void setObject(String key, Object obj, long minutes);

    public void setObject(String key, Object obj, long times, TimeUnit timeUnit);

    public Object getObject(String key);

    public void remove(String key);
}
