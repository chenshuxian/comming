package com.daan.logBean;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogModule {
	String entityName()	default "";
	String moduleName() default "";
	int moduleId() default 0;
}