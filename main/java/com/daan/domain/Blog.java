package com.daan.domain;

import java.util.List;
/**
 * 博客表  关联  评论表
 * 
 * @author Administrator
 *
 */
public class Blog {
	private int id;
	
	private String title;

	private String content;

	private String owner;

	private List<Comment> comments;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	
	@Override  
    public String toString() {  
        return " ----------------博客-----------------\n id: " + id + "\n title: " + title + "\n content: " + content  
                + "\n owner: " + owner;  
    }  

	
}
