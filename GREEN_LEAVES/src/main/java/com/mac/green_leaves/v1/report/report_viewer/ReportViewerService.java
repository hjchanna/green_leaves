/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.report.report_viewer;

import com.mac.green_leaves.v1.report.report_viewer.model.Report;
import com.mac.green_leaves.v1.report.report_viewer.model.ReportGroup;
import java.io.File;
import java.io.FileFilter;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Mohan
 */
@Service
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class ReportViewerService {

    private static final String REPORT_DIR = "reports";

    public List<ReportGroup> getReportList() {
        List<ReportGroup> reportGroups = new ArrayList<>();

        FileFilter reportGroupFilter = (File pathname) -> pathname.isDirectory();
        FileFilter reportFileFilter = (File pathname) -> pathname.getName().endsWith(".jrxml");

        File reportDir = new File("//" + REPORT_DIR);
        File[] reportGroupDirs = reportDir.listFiles(reportGroupFilter);
        File[] reportFiles;

        System.out.println(reportDir.getAbsoluteFile());

        if (reportGroupDirs != null) {
            for (File reportGroupDir : reportGroupDirs) {
                reportFiles = reportGroupDir.listFiles(reportFileFilter);

                ReportGroup reportGroup;
                if (reportFiles != null ? reportFiles.length > 0 : false) {
                    reportGroup = new ReportGroup();
                    reportGroup.setGroupName(reportGroupDir.getName());

                    for (File reportFile : reportFiles) {
                        Report report = new Report();
                        report.setReportName(reportFile.getName());
                        report.setFileName(reportFile.getAbsolutePath());

                        reportGroup.getReports().add(report);
                    }
                }
            }
        }

        return reportGroups;
    }

}
