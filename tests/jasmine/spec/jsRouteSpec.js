/*global describe, afterEach, beforeEach, it, expect, runs, waits, window, route*/

(function (window, route) {

    'use strict';

    describe("jsRoute", function () {

        var self = this;

        beforeEach(function () {
            route.routes = [];
            route.funcs = [];
            self.hash = false;
            window.clearInterval(route.interval);
        });

        it("should be able to add routes", function () {
            route.add('^$', function () {
                self.x = self.x + 1;
            });
            expect(route.routes.indexOf("^$") > -1).toBeTruthy();
        });

        it("should be able to init routing", function () {
            window.location.hash = "#22-10-2012";
            
            route.add('^\\d{1,2}-\\d{1,2}-\\d{4}$', function (day) {
                self.hash = day;
            });
            
            route.init();

            waits(1000);

            runs(function () {
                expect('22-10-2012').toEqual(self.hash);
            });
        });
        
        it("should be able to force a route", function () {
            route.add('^\\d{1,2}-\\d{1,2}-\\d{4}$', function (day) {
                self.hash = day;
            });

            route.call('23-10-2012');
            expect('23-10-2012').toEqual(self.hash);
        });

        it("should be able to use pure regexp as route", function () {
            route.add(/^\d{1,2}-\d{1,2}-\d{4}$/, function (day) {
                self.hash = day;
            });

            route.call('24-08-2012');
            expect('24-08-2012').toEqual(self.hash);
        });
    });
}(window, route));
