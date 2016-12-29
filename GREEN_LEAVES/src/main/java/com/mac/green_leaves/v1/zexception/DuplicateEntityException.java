/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.zexception;

import com.mac.green_leaves.v1.zexception.handler.SystemErrorResponse;
import com.mac.green_leaves.v1.zexception.handler.SystemException;

/**
 *
 * @author Don
 */
@SystemErrorResponse(4001)
public class DuplicateEntityException extends SystemException {

    public DuplicateEntityException() {
    }

    public DuplicateEntityException(String message) {
        super(message);
    }
}
