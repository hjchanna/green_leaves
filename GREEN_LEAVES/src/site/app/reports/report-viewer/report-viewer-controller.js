(function () {
    angular.module("appModule")
            .controller("ReportViewerController", function ($scope, $sce, ReportViewerService) {
                $scope.model = {};
                $scope.model.currentReport = {};

                $scope.ui = {};

                $scope.model.visibleFunction = {
                    showClient: false,
                    showOfficer: false,
                    showHelper: false,
                    showDriver: false,
                    showVehicle: false
                };

                $scope.model.reportViewer = {
                    client: null,
                    routeOfficer: null,
                    routeHelper: null,
                    driver: null,
                    vehicle: null
                };

                $scope.ui.selectReport = function (report) {
                    $scope.model.currentReport.report = report;

                    ReportViewerService.listParameters(report)
                            .success(function (data) {
                                console.log(data);
                                $scope.model.currentReport.parameters = data;
                                angular.forEach(data, function (value) {
                                    if (value === "client") {
                                        $scope.model.visibleFunction.showClient = true;
                                    } else if (value === "driver") {
                                        $scope.model.visibleFunction.showDriver = true;
                                    } else if (value === "vehicle") {
                                        $scope.model.visibleFunction.showVehicle = true;
                                    } else if (value === "route_officer") {
                                        $scope.model.visibleFunction.showOfficer = true;
                                    } else if (value === "route_helper") {
                                        $scope.model.visibleFunction.showHelper = true;
                                    }
                                });
                            });
                };

                $scope.ui.viewCurrentReport = function () {
                    var params = {
                        "report": $scope.model.currentReport.report.fileName                                          
                    };
                    
                    var map = new Map();
                    map.set("client", $scope.model.reportViewer.client);
                    map.set("routeOfficer", $scope.model.reportViewer.routeOfficer);
                    map.set("routeHelper", $scope.model.reportViewer.routeHelper);
                    map.set("driver", $scope.model.reportViewer.driver);
                    map.set("vehicle", $scope.model.reportViewer.vehicle);
//                    console.log(map.get("client")); //logs "client"
                    //TODO:parse parameters

                    //TODO: view pdf
                    ReportViewerService.getPdfBytes(map)
                            .success(function (data) {
                                var blob = new Blob([data], {type: 'application/pdf'});
                                var streamUrl = URL.createObjectURL(blob);

                                if (!PDFJS.PDFViewer || !PDFJS.getDocument) {
                                    console.log('Please build the pdfjs-dist library using\n' +
                                            '  `gulp dist`');
                                } else {
                                    console.log("ok");
                                }

                                PDFJS.workerSrc = '/js/pdf.worker.js';

                                var container = document.getElementById('viewerContainer');

// (Optionally) enable hyperlinks within PDF files.
                                var pdfLinkService = new PDFJS.PDFLinkService();

                                var pdfViewer = new PDFJS.PDFViewer({
                                    container: container,

                                    linkService: pdfLinkService,
                                    // We can enable text/annotations layers, if needed
                                    textLayerFactory: new PDFJS.DefaultTextLayerFactory(),
                                    annotationLayerFactory: new PDFJS.DefaultAnnotationLayerFactory()
                                });


                                pdfLinkService.setViewer(pdfViewer);

                                // (Optionally) enable find controller.
//                                var pdfFindController = new PDFJS.PDFFindController({
//                                    pdfViewer: pdfViewer
//                                });
//                                pdfViewer.setFindController(pdfFindController);

                                container.addEventListener('pagesinit', function () {
                                    // We can use pdfViewer now, e.g. let's change default scale.
                                    pdfViewer.currentScaleValue = 'page-width';

//                                                                        if (SEARCH_FOR) { // We can try search for things
//                                                                            pdfFindController.executeCommand('find', {query: SEARCH_FOR});
//                                                                        }
                                });

                                PDFJS.getDocument(streamUrl).then(function (pdfDocument) {
                                    // Document loaded, specifying document for the viewer and
                                    // the (optional) linkService.
                                    pdfViewer.setDocument(pdfDocument);

                                    pdfLinkService.setDocument(pdfDocument, null);
                                });




                                /*PDFJS.getDocument(data).then(function getPdfHelloWorld(pdf) {
                                 //
                                 // Fetch the first page
                                 //
                                 pdf.getPage(1).then(function getPageHelloWorld(page) {
                                 var scale = 1.5;
                                 var viewport = page.getViewport(scale);
                                 
                                 //
                                 // Prepare canvas using PDF page dimensions
                                 //
                                 var canvas = document.getElementById('the-canvas');
                                 var context = canvas.getContext('2d');
                                 canvas.height = viewport.height;
                                 canvas.width = viewport.width;
                                 
                                 //
                                 // Render PDF page into canvas context
                                 //
                                 var renderContext = {
                                 canvasContext: context,
                                 viewport: viewport
                                 };
                                 page.render(renderContext);
                                 });
                                 });*/




                            });


                };



                $scope.init = function () {
                    ReportViewerService.listReports()
                            .success(function (data) {
                                $scope.model.reports = data;
                            });
                };
                $scope.init();
            });
}());