/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.tea_grade;

import com.mac.green_leaves.v1.master.tea_grade.model.MTeaGrade;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Kelum
 */
public interface TeaGradeRepository extends JpaRepository<MTeaGrade, Integer>{

}