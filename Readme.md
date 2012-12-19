
# events

  Higher level dom event management based on [EventManager](https://github.com/component/event-manager).

## Installation

    $ component install component/events

## Example

```js
var events = require('events');
var el = document.querySelector('button');

var view = new ButtonView(el);

function ButtonView(el) {
  this.events = events(el, this);
  this.events.bind('click');
  this.events.bind('dblclick');
}

ButtonView.prototype.onclick = function(e){
  console.log('click');
};

ButtonView.prototype.ondblclick = function(e){
  console.log('double click');
};
```

## API

  See [component/event-manager](https://github.com/component/event-manager).

## License

  MIT
