/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.GenericTypeResolver;

/**
 *
 * @author hjcha
 */
public abstract class MasterControllerProxy<Model> {

    @Autowired
    private MasterService<Model> service;

    @Autowired
    private ObjectMapper objectMapper;

    private Class getModelClass() {
        return GenericTypeResolver.resolveTypeArgument(getClass(), MasterControllerProxy.class);
    }

    public List<Model> list(String keyword, Integer pageNumber, Integer branch) {
        return service.list(keyword, pageNumber, branch, getModelClass());
    }

    public int totalItems(String keyword, Integer branch) {
        return service.totalItems(keyword, branch, getModelClass());
    }

    public int save(String model, Integer branch) {
        try {
            Class modelClass = getModelClass();

            Model modelValue = (Model) objectMapper.readValue(model, modelClass);

            //set current branch
            Method branchSetter = null;
            try {
                branchSetter = modelClass.getMethod("setBranch", int.class);
            } catch (NoSuchMethodException | SecurityException ex) {
                Logger.getLogger(MasterControllerProxy.class.getName()).log(Level.SEVERE, null, ex);

                try {
                    branchSetter = modelClass.getMethod("setBranch", Integer.class);
                } catch (NoSuchMethodException | SecurityException ex1) {
                    Logger.getLogger(MasterControllerProxy.class.getName()).log(Level.SEVERE, null, ex1);
                }
            }

            if (branchSetter != null) {
                try {
                    branchSetter.invoke(modelValue, branch);
                } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException ex) {
                    Logger.getLogger(MasterControllerProxy.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

            //save or update
            Integer indexNo = null;

            try {
                indexNo = (Integer) modelClass.getMethod("getIndexNo").invoke(modelValue);
            } catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException ex) {
                Logger.getLogger(MasterControllerProxy.class.getName()).log(Level.SEVERE, null, ex);
            }

            if (indexNo == null) {
                return service.save(modelValue);
            } else {
                service.update(modelValue);
                return indexNo;
            }
        } catch (IOException ex) {
            Logger.getLogger(MasterControllerProxy.class.getName()).log(Level.SEVERE, null, ex);
            return -1;
        }
    }

    public int delete(Integer indexNo) {
        return service.delete(indexNo, getModelClass());
    }

}
