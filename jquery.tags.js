/*!
 * tags.js 0.6.0
 * https://github.com/softwarescales/jquery-tags
 * Copyright 2013 SoftwareScales GmbH and other contributors; Licensed MIT
 */

(function($) {

    var methods = {
        tags: function(tags) {
            return this.each(function() {
                // TODO
            });
        }
    };

    $.fn.tags = function(options) {

        options = options || {};
        var classes = options.classes || {};
        delete options.classes;

        // default options
        var settings = $.extend({
            tags: [],
            maxCount: 5,
            maxLength: 25,
            classes: {
                list: '',
                item: '',
                text: '',
                input: '',
                image: 'glyphicon glyphicon-tag',
                remove: 'glyphicon glyphicon-remove'
            },
            placeholder: 'tag',
            tagAdded: function() {},
            tagRemoved: function() {},
            validate: validate
        }, options);

        // overwrite only the provided classes
        for (var i in classes) {
            if (typeof settings.classes[i] === 'string' && typeof classes[i] === 'string') {
                settings.classes[i] = classes[i];
            }
        }

        function validate($input) {
            return $input.val().trim().substr(0, settings.maxLength);
        }

        function buildTagHtml(value) {
            // undefined, null, empty strings are filtered out
            if (!value) {
                return;
            }
            var val, txt;
            // if not string, consider object and try to find the value property
            if (typeof value !== 'string') {
                val = value.value;
                txt = value.text || val;
            } else {
                val = txt = value;
            }
            return '' +
                '<li tabindex="0" class="tag tag-item ' + settings.classes.item + '" data-value="' + val + '">' +
                    '<i class="tag-image ' + settings.classes.image + '"></i>' +
                    '<i class="tag-remove ' + settings.classes.remove + '"></i>' +
                    '<p class="tag-text ' + settings.classes.text + '">' + txt + '</p>' +
                '</li>';
        }

        return this.each(function() {
            var $container, $tagList, $tagInput;

            $container = $(this);

            // see if there are some inline initial tags and add them to the settings tags
            $container.find('.tag').each(function() {
                var $tag = $(this);
                settings.tags.push({
                    value: $tag.attr('data-value'),
                    text: $tag.attr('data-text') || $tag.attr('data-value')
                });
                $tag.remove();
            });
            // duplicate elimination
            var initialTags = [];
            var duplicatesObj = {};
            for (var i in settings) {
                duplicatesObj[settings[i]] = true;
            }

            // now we can start builging the UI
            $tagList = $('<ul class="tag-list ' + settings.classes.list + '"></ul>');

            // and for each given tag we add one to the list
            var i;
            for (i = 0; i < settings.tags.length; ++i) {
                if (i < settings.maxCount) {
                    $tagList.append($(buildTagHtml(settings.tags[i])));
                }
            }

            // the tag input
            $tagList.append(
                '<li class="tag-item ' + settings.classes.item + '">' +
                    '<input class="tag-input ' + settings.classes.input + '" type="text" placeholder="' + settings.placeholder + '">' +
                '</li>');

            $tagInput = $tagList.find('.tag-input');
            if (i >= settings.maxCount) {
                $tagInput.closest('.tag-item').hide();
            }

            // add the DOM
            $container.append($tagList);

            // focus on tag or tag input
            $container.on('click', '.tag-list', function(e) {
                var item = $(e.target).closest('.tag');
                // if we clicked inside a tag, focus on it
                if (item.length) {
                    item.focus();
                    e.stopPropagation();
                }
                else {
                    // otherwise focus on the input if visible
                    if ($tagInput.is(':visible')) {
                        $tagInput.focus();
                    } else {
                        $container.find('.tag:visible').last().focus();
                    }
                }
            });

            function removeTag($tag) {
                // we only hide a removed tag
                $tag.hide();
                // and call the custom handler
                settings.tagRemoved($tag);
                // show the tag input (might have been hidden by the maxCount)
                if ($tagList.find('.tag:visible').length < settings.maxCount) {
                    $tagInput.closest('.tag-item').show();
                }
            }

            // delete handlers
            // click
            $container.on('click', '.tag-remove', function() {
                removeTag($(this).closest('.tag'));
                $tagInput.focus();
            })
            // backspace
            $container.on('keydown', '.tag-input', function(e) {
                // only if input empty
                if (e.keyCode === 8 && !$tagInput.val()) {
                    // move the focus on the previous visible tag
                    $tagInput.parents('.tag-item').prevAll('.tag:visible').first().focus();
                    e.stopPropagation();
                    e.preventDefault();
                }
            });
            $container.on('keydown', '.tag', function(e) {
                if (e.keyCode === 8) {
                    var $tag = $(this);
                    removeTag($tag);
                    // move the focus on the previous tag or the tag input if no more tags
                    if ($tag.prev('.tag').length) {
                        $tag.prev('.tag').focus();
                    } else {
                        $tagInput.focus();
                    }
                    e.stopPropagation();
                    e.preventDefault();
                }
            });

            // add handler
            $container.on('keydown', '.tag-input', function(e) {
                // enter (add)
                if (e.keyCode === 13) {
                    var value = settings.validate($tagInput);

                    if (value && (typeof value === 'string' || value.value)) {
                        // empty the input
                        $tagInput.val('');

                        // do not add duplicates
                        if ($container.find('[data-value="' + (value.value || value) + '"]').length) {
                            return false;
                        }

                        // build and insert the tag
                        var tag = $(buildTagHtml(value)).insertBefore($('.tag-item', $tagList).last());
                        
                        // only upto maximum number of tags
                        if ($tagList.find('.tag:visible').length >= settings.maxCount) {
                            $tagInput.closest('.tag-item').hide();
                            $tagList.find('.tag').last().focus();
                        }

                        settings.tagAdded(tag);
                    }

                    return false;
                }
            });
        });
    };
})(window.jQuery);
