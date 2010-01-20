/*
I'm going to create a bookmarklet that can be used to display some flash in Opera mini.
*/
javascript:
(function(){
  var objs = document.getElementsByTagName('object');
  var i;
  var flashs = [];
  for(i=0;i<objs.length;i++){
    var o = objs[i];
    if(o.getAttribute('classid')=='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'){
      var url;
      var params = o.getElementsByTagName('param');
      var j;
      for(j=0; j<params.length; j++){
        var param = params[i];
        if(param.getAttribute('name') == 'movie'){
          url = param.getAttribute('value');
        }
      };
      if(url){
        flashs.push({
          node:o,
          url:url
        });
      };
    };
  };
  if(flashs.length > 0){
    var gordon = document.createElement('script');
    gordon.type = 'text/javascript';
    gordon.src = 'http://jancona.com/gordon/gordon.js';
    gordon.onload = function (){
      for(i=0; i<flashs.length; i++){
        var flash = flashs[i];
        var id, genid=false;
        if(flash.node.id){
          id = flash.node.id;
        }else{
          id = 'v6-bookmarklets-gordon-'+i;
          genid = true;
        };
        /*
          XMLHttpRequest problem: It is neccessary to modify Gordon or solve it elsehow.
         */        
        new Gordon.Movie(flash.url, {id: id, /*width: 500, height: 400*/});
        if(genid){
          flash.node.id = null;
        };
      };
    };
    document.body.appendChild(gordon);
  }
})();