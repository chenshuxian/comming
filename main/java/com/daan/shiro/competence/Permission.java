package com.daan.shiro.competence;
import java.util.Arrays;

import com.daan.util.StringUtil;

/**
 * 权限处理类，用于处理将不重复的权限顺序号，输出位字符串。 或将权限字符串反向来验证用户的权限
 * 一个用户所对应的权限组，如某个权限组修改过权限，这个用户的权限可以用：
 * 1，先收回此权限组之前的权限，然后再把新的权限加入。
 * 2，重新将此用户所对应的权限组的权限重新合并一次。
 * <p>
 * 采用位运算的权限。 将一个字符串按每位bit当成一个权限， 每个Bit 有权限为1，没权限为0。系统里面有1000个权限那么他就是一个125byte的字符串。授权方法如：
 * 0001 = 1 （新增） 1
 * 0010 = 3 （修改） 2
 * 0100 = 5 （删除） 4
 * 1000 = 7 （导出） 8
 * 		  
 * 如果有新增、修改、导出权限则 1+3+7 =11, 验证有没有修改权限 3 & 11 == 3 则有权限，否则无权限。
 * 删除权限位： 11 ^ 3 = 8
 * call Example :
 * 授权: Permission.Init("80").Admitted(8).GetAuthCode();
 * 取消权限: Permission.Init("80").Denied(1).GetAuthCode();
 * 合并权限: Permission.Init().Combo("FE0000").Combo("008048").GetAuthCode();
 * 验证权限: Permission.Init("80").Verify(1);
 *
 * <p>
 * Created by wayne.lyu on 15/12/2.
 */
public class Permission {
    //权限的最大值长度按bit来算的话 150 * 8 = 1200 可以保存1200个权限
    private static final int BIT_SIZE = 150;
    private final static char[] hexArray = "0123456789ABCDEF".toCharArray();
    //当前权限所有值
    private byte[] _all_auth = new byte[BIT_SIZE];

    /*
     * 2的10次方也就是右移10位，code值会很大超过320 ，以byte输出可以支持超过320位的。
     */
    private static byte[] IntToByte(int code) {
        byte[] result = new byte[BIT_SIZE];
        if (code / 8 <= result.length) {
            result[code / 8] = (byte) Math.pow(2, code % 8);
        }
        return result;
    }

    /*
     * 去掉byte数组开头位00的维数。
     */
    private static byte[] TrimBytes(byte[] bytes) {
        int i = bytes.length - 1;
        while (i >= 0 && bytes[i] == 0) {
            --i;
        }
        return Arrays.copyOf(bytes, i + 1);
    }

    /*
     * 将16进制字符串转为byte[]数组。
     */
    private static byte[] HexToBytes(String s) {
        int len = s.length();
        byte[] data = new byte[BIT_SIZE];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }

    /*
     * 将byte[]数组以16进制字符串输出。
     */
    private static String BytesToHex(byte[] bytes) {
        byte[] auth_bytes = TrimBytes(bytes);
        char[] hexChars = new char[auth_bytes.length * 2];
        int length = auth_bytes.length;
        for (int j = 0; j < length; j++) {
            int v = auth_bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }

    /*
    * 受保护构造函数，不允许外部new， 限制必须使用init 方法
     */
    protected Permission(){

    }

    /*
    * 封装权限调用以Aop的方式提供调用。更灵活方便。
     */
    public static Permission Init(){
        return new Permission();
    }

    /*
    * 初始化方法， 需要先调用次方法把已有的权限代码传递进来然后在进行授权、或验证权限。
    *  auth_code: 已有的总权限
     */
    public static Permission Init(String auth_code) throws Exception {
        Permission permit = Init();
        return permit.Own(auth_code);
    }
    /*
     * 初始化总的权限，如果当前已有权限再附加权限时，需要调用此方法先初始化总的权限。
     * auth_code: 已有的总权限
     */
    public Permission Own(String auth_code) throws Exception {
    	if(StringUtil.isEmpty(auth_code)){
    		return this;
    	}
        
        auth_code = auth_code.trim();
        if (auth_code.length() > BIT_SIZE) throw new Exception("Invalid value for auth_code, too large.");
        //将字符串权限代码转为 byte[] 数组
        _all_auth = HexToBytes(auth_code);
        return this;
    }

    /*
     * 获取当前的权限代码，权限按byte 来处理， 将byte[]数组转成字符串输出
     */
    public String GetAuthCode() {
        return BytesToHex(_all_auth);
    }

    /*
     * 授予权限, 将一个功能点的数字编码转为byte[]数组，然后合并到总的权限中。
     */
    public Permission Admitted(int function_code) throws Exception {
        if (function_code < 0 || (function_code / 8) > BIT_SIZE)
            throw new Exception("Invalid value for function_code, too large.");
        byte[] func_auth = IntToByte(function_code);
        int length = func_auth.length;
        for (int i = 0; i < length; i++) {
            _all_auth[i] = (byte) (_all_auth[i] | func_auth[i]);
        }
        if (! Verify(func_auth)) throw new Exception("Authorization failed.");
        return this;
    }

    /*
     * 取消权限, 将一个功能点的数字编码转为byte[]数组，然后用异或将其从总的权限中删除。
     */
    public Permission Denied(int function_code) throws Exception {
        if (function_code == 0 || (function_code / 8) > BIT_SIZE)
            throw new Exception("Invalid value for function_code, too large.");
        byte[] func_auth = IntToByte(function_code);
        int length = _all_auth.length;
        for (int i = 0; i < length; i++) {
            _all_auth[i]= (byte) (_all_auth[i] &  (~func_auth[i]));
        }
        if (Verify(func_auth))throw new Exception("Can't denied.");
        return this;
    }

    /*
    * 合并权限, 将量个字符串的权限合并，方法是将要合并的权限代码转成byte[]数组然后再将两个byte[]数组合并。
     */
    public Permission Combo(String auth_code) throws Exception {
        if (StringUtil.isEmpty(auth_code)) return this ;
        if (auth_code.length() > BIT_SIZE) throw new Exception("Invalid value for auth_code, too large.");
        byte[] func_auth = HexToBytes(auth_code);
        int length = func_auth.length;
        for (int i = 0; i < length; i++) {
            _all_auth[i] = (byte) (_all_auth[i] | func_auth[i]);
        }
        return this;
    }

    /*
    * 验证权限, 验证功能点的数字编码是否在总的权限内
     */
    public boolean Verify(int function_code) throws Exception {
        if (function_code < 0 || (function_code / 8) > BIT_SIZE)
            throw new Exception("Invalid value for auth_code, too large.");
        return Verify(IntToByte(function_code));
    }

    /*
    * 验证权限, 重载方法，权限比较式按byte来进行。
     */
    private boolean Verify(byte[] func_byte) {
        boolean result = false;
        for (int i = 0; i < func_byte.length; i++) {
            result = (func_byte[i] != 0 && _all_auth[i] != 0) && (byte) (func_byte[i] & _all_auth[i]) == func_byte[i];
            if (result) break;
        }
        return result;
    }
}
