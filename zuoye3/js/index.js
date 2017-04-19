/**
 * Created by zhangying on 2017/4/18.
 */
    angular.module("myapp",["ngRoute"])
            .config(function ($routeProvider){
    $routeProvider
    .otherwise("/newSong")
    .when("/newSong",{
        templateUrl:"views/newSong.html",
        controller:function($scope,json){
            $scope.data = json.data.data;
            new Swiper(".swiper-container",{
                autoplay:1000,
                autoplayDisableOnInteraction:false
            });
            new IScroll(".bigs",{
                scrollX:false,
                scrollY:true,
                mouseWheel:true,
                preventDefault:false
            })
            
        },
        resolve:{
            json:function($http){
                return $http.get('data/music_list.json')
            }
        }
    })
     .when("/rank",{
        templateUrl:"views/rank.html",
        controller:function($scope,json){
           $scope.data = json.data
            new IScroll(".bigs",{
                scrollX:false,
                scrollY:true,
                mouseWheel:true
            })
        },
        resolve:{
            json:function($http){
                return $http.get('data/data.json')
            }
        }
    })
     .when("/songList",{
        templateUrl:"views/songList.html",
        controller:function($scope,json){
           $scope.data = json.data
           new IScroll(".bigs",{
                scrollX:false,
                scrollY:true,
                mouseWheel:true
            })
        },
        resolve:{
            json:function($http){
                return $http.get('data/data2.json')
            }
        }
    })
      .when("/singer",{
        templateUrl:"views/singer.html",
        controller:function($scope){
            new IScroll(".bigs",{
                scrollX:false,
                scrollY:true,
                mouseWheel:true
            })
        }
    })
})
    .provider("favor",function(){
            this.temp = "<div class = 'mark'><div class = 'dialog'><p class = 'h2'>{{title}}</p><div class = 'sd'><span id = 'sure'>取消</span><span id = 'del'>在客户端下载</span></div></div></div>"

                    this.render = function(){
                        this.el = document.createElement("div")
                        this.el.className = "show"
                        this.el.innerHTML = this.temp
                        var body = document.body
                        body.appendChild(this.el)
                    }
                    this.ale = function(option){
                        this.temp = this.temp.replace("{{title}}",option.title)
                                this.render()
                        var sure = document.getElementById("sure"),
                            del = document.getElementById("del");
                            sure.onclick = function(){
                                option.callback()
                                
                            }
                            del.onclick = function(){
                                option.callback()
                            }
                    }
                    this.$get = function(){
                        return {
                        ale:this.ale,
                        temp:this.temp,
                        render:this.render,
                        el:this.el
                            }
                    }
                })
    .run(function($rootScope,favor){
                    $rootScope.flag1 = 0
                    $rootScope.add = function(arg){
                        if($rootScope.arg!=0){
                            $rootScope.arg= 0
                        }else{
                            $rootScope.flag1 = 1
                            $rootScope.flag2 = 2
                            $rootScope.flag3 = 3
                            $rootScope.flag4 = 4
                        }
                        return $rootScope.arg 
                    }
                    $rootScope.sub = function(){
                            favor.ale({
                            title:"下载需要手机酷狗客户端支持。",
                            callback:function(){
                                var body = document.body
                                body.removeChild(favor.el)
                                
                            }
                        })
                    }
                })