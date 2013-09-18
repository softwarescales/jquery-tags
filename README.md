jquery-tags
===========

A tag-like input

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
        // tou can make an ajax request here
    },

    // callback called after a tag was added to the UI
    tagRemoved: function(tag) {
        // you can make an ajax request here as well
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
