(function () {
//module
    angular.module("homeModule", []);
    //controller
    angular.module("homeModule")
            .controller("homeController", function ($scope, $timeout) {
                angular.element(document.querySelectorAll(".btn")).on('click', function (event) {
                    event.preventDefault();
                    
                    console.log("AAA");

//                    var $div = angular.element('<div/>'),
//                            btnOffset = this.getBoundingClientRect(),
//                            xPos = event.pageX - btnOffset.left,
//                            yPos = event.pageY - btnOffset.top;
//
//                    $div.addClass('ripple-effect');
//                    $div.css("height", this.offsetHeight + "px");
//                    $div.css("width", this.offsetHeight + "px");
//                    $div.css({
//                        top: yPos - (this.offsetHeight / 2) + "px",
//                        left: xPos - (this.offsetHeight / 2) + "px"
//                    });
//                    angular.element(this).append($div);
//
//                    $timeout(function () {
//                        $div.remove();
//                        console.log("removed");
//                    }, 1800);
                });
            });
}());