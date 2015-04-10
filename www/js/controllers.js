angular.module('starter.controllers', [])

.controller('SetupCtrl', function($scope, Settings, $localstorage) {
	$scope.settings = Settings.all();
	$scope.update = function(key,minutes) {
		$localstorage.set(key, minutes);
	}
})

.controller('RunCtrl', function($scope, Settings, $ionicNavBarDelegate, $timeout, $q) {
	console.log(Settings.all())
	$scope.workout = {};
	$scope.workout.autostart = false;
	$scope.workout.skipwarmup = false;
	$scope.settings = Settings.all();
	$scope.start = function() {
		if($scope.workout.skipwarmup) {
			console.log("nowarmup");
		}
		$scope.counter = $scope.settings.warmup * 60;
		$scope.active = true;
		countdown($scope.counter)
			.then(function() {
				console.log("then");
			});

		for (var i = 0; i < $scope.settings.iterations; i++) {
			//console.log("run");
			//console.log("rest");
		};
	}
	countdown = function(start) {
		return $q(function(resolve, reject) {
			var stopped = $timeout(function() {
				console.log($scope.counter);
				start--;
				$scope.counter = start;
				if($scope.counter > 0) {
					countdown(start);
				}
				else {
					return true;
				}
			}, 10)
				.then(function(value) {
					if(value) {
						console.log("!done");
						resolve("done");
						return true;
					}
				});

		});
	};
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
});
