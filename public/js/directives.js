'use strict';

/* Directives */


var app = angular.module('myApp.directives', []).
        directive('appVersion', ['version', function(version) {
                return function(scope, elm, attrs) {
                    elm.text(version);
                };
            }]);

app.directive('fadeInLater', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.css('opacity',0);
            $timeout(function() {
                element.animate({'opacity': 1},3000);
            }, 1000);
        }
    };
});

app.directive('scroller', function() {
    return {
        restrict: 'A',
        scope: {scroll: '=scroll'},
        link: function(scope, element, attrs) {
            function scroll_out() {
                element.fadeOut(500);
            };
             function scroll_in() {
                element.fadeIn(500);
            };

            scope.$watch('scroll', function(newValue, oldValue) {
                if (newValue === true) {
                    scroll_out();
                }else{
                    scroll_in();
                }
            });
        }
    };

});

app.directive('contactBar', function($animate) {
    return {
        restrict: 'EAC',
        scope: {hide_bar: '=hide'},
        link: function(scope, element, attrs) {
            function show_bar() {
                //$('').animate({opacity: 1,height: '100%'},500);
                element.animate({height: '90px'}, 500);//show(500);
            }

            function hide_bar() {
                //element.hide(500);
                element.animate({height: '30px'}, 500);//show(500);
            }

            scope.$watch('hide_bar', function(newValue, oldValue) {
                if (newValue === true) {
                    hide_bar();
                } else {
                    show_bar();
                }
            });
        }
    };
});


app.directive('changeToSlide', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            $timeout(function change_class() {
                console.log('called change class');
                element.removeClass('fade-frame')
                        .addClass('view-frame');
            }, 3000);
        }
    };
});