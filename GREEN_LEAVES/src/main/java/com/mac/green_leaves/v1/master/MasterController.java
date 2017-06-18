/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master;

import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.List;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hjcha
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/v1/master/{controller}")
public class MasterController {

    @Autowired
    private BeanFactory beanFactory;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List list(
            @PathVariable("controller") String controller) {
        return list(controller, null, null);
    }
    
    @RequestMapping(value = "/list/{pageNumber}", method = RequestMethod.GET)
    public List list(
            @PathVariable("controller") String controller,
            @PathVariable("pageNumber") Integer pageNumber) {
        return list(controller, null, pageNumber);
    }

    @RequestMapping(value = "/list/{keyword}/{pageNumber}", method = RequestMethod.GET)
    public List list(
            @PathVariable("controller") String controller,
            @PathVariable("keyword") String keyword,
            @PathVariable("pageNumber") Integer pageNumber) {

        MasterControllerProxy masterController = (MasterControllerProxy) beanFactory.getBean(controller);
        if (masterController != null) {
            return masterController.list(keyword, pageNumber, SecurityUtil.getCurrentUser().getBranch());
        }

        return null;
    }

    @RequestMapping(value = "/total-items")
    public int getTotalItems(@PathVariable String controller) {
        return getTotalItems(controller, null);
    }

    @RequestMapping(value = "/total-items/{keyword}")
    public int getTotalItems(@PathVariable String controller, @PathVariable String keyword) {
        MasterControllerProxy masterController = (MasterControllerProxy) beanFactory.getBean(controller);

        if (masterController != null) {
            return masterController.totalItems(keyword, SecurityUtil.getCurrentUser().getBranch());
        }

        return 0;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public int save(@PathVariable("controller") String controller, @RequestBody String model) {
        MasterControllerProxy masterController = (MasterControllerProxy) beanFactory.getBean(controller);
        if (masterController != null) {
            return masterController.save(model, SecurityUtil.getCurrentUser().getBranch());
        }

        return -1;
    }

    @RequestMapping(value = "/delete/{indexNo}", method = RequestMethod.DELETE)
    public int delete(@PathVariable String controller, @PathVariable Integer indexNo) {
        MasterControllerProxy masterController = (MasterControllerProxy) beanFactory.getBean(controller);
        if (masterController != null) {
            return masterController.delete(indexNo);
        }

        return -1;
    }

}
