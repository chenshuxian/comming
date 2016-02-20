package com.daan.dao;

import java.util.Map;

import com.daan.domain.Blog;
import com.daan.domain.Comment;

public interface CommonDao {
	 
    public Comment selectComment(int id);  
    
    public Blog selectBlog(int id);
    
    public Integer getMaxDisplayOrder(Map<String, String> map);
     
}