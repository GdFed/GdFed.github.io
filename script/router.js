function Router() {
    this.routes = {};
    this.currentUrl = '';
}
Router.prototype.route = function(path, callback) {
    // console.log('path:', path)
    if (path){
        if(path=='main') {
            this.routes[path] = function(){
                $('.fullPage').hide();
                $('#main').fadeIn()
                callback && callback()
            };
        }else{
            this.routes[path] = function(){
                var htmlobj =  $.ajax({url:`./path/${path}.html`,async:false});
                $('.fullPage').hide();
                $('#other').html(htmlobj.responseText).fadeIn()
                callback && callback()
            };
        }
    } else {
        this.routes['404'] = function(){
            var htmlobj =  $.ajax({url:`./path/404.html`,async:false});
            $('.fullPage').hide();
            $('#other').html(htmlobj.responseText).fadeIn()
            callback && callback()
        };
    }
};
Router.prototype.refresh = function() {
    $('body,html,.fullPage').animate({scrollTop: '0px'}, 'slow');
    this.currentUrl = location.hash.slice(1).split('/')[0] || 'main';
    // if ($('body').find('#'+this.currentUrl).length) 
    console.log('currentUrl:', this.currentUrl)
    if (typeof this.routes[this.currentUrl] != 'function') {
        this.routes['404']();
    } else {
        this.routes[this.currentUrl]();
    }
};
Router.prototype.init = function() {
    // window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
    var routers = ['main', '404', 'story', 'style', 'cooperation', 'design', 'key', 'introduct', 'type']
    routers.forEach(item=>{
        Router.route(item, function () {
            if (item.indexOf('style')!=-1){
                var style = location.hash.split('/')[1]
                $('.template').html(style)
            }
            if (item.indexOf('type')!=-1){
                var type = location.hash.split('/')[1]
                $('.template').html(decodeURIComponent(type))
            }
        });
    })
    this.refresh();
}
