var http = require('http');
var ecstatic = require('ecstatic');
var join = require('path').join;
var Browser = require('zombie');
var assert = require('assert');

describe('test scenario for events', function () {
  var server, browser;

  before(function () {
  	server = http.createServer(	
                    ecstatic({ root: join(__dirname + '/../') })
                  ).listen(8080);
  	browser = new Browser({ site: 'http://localhost:8080'});
  });	

  describe('events page', function () {
    before(function(done) {
  	  browser.visit('/examples/events.html', done);
    });

    it('should load', function () {
      assert.ok(browser.success);
      assert.equal(browser.text('#click'), 'Click me');
      assert.equal(browser.text('#unbind'), 'Unbind');      
    });

    it('trigger alert', function () {	
      browser.pressButton('#click');
      assert.ok(browser.prompted('clicked'));      
    });

    it('should not trigger alert on unbind', function () {     
      browser.pressButton('#unbind');      
      assert.ok(browser.prompted('removed'));

      browser.fire('#click', 'click', function () {
        assert.ok(browser.prompted('removed'));     // didnt prompt 'clicked'       
      });
    });
  })
})
