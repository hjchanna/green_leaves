/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.tea_issue_item;

import com.mac.green_leaves.v1.green_leaves.zmaster.tea_issue_item.model.TeaIssueItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Don
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class TeaIssueItemService {

    @Autowired
    private TeaIssueItemRepository teaGradeRepository;

    public List<TeaIssueItem> findAll() {
        return teaGradeRepository.findAll();
    }

//    public TeaIssueItem findByName(String name) {
//        List<MTeaGrade> gradeList = teaGradeRepository.findByName();
//        if (gradeList.isEmpty()) {
//            return null;
//        }
//        return gradeList.get(0);
//    }
    public TeaIssueItem saveTeaGrade(TeaIssueItem teaGrade) {
        return teaGradeRepository.save(teaGrade);
//        TeaIssueItem grade = findByName(teaGrade.getName());
//        if (grade == null) {
//        } else {
//            if (grade.getIndexNo().equals(teaGrade.getIndexNo())) {
//                return teaGrade;
//            }
//            throw new DuplicateEntityException("Tea Grade already exists");
//        }
    }

    public void deleteTeaGrade(Integer indexNo) {
        try {
            teaGradeRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this Tea-Grade because there are details in other transaction");
        }
    }

}
