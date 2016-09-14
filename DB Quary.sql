SQL = 
SELECT t_green_leaves_receive_details.*  FROM t_green_leaves_receive LEFT JOIN t_green_leaves_receive_details ON t_green_leaves_receive.index_no = t_green_leaves_receive_details.green_leaves_receive where t_green_leaves_receive.index_no = 2 and date = "2016-09-13" and t_green_leaves_receive.branch = 1;

HQL =
SELECT ts  FROM t_green_leaves_receive t LEFT JOIN t_green_leaves_receive_details ts ON t.index_no = ts.green_leaves_receive where t.index_no = 2 and t.date = "2016-09-13" and t.branch = 1;

SQL =
SELECT sum(normal_leaves_quantity),sum(super_leaves_quantity) FROM t_green_leave_weigh LEFT JOIN t_green_leave_weigh_detail ON t_green_leave_weigh.index_no = t_green_leave_weigh_detail.green_leave_weigh where t_green_leave_weigh.index_no = 1 and date = "2016-09-14" and t_green_leave_weigh.branch = 1;

SELECT sum(ts.normal_leaves_quantity),sum(ts.super_leaves_quantity) FROM t_green_leave_weigh t LEFT JOIN t_green_leave_weigh_detail ts ON t.index_no = ts.green_leave_weigh where t.index_no = 1 and t.date = "2016-09-14" and t.branch = 1;




SELECT sum(normal_leaves_quantity),sum(super_leaves_quantity) FROM t_green_leave_weigh LEFT JOIN t_green_leave_weigh_detail ON t_green_leave_weigh.index_no = t_green_leave_weigh_detail.green_leave_weigh where t_green_leave_weigh.index_no = 1 and date = "2016-09-14" and t_green_leave_weigh.branch = 1;


SELECT m_employee.* from m_route  LEFT JOIN m_employee ON m_route.route_officer = m_employee.index_no;

SELECT e.* from m_route r LEFT JOIN m_employee e ON r.route_helper = e.index_no;