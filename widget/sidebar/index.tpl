<a id="btn-navbar" class="btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
</a>
{% widget "nav" %}
{% require "widget/sidebar/sidebar.css" %}
{% require "widget/sidebar/sidebar.js" %}
{% script %}
  require('widget/sidebar/sidebar.js');
{% endscript %}
