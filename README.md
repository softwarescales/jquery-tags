jquery-tags
===========

A tag-like input

Demo
----

Check out the [online demo](http://softwarescales.github.io/jquery-tags/).

Usage
-----

```js
$('#container').tags({

    // initial tags in the input
    // an array of objects with name and value properties (see validate below)
    tags: tags,

    // here you can override classes of some generated DOM elements
    classes: {
        image: 'icon-bookmark',
        remove: 'icon-remove ml-xs'
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
        // maybe you want to limit the length of the text in tag, give it a display text, translate it, format it, etc.
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


TODOs
-----

- add a tag retrieval function that returns an array of objects (see the `validate` documentation above):

```js
var tags = $('#container').tags('tags');
```

- add inline tag detection to be able to populate the input automatically from the DOM inside the tag container:

```html
<div id="container">
    <i class="tag hide" data-text="tag UI text 1" data-value="tag-actual-value-1"/>
    <i class="tag hide" data-text="tag UI text 2" data-value="tag-actual-value-2"/>
    <i class="tag hide" data-text="tag UI text 3" data-value="tag-actual-value-3"/>
</div>
```

