(function () {
    angular.module("appModule")
            .factory("GreenLeavesReceiveModel", function () {
                function GreenLeavesReceiveModel(data) {
                    if (!data) {
                        data = {
                            "indexNo": null,
                            "branch": null,
                            "route": null,
                            "number": null,
                            "date": null,
                            "transaction": null,
                            "greenLeavesReceiveDetails": []
                        };
                    }
                    this.setData(data);
                }

                GreenLeavesReceiveModel.prototype = {
                    setData: function (data) {
                        angular.extend(this, data);
                    },
                    //add receive detail
                    addReceiveDetail: function (data) {
                        this.greenLeavesReceiveDetails.push(data);
                        return true;
                    },
                    //edit receive detail
                    editRecieveDetail: function (index) {
                        var receiveDetail = this.greenLeavesReceiveDetails[index];
                        this.greenLeavesReceiveDetails.splice(index, 1);
                        return receiveDetail;
                    },
                    //delete receive detail
                    deleteReceiveDetail: function (index) {
                        this.greenLeavesReceiveDetails.splice(index, 1);
                    },
                    //super leaves and normal leaves
                    getLeavesQuantityTotal: function (greenLeavesType) {
                        if (greenLeavesType === 'superLeaves') {
                            var total = 0;
                            for (var i = 0; i < this.greenLeavesReceiveDetails.length; i++) {
                                total += parseInt(this.greenLeavesReceiveDetails[i].superLeavesQuantity);
                            }
                            return total;
                        } else {
                            var total = 0;
                            for (var i = 0; i < this.greenLeavesReceiveDetails.length; i++) {
                                total += parseInt(this.greenLeavesReceiveDetails[i].normalLeavesQuantity);
                            }
                            return total;
                        }
                    },
                    //receive detail duplicate check
                    checkGreenLeavesReseveDetailDuplicate: function (clientIndexNo) {
                        for (var i = 0; i < this.greenLeavesReceiveDetails.length; i++) {
                            if (clientIndexNo === this.greenLeavesReceiveDetails[i].client) {
                                return true;
                                break;
                            } else {
                                return false;
                                break;
                            }
                        }
                    },
                    //validate recive detail null - save fuction
                    validateGreenLeavesReseveDetail: function () {
                        if (this.greenLeavesReceiveDetails.length === 0) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                };
                return GreenLeavesReceiveModel;
            });
}());