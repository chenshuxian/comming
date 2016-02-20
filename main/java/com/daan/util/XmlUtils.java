package com.daan.util;

import com.daan.domain.Constant;
import com.daan.service.DataCacheService;
import com.daan.xml.bean.FkTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.*;

/**
 * xml文件工具类
 *
 * @Author subanmiao
 * @Date 2015/12/15
 */
@Component
public class XmlUtils {

    @Autowired
    private DataCacheService dataCacheService;

    private static XmlUtils xmlUtils;


    @PostConstruct
    public void init() {
        xmlUtils = this;
        xmlUtils.dataCacheService = this.dataCacheService;

    }

    public static void cacheFkTablesConfig() throws UnsupportedEncodingException, JAXBException {
        String encoding = "UTF-8";
        File file = new File(Constant.CONFIG_PATH);
        Long fileLength = file.length();
        byte[] fileContent = new byte[fileLength.intValue()];
        try {
            FileInputStream in = new FileInputStream(file);
            in.read(fileContent);
            in.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        String xmlString = new String(fileContent, encoding);
        // parse xml to object
        JAXBContext jaxbContext = JAXBContext.newInstance(FkTables.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        FkTables fkTables = (FkTables) unmarshaller.unmarshal(new ByteArrayInputStream(xmlString.getBytes()));
        // cache
        if (fkTables != null) {
            xmlUtils.dataCacheService.setObject(Constant.FK_TABLE_KEY, fkTables, Constant.TIMES, Constant.TIME_UNIT);
        }
    }

    public static FkTables getFkTablesFromCache() {
        FkTables fkTables = (FkTables) xmlUtils.dataCacheService.getObject(Constant.FK_TABLE_KEY);
        return fkTables;
    }
}
