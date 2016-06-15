<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<!--内容展示区-->
<div id="site-content" class="easyui-tabs">
    <div title="首页">
    	<div class="flex-container main-content-container">
            <div class="welcome-message block-show">
                <div class="flex-container  block-show">
                    <div class="msg-container flex-container flex-vertical-center flex-col-6">
                        <%--<i class="icon icon-user-card"></i>--%>
                        <i class="icon-card"></i>
                        <div class="msg-body">
                            <h5 class="selected-items">欢迎，${userName}</h5>
                            <p>${orgName}</p>
                        </div>
                    </div>

                    <div class="msg-container flex-container flex-vertical-center">
                        <%--<i class="icon icon-clock-b"></i>--%>
                        <i class="icon-clock"></i>
                        <div class="msg-body">
                            <h5>您本次登陆时间：</h5>
                            <p>${loginTime}</p>
                        </div>
                    </div>
                </div>
                <div class="divider sm-size"></div>
                <div class="content-bottom">
                    <div class="flex-container block-show msg-container">
                        <%--<i class="icon icon-note-b"></i>--%>
                        <i class="icon-notice"></i>
                        <div class="msg-body">
                            <h5>公告信息：</h5>
                            <p> 以下是发布的主要版本及内容！ </p>
                            <p>版本：V1.2.1 日期：2015-09-11</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
