// https://github.com/ghiculescu/jekyll-table-of-contents
(function(e){e.fn.toc=function(t){var n={noBackToTopLinks:!1,title:"<i>Table of Contents</i>",listType:"ol",showSpeed:"slow"},r=e.extend(n,t),i=e("h1, h2, h3, h4, h5, h6").filter(function(){return this.id}),s=e(this);if(!i.length||i.length<3||!s.length)return;var o=function(e){return parseInt(e.nodeName.replace("H",""),10)},u=i.map(function(e,t){return o(t)}).get().sort()[0],a='<i class="icon-arrow-up back-to-top"> </i>',f=o(i[0]),l,c=r.title+" <"+r.listType+">";i.on("click",function(){r.noBackToTopLinks||(window.location.hash=this.id)}).addClass("clickable-header").each(function(t,n){l=o(n);!r.noBackToTopLinks&&l===u&&e(n).addClass("top-level-header").after(a);l===f?c+="<li><a href='#"+n.id+"'>"+n.innerHTML+"</a>":l<f?c+="</li></"+r.listType+"></li><li><a href='#"+n.id+"'>"+n.innerHTML+"</a>":l>f&&(c+="<"+r.listType+"><li><a href='#"+n.id+"'>"+n.innerHTML+"</a>");f=l});c+="</"+r.listType+">";r.noBackToTopLinks||e(document).on("click",".back-to-top",function(){e(window).scrollTop(0);window.location.hash=""});0!==r.showSpeed?s.hide().html(c).show(r.showSpeed):s.html(c)}})(jQuery);