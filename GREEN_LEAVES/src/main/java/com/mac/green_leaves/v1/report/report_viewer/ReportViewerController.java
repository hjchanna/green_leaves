/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.report.report_viewer;

import com.mac.green_leaves.v1.report.report_viewer.model.ReportGroup;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Mohan
 */
@Controller
@CrossOrigin
@RequestMapping("/api/v1/report/report-viewer")
public class ReportViewerController {

    @Autowired
    private ReportViewerService reportViewerService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<ReportGroup> listReports() {
        return reportViewerService.getReportList();
    }

}
