package com.mac.green_leaves.v1.system.environment;

import com.mac.green_leaves.v1.security.SystemUser;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Don
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/system/environment")
public class SYEnvironmentController {

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    @RequestMapping(value = "/system-date", method = RequestMethod.GET)
    public Date systemDate() throws ParseException {
        return DATE_FORMAT.parse(DATE_FORMAT.format(new Date()));
    }

    @RequestMapping(value = "/ping", method = RequestMethod.GET)
    public PingRespond ping() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        PingRespond pingRespond = new PingRespond();
        pingRespond.setDate(new Date());
        if (principal instanceof SystemUser) {
            SystemUser user = (SystemUser) principal;

            pingRespond.setBranch(user.getBranch());
            pingRespond.setUser(user.getNickName());
            pingRespond.setBranchName(user.getBranchName());
        }

        return pingRespond;
    }

}
