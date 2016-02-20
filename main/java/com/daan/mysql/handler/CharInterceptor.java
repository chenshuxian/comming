package com.daan.mysql.handler;

import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.daan.domain.Message;
import com.daan.exception.FkException;
import org.apache.ibatis.builder.SqlSourceBuilder;
import org.apache.ibatis.executor.ErrorContext;
import org.apache.ibatis.executor.ExecutorException;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.ParameterMode;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;
import org.apache.ibatis.reflection.factory.ObjectFactory;
import org.apache.ibatis.reflection.property.PropertyTokenizer;
import org.apache.ibatis.reflection.wrapper.DefaultObjectWrapperFactory;
import org.apache.ibatis.reflection.wrapper.ObjectWrapperFactory;
import org.apache.ibatis.scripting.xmltags.DynamicContext;
import org.apache.ibatis.scripting.xmltags.ForEachSqlNode;
import org.apache.ibatis.scripting.xmltags.SqlNode;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.type.TypeHandler;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.daan.util.StringUtil;
import com.daan.util.XmlUtils;
import com.daan.xml.bean.FkTable;
import com.daan.xml.bean.FkTables;

@Intercepts({@Signature(type = StatementHandler.class, method = "prepare", args = {Connection.class})})
public class CharInterceptor implements Interceptor {
    private static final ObjectFactory DEFAULT_OBJECT_FACTORY = new DefaultObjectFactory();
    private static final ObjectWrapperFactory DEFAULT_OBJECT_WRAPPER_FACTORY = new DefaultObjectWrapperFactory();
    private static final ObjectFactory DEFAULT_OBJECT_FACTORY2 = new DefaultObjectFactory();
    private static final ObjectWrapperFactory DEFAULT_OBJECT_WRAPPER_FACTORY2 = new DefaultObjectWrapperFactory();
    protected Logger logger = LoggerFactory.getLogger(getClass());

    public Object intercept(Invocation invocation) throws Throwable {

        StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
        MetaObject metaStatementHandler = MetaObject.forObject(statementHandler, DEFAULT_OBJECT_FACTORY,
                DEFAULT_OBJECT_WRAPPER_FACTORY);
        MappedStatement mappedStatement = (MappedStatement) metaStatementHandler.getValue("delegate.mappedStatement");
        MetaObject metaMappedStatement = MetaObject.forObject(mappedStatement, DEFAULT_OBJECT_FACTORY2,
                DEFAULT_OBJECT_WRAPPER_FACTORY2);

        BoundSql boundSql = statementHandler.getBoundSql();
        String sql = showSql(mappedStatement.getConfiguration(), boundSql);
        // 记录查询的sql语句到日志文件
        logger.debug("执行的sql语句:=======================================" + sql);
        System.out.println(sql);
        // 修改参数值
        SqlNode sqlNode = (SqlNode) metaMappedStatement.getValue("sqlSource.rootSqlNode");
        boundSql = getBoundSql(mappedStatement.getConfiguration(), boundSql.getParameterObject(), sqlNode);

        // 拦截delete语句，查询删除的记录是否被其他表引用，有则抛出异常不给删除
        // sql语句转小写
        sql = sql.toLowerCase();
        if (sql.startsWith("delete from")) {
            // 取表名
            String tableName = getTableName(sql);
            // 查询是否有外键引用的表
            boolean isRef;
            isRef = checkIsRef(tableName);
            // 结果为false，有可能是缓存中未更新配置文件的信息，再重新读取一次配置文件至缓存
            if (!isRef) {
                XmlUtils.cacheFkTablesConfig();
                isRef = checkIsRef(tableName);
            }

            if (isRef) {
                // 查询重新组装的sql,有数据时抛异常不给删除
                PreparedStatement ps = null;
                ResultSet rs = null;
                try {
                    Connection connection = (Connection) invocation.getArgs()[0];
                    // 查询记录
                    String selectSql = assemblySql(sql, tableName);
                    if ("".equals(selectSql)) {
                        throw new Exception("查询表关联数据的sql为空");
                    }
                    ps = connection.prepareStatement(selectSql);
                    rs = ps.executeQuery();

                    // 有数据时抛出异常
                    if (rs.next()) {
                        throw new FkException(Message.MSG_DEL_FAIL2);
                    }

                } catch (SQLException ex) {
                    logger.error("CharInterceptor throw SQLException: " + ex);
                    throw new Exception("查询表关联数据出错: " + ex.getMessage());
                } finally {
                    if (rs != null) {
                        rs.close();
                    }
                    if (ps != null) {
                        ps.close();
                    }
                }
            }
        }

        return invocation.proceed();
    }

    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {

    }

    /**
     * 包装原Sql成为查询数据Sql,如果原Sql有order by 子句，为提高性能，删除order by部分
     *
     * @param sql
     * @return
     */
    public static String getCountSql(String sql) {
        // Pattern pattern = Pattern.compile("order//s*by[//w|//W|//s|//S]*",
        // Pattern.CASE_INSENSITIVE);
        Pattern pattern = Pattern.compile("order\\s+by\\s+.+", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(sql);
        sql = matcher.replaceAll("");
        return "select count(*) from (" + sql + ") tmp_";
    }

    public static void setParameters(PreparedStatement ps, MappedStatement mappedStatement, BoundSql boundSql,
                                     Object parameterObject) throws SQLException {
        ErrorContext.instance().activity("setting parameters").object(mappedStatement.getParameterMap().getId());
        List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
        if (parameterMappings != null) {
            Configuration configuration = mappedStatement.getConfiguration();
            TypeHandlerRegistry typeHandlerRegistry = configuration.getTypeHandlerRegistry();
            MetaObject metaObject = parameterObject == null ? null : configuration.newMetaObject(parameterObject);
            for (int i = 0; i < parameterMappings.size(); i++) {
                ParameterMapping parameterMapping = parameterMappings.get(i);
                if (parameterMapping.getMode() != ParameterMode.OUT) {
                    Object value;
                    String propertyName = parameterMapping.getProperty();
                    PropertyTokenizer prop = new PropertyTokenizer(propertyName);
                    if (parameterObject == null) {
                        value = null;
                    } else if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
                        value = parameterObject;
                    } else if (boundSql.hasAdditionalParameter(propertyName)) {
                        value = boundSql.getAdditionalParameter(propertyName);
                    } else if (propertyName.startsWith(ForEachSqlNode.ITEM_PREFIX)
                            && boundSql.hasAdditionalParameter(prop.getName())) {
                        value = boundSql.getAdditionalParameter(prop.getName());
                        if (value != null) {
                            value = configuration.newMetaObject(value)
                                    .getValue(propertyName.substring(prop.getName().length()));
                        }
                    } else {
                        value = metaObject == null ? null : metaObject.getValue(propertyName);
                    }
                    System.out.println("propertyName:" + propertyName + "value:" + value);
                    TypeHandler typeHandler = parameterMapping.getTypeHandler();
                    if (typeHandler == null) {
                        throw new ExecutorException("There was no TypeHandler found for parameter " + propertyName
                                + " of statement " + mappedStatement.getId());
                    }
                    typeHandler.setParameter(ps, i + 1, value, parameterMapping.getJdbcType());
                }
            }
        }
    }

    public static BoundSql getBoundSql(Configuration configuration, Object parameterObject, SqlNode sqlNode) {
        DynamicContext context = new DynamicContext(configuration, parameterObject);
        // DynamicContext context = new
        // DynamicContext(mappedStatement.getConfiguration(),
        // boundSql.getParameterObject());
        // mappedStatement.getSqlSource().

        sqlNode.apply(context);
        String countextSql = context.getSql();
        // System.out.println("context.getSql():"+countextSql);

        SqlSourceBuilder sqlSourceParser = new SqlSourceBuilder(configuration);
        Class<?> parameterType = parameterObject == null ? Object.class : parameterObject.getClass();
        String sql = modifyLikeSql(countextSql, parameterObject);
        SqlSource sqlSource = sqlSourceParser.parse(sql, parameterType, context.getBindings());

        BoundSql boundSql = sqlSource.getBoundSql(parameterObject);
        for (Map.Entry<String, Object> entry : context.getBindings().entrySet()) {
            boundSql.setAdditionalParameter(entry.getKey(), entry.getValue());
        }

        return boundSql;
    }

    public static String modifyLikeSql(String sql, Object parameterObject) {
        if (parameterObject instanceof HashMap) {
        } else {
            return sql;
        }
        if (!sql.toLowerCase().contains("like"))
            return sql;
        // sql=" and OPER_REMARK LIKE '%' || #{operRemark} || '%' \n " +"and
        // OPER_U_NAME LIKE #{operUName} || '%' ";
        // 原始表达式：\s\w+\sLIKE\s('%'\s\|{2})?\s*(#\{\w+\})\s*(\|{2}\s*'%')
        String reg = "CONCAT\\('%',(#\\{.*?\\}),'%'\\)";// "order\\s+by\\s+.+"
        Pattern pattern = Pattern.compile(reg, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(sql);

        Set<String> replaceEscape = new HashSet<String>();
        Set<String> replaceFiled = new HashSet<String>();

        while (matcher.find()) {
            replaceEscape.add(matcher.group());
            replaceFiled.add(matcher.group());
        }

        // sql = matcher.replaceAll(reg+" 1111");

        for (String s : replaceEscape) {
            sql = sql.replace(s, s + " ESCAPE '/' ");
        }
        // 修改参数
        HashMap<String, Object> paramMab = (HashMap) parameterObject;
        for (String s : replaceFiled) {
            // sql=sql.replace(s, " ? ");
            // #{operUName} -->operUName
            String key = s.replace("CONCAT('%',#{", "").replace("},'%')", "");
            if (key.contains(".")) {
                String pre = key.substring(0, key.indexOf("."));
                String sub = key.substring(key.indexOf(".") + 1);
                sub = sub.replaceFirst(sub.substring(0, 1), sub.substring(0, 1).toUpperCase());
                Object o = paramMab.get(pre);
                if (o != null) {
                    try {
                        Method getMethod = o.getClass().getMethod("get" + sub, new Class[]{});
                        if (getMethod.getReturnType() == String.class) {
                            Method setMethod = o.getClass().getMethod("set" + sub, String.class);
                            Object val = getMethod.invoke(o, new Object[]{});
                            if (val != null && val instanceof String
                                    && (val.toString().contains("%") || val.toString().contains("_"))) {
                                val = val.toString().replaceAll("%", "/%").replaceAll("_", "/_");
                                setMethod.invoke(o, new Object[]{val});
                            }
                        }
                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
            } else {
                Object val = paramMab.get(key);
                if (val != null && val instanceof String
                        && (val.toString().contains("%") || val.toString().contains("_"))) {
                    val = val.toString().replaceAll("%", "/%").replaceAll("_", "/_");
                    paramMab.put(key.toString(), val);
                }
            }
        }
        return sql;
    }

    public static String showSql(Configuration configuration, BoundSql boundSql) {
        Object parameterObject = boundSql.getParameterObject();
        List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
        String sql = boundSql.getSql().replaceAll("[\\s]+", " ");
        if (parameterMappings.size() > 0 && parameterObject != null) {
            TypeHandlerRegistry typeHandlerRegistry = configuration.getTypeHandlerRegistry();
            if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
                sql = sql.replaceFirst("\\?", getParameterValue(parameterObject));

            } else {
                MetaObject metaObject = configuration.newMetaObject(parameterObject);
                for (ParameterMapping parameterMapping : parameterMappings) {
                    String propertyName = parameterMapping.getProperty();
                    if (metaObject.hasGetter(propertyName)) {
                        Object obj = metaObject.getValue(propertyName);
                        sql = sql.replaceFirst("\\?", getParameterValue(obj));
                    } else if (boundSql.hasAdditionalParameter(propertyName)) {
                        Object obj = boundSql.getAdditionalParameter(propertyName);
                        sql = sql.replaceFirst("\\?", getParameterValue(obj));
                    }
                }
            }
        }
        return sql;
    }

    private static String getParameterValue(Object obj) {
        String value = null;
        if (obj instanceof String) {
            value = "'" + obj.toString() + "'";
        } else if (obj instanceof Date) {
            DateFormat formatter = DateFormat.getDateTimeInstance(DateFormat.DEFAULT, DateFormat.DEFAULT, Locale.CHINA);
            value = "'" + formatter.format(new Date()) + "'";
        } else {
            if (obj != null) {
                value = obj.toString();
            } else {
                value = "";
            }

        }
        return value;
    }

    /**
     * 拼装查询的sql语句
     *
     * @param sql
     * @param tableName
     * @return
     * @throws Exception
     */
    private String assemblySql(String sql, String tableName) throws Exception {
        if (StringUtil.isBlank(sql)) {
            throw new Exception("sql is null");
        }
        StringBuilder resultSql = new StringBuilder();

        if (sql.startsWith("delete from")) {
            String assemblyString = sql.replaceFirst("delete from", "select %s from");
            FkTables fkTables = XmlUtils.getFkTablesFromCache();
            for (FkTable fkTable : fkTables.getFkTables()) {
                if (tableName.equals(fkTable.getRefTableName())) {
                    assemblyString = String.format(assemblyString, fkTable.getRefField());
                    StringBuilder tempSql = new StringBuilder();
                    tempSql.append("select 1 from ").append(fkTable.getTableName()).append(" where ")
                            .append(fkTable.getField()).append(" in (").append(assemblyString).append(") limit 1 ");
                    if (!"".equals(resultSql.toString())) {
                        resultSql.append(" union ").append(tempSql);
                    } else {
                        resultSql.append(tempSql);
                    }
                }
            }
        }
        return resultSql.toString();
    }

    /**
     * 查询是否有表引用关系
     *
     * @param tableName
     * @return
     * @throws Exception
     */
    private boolean checkIsRef(String tableName) throws Exception {
        boolean result = false;
        FkTables fkTables = XmlUtils.getFkTablesFromCache();
        if (fkTables == null) {
            throw new Exception("FkTables is null");
        }
        for (FkTable fkTable : fkTables.getFkTables()) {
            if (tableName.equals(fkTable.getRefTableName())) {
                result = true;
                break;
            }
        }
        return result;
    }

    /**
     * 获取数据表名
     *
     * @param sql
     * @return
     */
    private String getTableName(String sql) {
        sql = sql.substring("delete from ".length());
        int endIndex = sql.indexOf(" ");
        return sql.substring(0, endIndex);
    }
}
