package com.daan.service.impl;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.daan.domain.Constant;
import com.daan.service.AbstractService;
import com.daan.service.DataCacheService;

/**
 * @ClassName: DataCacheServiceImpl
 * @Description: TODO(数据缓存接口实现)
 * @author subanmiao
 * @date 2015年11月24日
 */
@Service
public class DataCacheServiceImpl extends AbstractService implements DataCacheService {

	public static final class CacheKey{
			public static final String CTR_DICT_CODES="ctr_dict_codes";
			public static final String CTR_INSTRUMENTS="ctr_instruments";
	}

	public static Object lock;
	public static void refreshCacheByKey(String... cacheKey){
		synchronized (lock){


		}

	}




	@Autowired
	private RedisTemplate<String, Object> redisTemplate;

	/**
	 * 调用该方法默认20分钟后key失效
	 */
	@Override
	public void setObject(String key, Object obj) {
		this.setObject(key, obj, Constant.EXPIRED_TIME);

	}

	@Override
	public void setObject(String key, Object obj, long minutes) {
		this.setObject(key, obj, minutes, TimeUnit.MINUTES);
	}

	@Override
	public void setObject(String key, Object obj, long times, TimeUnit timeUnit) {
		try {
			redisTemplate.opsForValue().set(setKey(key), obj, times, timeUnit);
		} catch (Exception e) {
			logger.error("保存缓存异常" + key, e);
		}
	}

	@Override
	public Object getObject(String key) {
		try {
			return redisTemplate.opsForValue().get(setKey(key));
		} catch (Exception e) {
			logger.error("读取缓存异常" + key);
			redisTemplate.delete(setKey(key));
			return null;
		}
	}

	@Override
	public void remove(String key) {
		try {
			redisTemplate.delete(setKey(key));
		} catch (Exception e) {
			logger.error("删除缓存异常" + key, e);
		}
	}

	private String setKey(String value) {
		return Constant.PREFIX_KEY + value;
	}





}


