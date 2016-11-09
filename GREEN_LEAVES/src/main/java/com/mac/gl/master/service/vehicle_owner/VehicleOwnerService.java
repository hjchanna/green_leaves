/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.vehicle_owner;

import com.mac.gl.master.model.vehicle_owner.MVehicleOwner;
import com.mac.gl.master.repository.vehicle_owner.VehicleOwnerRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supervision
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class VehicleOwnerService {
    
     @Autowired
    private VehicleOwnerRepository vehicleOwnerRepository;
     
      public List<MVehicleOwner> findAll() {
        return vehicleOwnerRepository.findAll();
    }

    private MVehicleOwner findByVehicleOwner(MVehicleOwner owner) {
        List<MVehicleOwner> vehicleOwner = vehicleOwnerRepository.findByNameAndNicNumberAndMobileNumberAndTelephoneNumberAndAddressLine1AndAddressLine2AndAddressLine3(owner.getName(),owner.getNicNumber(),owner.getMobileNumber(),owner.getTelephoneNumber(),owner.getAddressLine1(),owner.getAddressLine2(),owner.getAddressLine3());
        if (vehicleOwner.isEmpty()) {
            return null;
        }
        return vehicleOwner.get(0);
    }

    public MVehicleOwner saveVehicleOwner(MVehicleOwner vehicleOwner) {
        MVehicleOwner mVehicle = findByVehicleOwner(vehicleOwner);
        if (mVehicle == null) {
            return vehicleOwnerRepository.save(vehicleOwner);
        } else {
            if (vehicleOwner.getIndexNo().equals(vehicleOwner.getIndexNo())) {//is update get update Object?
                return mVehicle;
            }
            throw new DuplicateEntityException("Vehicle Owner already exists");
        }
    }

    public void deleteVehicleOwner(Integer indexNo) {
        vehicleOwnerRepository.delete(indexNo);
    }
}
