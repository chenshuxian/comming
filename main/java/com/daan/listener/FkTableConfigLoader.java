package com.daan.listener;

import com.daan.util.XmlUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.xml.bind.JAXBException;
import java.io.UnsupportedEncodingException;

/**
 * 程序启动执行该类，读取fk_table配置文件信息
 * 
 * @Author subanmiao
 * @Date 2015/12/14
 */
public class FkTableConfigLoader {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

//    @Autowired
//    private DataCacheService dataCacheService;

    @PostConstruct
    public void initialized() {
//        Object object = dataCacheService.getObject(Constant.FK_TABLE_KEY);
//        if (object != null) {
//            return;
//        }
        try {
            XmlUtils.cacheFkTablesConfig();
        } catch (JAXBException e) {
            logger.error("FkTableConfigLoader initialized JAXBException: " + e);
        } catch (UnsupportedEncodingException e) {
            logger.error("FkTableConfigLoader initialized UnsupportedEncodingException: " + e);
        }

    }
}
