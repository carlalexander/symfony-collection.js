# README

## About
   
jQuery plugin to handle symfony form collections. The goal was to simplify a lot of the javascript used in the [cookbook](http://symfony.com/doc/current/cookbook/form/form_collections.html) article.

## Requirements

*  jQuery 1.7.1

## Examples

### Basic Examples

The following example replicates the behavior from the cookbook article.

	<-- Button to add tag -->
	<button id="add_tag" type="button" data-add="collection" data-target="#tags">Add tag</button>

	<-- Collection -->
	<ul id="tags" class="tags" data-prototype="{{ form_widget(form.tags.vars.prototype)|e }}">
	    ...
	</ul>

It also also automatically detects if you are using a `div` or `ul` for your container.

	<-- Button to add tag -->
	<button id="add_tag" type="button" data-add="collection" data-target="#tags">Add tag</button>

	<-- Collection -->
	<div id="tags" class="tags" data-prototype="{{ form_widget(form.tags.vars.prototype)|e }}">
	    ...
	</div>

## Data API

If you have used [bootstrap](http://twitter.github.com/bootstrap) jQuery libraries, this plugin uses similar data apis.

### Adding an item

To define a controller element, simply add `data-add="collection"` with either `data-target="#tags"` or `href="#tags" to target the container.

### Removing an item

To remove an item, your collection simply needs a controller element with `data-remove="collection"`.

	<-- Button to remove a tag -->
	<button type="button" class="close" data-remove="collection" aria-hidden="true">&times;</button>

### Collection container

A collection container is either a `div` or `ul` using the `data-prototype` from Symfony.

### Options

You can define additonal options using data attributes. Simply append the option name to `data-`, as in `data-limit=""`.

#### Limit

Used to limit the number of items that can be inside the collection. Default: 0 (unlimited)

#### Index

Used to set the intial index value. _Must be an int._ Default: 0