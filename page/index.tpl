<!doctype html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>{{ title }}</title>
    <!--[if lt IE 9]>
        <script src="/lib/js/html5.js"></script>
    <![endif]-->
    {% require "lib/css/bootstrap.css" %}
    {% require "lib/css/bootstrap-responsive.css" %}
    {% require "lib/js/mod.js" %}
    {% require "lib/js/jquery-1.10.1.js" %}
</head>
<body>
    <div id="wrapper">
        <div id="sidebar">
            {% widget "sidebar" %}
        </div>
        <div id="container">
            {% widget "slogan" %}
            {% for doc in docs %}
                {% set docArg = {
                    index: loop.index,
                    doc: doc
                } %}
                {% widget "section", docArg %}
            {% endfor %}
        </div>
    </div>
    {% require "page/index.css" %}
    {% script %}
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F70b541fe48dd916f7163051b0ce5a0e3' type='text/javascript'%3E%3C/script%3E"));
    {% endscript %}
</body>
</html>