package com.daan.domain;

import java.util.Date;

/**
 * 评论表
 * @author Administrator
 *
 */

public class Comment {
	private int id;  
	
	private String content;  
    
    private Date commentDate = new Date();  
      
    private Blog blog;  
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCommentDate() {
		return commentDate;
	}

	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}

	public Blog getBlog() {
		return blog;
	}

	public void setBlog(Blog blog) {
		this.blog = blog;
	}

	 public String toString() {  
	        return blog + "\n ----------------评论-----------------\n id: " + id + "\n content: " + content + "\n commentDate: " + commentDate;  
	    }  
    
    
}
