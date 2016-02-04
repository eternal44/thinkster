var app = angular.module('flapperNews', []);

app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);

app.controller('MainCtrl', function($scope, posts){
    $scope.test = 'Hello world!';

    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') return;
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0
      });
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function(post){
      post.upvotes++;
    };

    console.log(posts);
    $scope.posts = posts.posts;
  }
);
