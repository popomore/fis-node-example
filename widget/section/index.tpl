
<section class="section">
    <div class="container-fluid">
        <div class="row-fluid title" id="section-{{ index }}">
            <h2>{{ doc.title }}</h2>
        </div>
        <div class="row-fluid content">
            <a href="{{ doc.wiki }}" target="_blank" class="btn btn-primary pull-right">
             <i class="icon-circle-arrow-right icon-white"></i>
         </a>
     </div>
 </div>
</section>
{% require "./section.css" %}