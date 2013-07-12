
# events

  Higher level dom event management with direct and delegate event handling support.

  This component makes subscription management easy and unobtrusive since it does not muck with your view prototypes. Unbinding to "clean up" after your view is as simple as invoking `this.events.unbind()`, or more specific unbinds may be performed.

  It's design to work with a "host" object, typically a view, that provides callbacks, making callback management much less tedious than libraries like jQuery.

## Installation

    $ component install component/events

## Example

```js
var events = require('events');
var el = document.querySelector('.user');

var view = new UserView(el);

function UserView(el) {
  this.events = events(el, this);
  this.events.bind('click .remove', 'remove');
  this.events.bind('click .hide', 'hide');
}

UserView.prototype.remove = function(){
  // remove the user
  this.hide();
};

UserView.prototype.hide = function(){
  // hide the view
};

UserView.prototype.destroy = function(){
  // clean up anything you need to
  this.events.unbind();
};
```


## License

  MIT
