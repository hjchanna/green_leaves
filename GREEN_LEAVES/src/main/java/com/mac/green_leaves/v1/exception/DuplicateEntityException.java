/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.exception;

import com.mac.green_leaves.v1.exception.handler.SystemErrorResponse;
import com.mac.green_leaves.v1.exception.handler.SystemException;

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
