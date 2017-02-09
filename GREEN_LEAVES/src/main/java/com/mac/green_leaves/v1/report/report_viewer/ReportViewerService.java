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
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private DataSource dataSource;

    public List<ReportGroup> getReportList() {
        List<ReportGroup> reportGroups = new ArrayList<>();

        FileFilter reportGroupFilter = (File pathname) -> pathname.isDirectory();
        FileFilter reportFileFilter = (File pathname) -> pathname.getName().endsWith(".jrxml");

        File reportDir = new File(REPORT_DIR);
        System.out.println(reportDir.getAbsoluteFile().getPath());

        File[] reportGroupDirs = reportDir.listFiles(reportGroupFilter);
        File[] reportFiles;

        if (reportGroupDirs != null) {
            for (File reportGroupDir : reportGroupDirs) {
                reportFiles = reportGroupDir.listFiles(reportFileFilter);

                ReportGroup reportGroup;
                if (reportFiles != null && reportFiles.length > 0) {
                    reportGroup = new ReportGroup();
                    reportGroup.setGroupName(reportGroupDir.getName());

                    List<Report> reports = new ArrayList<>();
                    for (File reportFile : reportFiles) {
                        Report report = new Report();
                        report.setReportName(reportFile.getName());
                        report.setFileName(reportFile.getAbsolutePath());

                        reports.add(report);
                    }
                    Collections.sort(reports);
                    reportGroup.setReports(reports);

                    reportGroups.add(reportGroup);
                }
            }
        }

        Collections.sort(reportGroups);
        return reportGroups;
    }

    public List<String> getReportParameters(Report report) throws JRException {
        List<String> reportParameters = new ArrayList<>();

        String reportFile = report.getFileName();
        String compiledFilePath = reportFile.replace(".jrxml", ".jasper");
        File compiledFile = new File(compiledFilePath);

        if (!compiledFile.exists()) {//compile report
            compileReport(reportFile, compiledFilePath);
        }

        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(compiledFile);
        JRParameter[] jrParameters = jasperReport.getParameters();

        for (JRParameter jrParameter : jrParameters) {
            if (!jrParameter.isSystemDefined()) {
                reportParameters.add(jrParameter.getName());
            }
        }

        return reportParameters;
    }

    public void writePdfReport(HttpServletResponse response, HashMap<String, Object> map) throws JRException, IOException, SQLException {
        String action = (String) map.get("action");

        String reportFile = new String(Base64.getDecoder().decode(action));

        String compiledFilePath = reportFile.replace(".jrxml", ".jasper");
        File compiledFile = new File(compiledFilePath);

        if (!compiledFile.exists()) {//compile report
            compileReport(reportFile, compiledFilePath);
        }

        Map<String, Object> params = new HashMap<>();
        params.putAll(map);

        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(compiledFile);
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, getConnection());

        String reportName = jasperReport.getName();
        
        response.setContentType("application/pdf");
        response.setHeader("Content-disposition", "attachment; filename="+reportName+".pdf");

        final OutputStream outStream = response.getOutputStream();
        JasperExportManager.exportReportToPdfStream(jasperPrint, outStream);
    }

    private void compileReport(String reportFile, String compiledFile) throws JRException {
        JasperCompileManager.compileReportToFile(reportFile, compiledFile);
    }

    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

}
