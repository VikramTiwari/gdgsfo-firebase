var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebaseArray, $firebaseAuth) {
  var ref = new Firebase("https://falcon-vt.firebaseio.com/messages");

  // create a synchronized array
  $scope.messages = $firebaseArray(ref);

  var auth = $firebaseAuth(ref);

  $scope.user = 'ANON';
  // login with Facebook
  auth.$authWithOAuthPopup("github").then(function(authData) {
    // console.log(authData.github.displayName);
    $scope.user = authData.github.displayName;
  }).catch(function(error) {
    console.log("Authentication failed:", error);
  });

  // add new items to the array
  // the message is automatically added to Firebase!
  $scope.addMessage = function() {
    $scope.messages.$add({
      user: $scope.user,
      text: $scope.newMessageText
    });
  };

  // click on `index.html` above to see $remove() and $save() in action
});
