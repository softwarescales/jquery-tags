jquery-tags
===========

A jQuery plugin transforming a DOM element into a tag-like input

Demo
----

Check out the [online demo](http://softwarescales.github.io/jquery-tags/).

Dependencies
------------

* [jQuery](http://jquery.com/)
* the default icons are the [Bootstrap 3](http://getbootstrap.com/) Glyphicons, but they can be replaced, for example, like in the example below with the [Font Awesome](http://fortawesome.github.io/Font-Awesome/) icons.

Usage
-----

```js
$('#container').tags({

    // initial tags in the input; an array that contains:
    // - strings
    // - objects with "text" and "value" properties (see validate callback below)
    tags: tags,

    // here you can override classes of some generated DOM elements
    classes: {
        list: 'my-ul-style',        // default empty
        item: 'my-tag-style',       // default empty
        text: 'my-tag-text-style',  // default empty
        input: 'my-input-style',    // default empty
        image: 'icon-bookmark',     // default: glyphicon glyphicon-tag
        remove: 'icon-remove'       // default: glyphicon glyphicon-remove
    },

    // the placeholder to be shown in the text input
    placeholder: 'write a tag here',

    // you can limit the maximum number of tags
    maxCount: 3,

    // callback called after a tag was added to the UI
    tagAdded: function(tag) {
        // you can make an ajax request here and send it to the server
    },

    // callback called after a tag was removed from the UI
    tagRemoved: function(tag) {
        // you can make an ajax request here as well
        // since the tag is only hidden, you can show it back if the ajax request failed
    },

    // a function called before adding a new tag
    validate: function(input) {
        // maybe you want to limit the length of the text in tag,
        // give it a display text, translate it, format it, etc.
        return {
            text: 'text for ' + input.val(), // optional
            value: input.val()
        };
    }
});
```

Features
--------

### Hidden removed tags

When pressing the remove icon, the tags are not removed from the DOM. They are just hidden. This way you can decide to remove them later (for example after an AJAX request succeded).

### Inline initial tags

All the DOM elements with the class `tag` found in the tag container will be removed and transformed into initial tags. They will be appended to the set of tags in the `tags` option.

For example, this fragment will display three initial tags in the tag input:

```html
<div id="container">
    <i class="tag hide" data-text="Visible tag 1" data-value="internal-tag-1"/>
    <i class="tag hide" data-text="Visible tag 2" data-value="internal-tag-2"/>
    <i class="tag hide" data-text="Visible tag 3" data-value="internal-tag-3"/>
</div>
```

TODOs
-----

- add a tag retrieval function that returns an array of objects (see the `validate` documentation above):

```js
var tags = $('#container').tags('tags');
```

