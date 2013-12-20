<nav id="nav" class="navigation" role="navigation">
    <ul>
        {% for doc in docs %}
        <li class="active">
            <a href="#section-{{ loop.index }}">
                <i class="icon-{{ doc.icon }} icon-white"></i> <span>{{ doc.title }}</span>
            </a>
        </li>
        {% endfor %}
    </ul>
</nav>
{% require "widget/nav/nav.css" %}
{% require "widget/nav/nav.js" %}
