/*
 *  GreenLeavesWeighDetailRepository.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 20, 2016, 4:23:22 PM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.gl.transaction.green_leaves.repository.green_leaves_weigh;

import com.mac.gl.transaction.green_leaves.model.green_leaves_weigh.TGreenLeaveWeighDetail;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Mohan
 */
public interface  GreenLeavesWeighDetailRepository extends JpaRepository<TGreenLeaveWeighDetail, Integer>{
    
}
