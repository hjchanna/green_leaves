(function () {
    angular.module("appModule")
            .factory("EmployeeTeaIssueModel", function (EmployeeTeaIssueService, EmployeeTeaIssueModelFactory, $q, $filter) {
                function EmployeeTeaIssueModel() {
                    this.constructor();
                }

                EmployeeTeaIssueModel.prototype = {
                    //data model
                    data: {},
                    //employee information
                    employees: [],
                    //routeOfficers information
                    routeOfficers: [],
                    //teagrades
                    teaGrades: [],
                    //teaIsse list
                    teaIssueList: [],
                    constructor: function () {
                        var that = this;
                        that.data = EmployeeTeaIssueModelFactory.newData();
                        console.log('constructor');
                        EmployeeTeaIssueService.loadEmployees()
                                .success(function (data) {
                                    that.employees = data;
                                });

//                        
                        EmployeeTeaIssueService.loadTeaGrade()
                                .success(function (data) {
                                    that.teaGrades = data;
                                });
                    },
//                    load: function () {
//                        var that = this;
//                        var defer = $q.defer();
//                        var date = $filter('date')(this.data.date, 'yyyy-MM-dd');
//                        var number = this.data.number;
//                        var type = "DIRECT_TEA_ISSUE";
//                        TeaIssueService.loadTeaIssue(date, number, type)
//                                .success(function (data) {
//                                    that.data = {};
//                                    angular.extend(that.data, data);
//                                    that.itemTotal();
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.itemTotal();
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
                    addDetail: function () {
                        var defer = $q.defer();
                        var that = this;
                        if (that.data.date && that.data.employee && that.data.teaGrade && parseInt(that.data.qty) > 0) {
                            that.data.type = "EMPLOYEE_TEA_ISSUE";
                            that.teaIssueList.push(that.data);
                            that.data = EmployeeTeaIssueModelFactory.newData();
                            that.itemTotal();
                            defer.resolve();
                        } else {
                            defer.reject();
                            that.itemTotal();
                        }
                        return defer.promise;
                    },
//                    deleteTeaIssue: function () {
//                        var that = this;
//                        TeaIssueService.deleteTeaIssue(this.data.indexNo)
//                                .success(function () {
//                                    that.clear();
//                                });
//                    },
                    clear: function () {
                        this.data = EmployeeTeaIssueModelFactory.newData();
                        this.teaIssueList = [];
                    },
                    save: function () {
                        var that = this;
                        
                        console.log('this.teaIssueList');
                        console.log(this.teaIssueList);
                        var defer = $q.defer();

                        EmployeeTeaIssueService.saveTeaIssue(this.teaIssueList)
                                .success(function (data) {
                                    defer.resolve();
                                    that.clear();
                                })
                                .error(function (data) {
                                    that.clear();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    itemTotal: function () {
                        var itemTotal = 0.0;
                        angular.forEach(this.teaIssueList, function (value) {
                            itemTotal += value.price * value.qty;
                        });
                        return itemTotal;
                    },
                    editDetail: function (index) {
                        var tea = this.teaIssueList[index];
                        this.teaIssueList.splice(index, 1);
                        this.data = tea;
                        this.itemTotal();
                    },
                    deleteDetail: function (index) {
                        this.teaIssueList.splice(index, 1);
                        this.itemTotal();
                    },
                    employee: function (indexNo) {
                        var employee;
                        angular.forEach(this.employees, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                employee = value;
                                return;
                            }
                        });
                        return employee;
                    },
                    
                    teaGrade: function (indexNo) {
                        var teaGrade;
                        angular.forEach(this.teaGrades, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                teaGrade = value;
                                return;
                            }
                        });
                        return teaGrade;
                    },
//                    routeOfficer: function (indexNo) {
//                        var client;
//                        angular.forEach(this.routeOfficers, function (value) {
//                            if (value.indexNo === parseInt(indexNo)) {
//                                client = value;
//                                return;
//                            }
//                        });
//                        return client;
//                    },
                    employeeLabel: function (indexNo) {
                        var label;
                        angular.forEach(this.employees, function (value) {
                            if (value.indexNo === indexNo) {
                                label = value.employeeNumber + "-" + value.name;
                                return;
                            }
                        });
                        return label;
                    },
                    teaGradeLabel: function (indexNo) {
                        var label;
                        angular.forEach(this.teaGrades, function (value) {
                            if (value.indexNo === indexNo) {
                                label = value.indexNo + "-" + value.name;
                                return;
                            }
                        });
                        return label;
                    },
//                    //return label for route officer
//                    routeOfficerLabel: function (indexNo) {
//                        var label;
//                        angular.forEach(this.routeOfficers, function (value) {
//                            if (value.indexNo === indexNo) {
//                                label = value.indexNo + "-" + value.name;
//                                return;
//                            }
//                        });
//                        return label;
//                    },
//                    //find customer by client number
                    searchEmployeeByEmployeeNo: function (employeeNo) {
                        var employee;
                        console.log("this.employees");
                        console.log(this.employees);
                        angular.forEach(this.employees, function (value) {
                            if (value.employeeNumber === parseInt(employeeNo)) {
                                employee = value;
                                return;
                            }
                        });
                        return employee;
                    },
                    requestDuplicateCheck: function (employee, teaGrade) {
                        var data;
                        angular.forEach(this.teaIssueList, function (values) {
                            if (values.client === parseInt(employee) && values.teaGrade === parseInt(teaGrade)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    }
                };
                return EmployeeTeaIssueModel;
            });
}());