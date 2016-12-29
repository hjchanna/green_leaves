/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.report.report_viewer.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Mohan
 */
public class ReportGroup {

    private String groupName;
    private List<Report> reports;

    public ReportGroup() {
        this.reports = new ArrayList<>();
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public List<Report> getReports() {
        return reports;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }

}
