/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.tea_grade;

import com.mac.green_leaves.v1.master.tea_grade.model.MTeaGrade;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/tea-grade")
public class TeaGradeController {

    @Autowired
    private TeaGradeService teaGradeService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MTeaGrade> findAll() {
        return teaGradeService.findAll();
    }

}
