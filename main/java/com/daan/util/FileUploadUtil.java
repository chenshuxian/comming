package com.daan.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FileUploadUtil {
	private static SimpleDateFormat DATE_FORMAT=new SimpleDateFormat("yyyyMMddHHmmssSS");
	public static String SERVER_PATH=PropertiesUtil.get("property/config", "public.fileserver.path");	
	public static String FILE_PATH=PropertiesUtil.get("property/config", "conventional.resource.contract.filepath");
	static{
		//创建目录
		File dir = new File(SERVER_PATH+FILE_PATH);
		if (!dir.exists()) {
			dir.mkdirs();
		}
	}
	public static String getDateFormatString(){
		return DATE_FORMAT.format(new Date());
	}
	public static Boolean upload(File upFile,String filePath){
		// 记录文件
		try {
			// 基于myFile创建一个文件输入流
			InputStream is = new FileInputStream(upFile);
			//默认文件名称为文件_日期.jpg
			File toFile = new File(filePath);
			// 创建一个输出流
			OutputStream os = new FileOutputStream(toFile);
			// 设置缓存
			byte[] buffer = new byte[1024];
			int length = 0;
			// 读取myFile文件输出到toFile文件中
			while ((length = is.read(buffer)) > 0) {
				os.write(buffer, 0, length);
			}
			// 关闭输入流
			is.close();
			// 关闭输出流
			os.close();
			return true;
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
			return false;
		} catch (IOException e2) {
			e2.printStackTrace();
			return false;
		}
	}

	public static Boolean upload(byte[] upFile,String filePath){
		try {
			// 创建一个输出流
			OutputStream os = new FileOutputStream(filePath);
			BufferedOutputStream bos=new BufferedOutputStream(os,1024);
			bos.write(upFile);
			bos.close();
			os.close();
			return true;
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
			return false;
		} catch (IOException e2) {
			e2.printStackTrace();
			return false;
		}
	}
}
