/* =========================================================
 * symfony-collection.js
 * https://github.com/carlalexander/symfony-collection.js
 * =========================================================
 * Copyright 2012 Carl Alexander
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
  !function( $ ){

    "use strict";

 /* COLLECTION CLASS DEFINITION
  * =========================== */

  var Collection = function (element, options) {
    this.options = options
    this.elementId = '#' + element.id
    this.$element = $(element)
      .delegate('[data-remove="collection"]', 'click.remove.collection', $.proxy(this.remove, this))

    this.usesLi = this.$element.is('ul')

    if (this.usesLi) {
      this.count = $(this.elementId + ' > li').length
    } else {
      this.count = $(this.elementId + ' > div').length
    }

    if (typeof this.options.index === 'number' && this.options.index % 1 == 0) {
      this.options.index = 0;
    }

    if (this.options.index < this.count) {
      this.options.index = this.cout
    }
  };

  Collection.prototype = {

      constructor: Collection

    , add: function() {
        var newElement = this.options.prototype;

        if (this.options.limit && this.count >= this.options.limit) return

        newElement = newElement.replace(/__name__/g, this.options.index);

        if (this.usesLi) {
          newElement = $('<li></li>').html(newElement);
        }

        this.$element.append(newElement);

        this.options.index++
        this.count++
      }

    , remove: function(e) {
        var $target = $(e.target)

        e && e.preventDefault()

        if ($target.parents(this.elementId).length !== 0) {
          if (this.usesLi) {
            $target.closest(this.elementId + ' > li').remove();
          } else {
            $target.closest(this.elementId + ' > div').remove();
          }
        }

        this.count--
      }
  };

 /* COLLECTION PLUGIN DEFINITION
  * ============================ */

  $.fn.collection = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collection')
        , options = $.extend({}, $.fn.collection.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collection', (data = new Collection(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collection.defaults = {
      limit: null,
      index: 0
  }

  $.fn.collection.Constructor = Collection


 /* COLLECTION DATA-API
  * =================== */

  $(function () {
    $('body').on('click.collection.data-api', '[data-add="collection"]', function ( e ) {
      var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7

      e.preventDefault()

      $target.collection('add')
    });
    $('[data-prototype]').each(function() {
      $(this).collection()
    });
  })
}(window.jQuery)