/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.tea_grade;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.master.tea_grade.model.MTeaGrade;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Kelum
 */
@Service
public class TeaGradeService {

    @Autowired
    private TeaGradeRepository teaGradeRepository;

    List<MTeaGrade> findAll() {
        return teaGradeRepository.findAll();
    }

//    public MTeaGrade findByName(String name) {
//        List<MTeaGrade> gradeList = teaGradeRepository.findByName();
//        if (gradeList.isEmpty()) {
//            return null;
//        }
//        return gradeList.get(0);
//    }

    MTeaGrade saveTeaGrade(MTeaGrade teaGrade) {
            return teaGradeRepository.save(teaGrade);
//        MTeaGrade grade = findByName(teaGrade.getName());
//        if (grade == null) {
//        } else {
//            if (grade.getIndexNo().equals(teaGrade.getIndexNo())) {
//                return teaGrade;
//            }
//            throw new DuplicateEntityException("Tea Grade already exists");
//        }
    }

    void deleteTeaGrade(Integer indexNo) {
        try {
            teaGradeRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this Tea-Grade because there are details in other transaction");
        }
    }
}
