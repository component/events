var Events = require('events');
var trigger = require('trigger-event');
var assert = require('assert');

describe('test scenario for events', function () {
  var count = 0;

  before(function () {
    this.methods = {
      onclick: function(e){
        assert(false === e.ctrlKey);
        assert('LI' === e.target.nodeName);
        count = 1;
      },

      native: function(e, data){
        assert('hello' === data);
        assert(true === e.ctrlKey);
        assert('0' === e.target.textContent);        
      }
    }

    this.ul = document.createElement('ul');

    for(i = 0; i < 2; i++) {
      li = document.createElement('li');
      a = document.createElement('a');
      a.textContent = i;
      li.appendChild(a);
      li.className = 'event-list';
      li.style.display = 'none';
      this.ul.appendChild(li);  
    }

    document.querySelector('body').appendChild(this.ul);
  });

  it('should initialise with methods', function () {
    this.events = Events(this.ul, this.methods);
    assert.deepEqual(this.events.obj, this.methods);
  });

  it('should bind an event to a method', function (done) {
    this.events.bind('click .event-list:first-child > a', 'native', 'hello');
    var el = document.querySelector('.event-list > a');
    trigger(el, 'click', { ctrl : true });
    done();
  });

  it('should bind an event to prefixed method', function (done) {
    this.events.bind('click .event-list');
    var el = document.querySelectorAll('.event-list')[1];
    trigger(el, 'click');
    assert(1 === count);
    count = 0;
    done();
  });  

  it('should unbind properly', function (done) {
    this.events.unbind('click', 'onclick');
    var el = document.querySelectorAll('.event-list')[1];
    trigger(el, 'click');
    assert(0 === count);
    done();    
  });
})
