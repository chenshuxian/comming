package com.daan.shiro;

import java.util.List;

import com.daan.domain.Blog;
import com.daan.domain.User;
import com.daan.domain.demo.Demo;

public class JsonO {

	Blog Blog;
	List<User> users;
	List<Demo> demos;
	
	
	public Blog getBlog() {
		return Blog;
	}
	public void setBlog(Blog blog) {
		Blog = blog;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public List<Demo> getDemos() {
		return demos;
	}
	public void setDemos(List<Demo> demos) {
		this.demos = demos;
	}

	

}
