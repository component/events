
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

## API

### Events(el, obj)

  Initialize a new events manager targetting the
  given element. Methods are delegated to `obj`.

### Events#bind(event, [method])

  Bind direct event handlers or delegates with `event` and
  invoke `method` when the event occurs, passing the event object.
  When `method` is not defined the `event` name prefixed with "on" is used.

  For example the following will invoke `onmousedown`, `onmousemove`,
  and `onmouseup`:

```js
events.bind('mousedown')
events.bind('mousemove')
events.bind('mouseup')
```

  Alternatively you may specify the `method` name:

```js
events.bind('click', 'toggleDisplay')
```

  To use event delegation simply pass a selector after the
  event name as shown here:

```js
events.bind('click .remove', 'remove')
events.bind('click .close', 'hide')
```

  You may bind to the same element with several events if necessary,
  for example here perhaps `.remove()` does not manually invoke `.hide()`:

```js
events.bind('click .remove', 'remove')
events.bind('click .remove', 'hide')
events.bind('click .close', 'hide')
```

  Addition arguments are passed to the callee, which
  is helpful for slight variations of a method, for
  example sorting:

```js
events.bind('click .sort-asc', 'sort', 'asc')
events.bind('click .sort-dsc', 'sort', 'dsc')
```

### Events.unbind([event], [method])

  There are three flavours of unbinding -- you may unbind _all_
  event handlers, all specific to `event`, or all specific to
  `event` and the given `method`. For example these are all valid:

```js
events.unbind('click', 'remove')
events.unbind('click', 'hide')
events.unbind('click')
events.unbind()
```

## License

  MIT
