app.directive('ionImg', function() {
    return {
      scope: {
        ngsrc: '@',
        ngopt: '@',
      },
      link: function($scope, $dom) {
        var src = $scope.ngsrc;
        var ngopt = $scope.ngopt;
        var dom_image = angular.element($dom)[0];
        var img_src_default ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAIAAAADwcZiAAAAW0lEQVRYCe3SMQ7AMAzDwLb//6k/UWTnyGQJPWqQgIPfmXmO33d8cQ22ups94YQ9gb7Js+SmhNnFSxP2LLkpYXbx0oQ9S25KmF28NGHPkpsSZhcvTdiz5KabhH9OFAMPqToRyQAAAABJRU5ErkJggg==";
        dom_image.src = img_src_default;
        if (ngopt) {
          var ngopt = ngopt.split(',');
          var offset = ngopt[0];
          var scale = ngopt[1];
          dom_image.width = screen.width + parseInt(offset);
          dom_image.height = dom_image.width * scale;
        }
        var image = new Image();
        image.src = src;
        image.onload = function() {
          dom_image.src = src;
        }
      },
    };
  })

