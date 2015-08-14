//Main controller Time tracking app
'use strict';
var mainCtrl = function($scope,localStorageService,$interval) {
    //Tasks: init
    //Queue
    var tasks = localStorageService.get('tasks');
    if(tasks) {
        $scope.tasks = tasks;
    } else {
        $scope.tasks = [];
    };
    //Inwork
    var tasksInwork = localStorageService.get('tasksInwork');
    if(tasksInwork) {
        $scope.tasksInwork = tasksInwork;
    } else {
        $scope.tasksInwork = [];
    };
    //Complete
    var tasksComplete = localStorageService.get('tasksComplete');
    if(tasksComplete) {
        $scope.tasksComplete = tasksComplete;
    } else {
        $scope.tasksComplete = [];
    };
    //Tasks: watching
    $scope.$watch('tasks', function() {
        localStorageService.set('tasks', $scope.tasks);
    }, true);
    $scope.$watch('tasksInwork', function() {
        localStorageService.set('tasksInwork', $scope.tasksInwork);
    }, true);
    $scope.$watch('tasksComplete', function() {
        localStorageService.set('tasksComplete', $scope.tasksComplete);
    }, true);
    //Tasks: create
    $scope.taskCreate = function(desc,cost){
        var id = Math.random().toString(36);
        $scope.tasks[$scope.tasks.length] = {
            id : id,
            num : $scope.tasksCounter,
            desc : desc, 
            cost : cost,
            turn : false,
            time : {
                counter : 0,
                h : 0 ,
                m : 0 ,
                s : 0
            },
            total : 0,
            status : "inqueue"
        };
        $scope.tasksCounter ++;
        $scope.desc = "";
        $scope.cost = "";
    };
    //Tasks: delete
    $scope.taskDelete = function(item){
        for(var i=0;i<$scope.tasks.length;i++){
            if($scope.tasks[i].id==item){
                $scope.tasks.splice(i,1);
            }
        }
    };
    //Tasks: inwork
    $scope.taskInwork = function(item){
        for(var i=0;i<$scope.tasks.length;i++){
            if($scope.tasks[i].id==item){
                $scope.tasksInwork[$scope.tasksInwork.length] = $scope.tasks[i];
                $scope.tasks.splice(i,1);
            }
        }
    };
    //Tasks: complete
    $scope.taskComplete = function(item){
        for(var i=0;i<$scope.tasksInwork.length;i++){
            if($scope.tasksInwork[i].id==item){
                $scope.tasksComplete[$scope.tasksComplete.length] = $scope.tasksInwork[i];
                $scope.tasksInwork.splice(i,1);
                location.reload();
            }
        }
    };
     //Timers : init
    $scope.timers=[];
    //Timer : check
    $scope.timerCheck = function(item) {
        var turn = $scope.tasksInwork[item].turn;
        if(turn){
            $scope.timerStart(item);
        }
    };
    //Timer : start
    $scope.timerStart= function(item) {
        $scope.tasksInwork[item].turn = true;
        $scope.timers[item] = $interval(function(){
            $scope.tasksInwork[item].time.counter = $scope.tasksInwork[item].time.counter + 1;
            var t = $scope.tasksInwork[item].time.counter;
            $scope.tasksInwork[item].time.h = (t/3600)-((t/3600)%1);
            var h = $scope.tasksInwork[item].time.h;
            $scope.tasksInwork[item].time.m = ((t-(h*3600))/60)-(((t-(h*3600))/60)%1);
            var m = $scope.tasksInwork[item].time.m;
            $scope.tasksInwork[item].time.s = t-(h*3600)-(m*60);
            var c = $scope.tasksInwork[item].cost;
            $scope.tasksInwork[item].total = (t/3600)*c;
        }, 1000);
    };
    //Timer : stop
    $scope.timerStop = function(item) {
        $scope.tasksInwork[item].turn = false;
        $interval.cancel($scope.timers[item]);
    };
    //Timer : reset
    $scope.timerReset = function (item) {
        $scope.tasksInwork[item].turn = false;
        $interval.cancel($scope.timers[item]);
        $scope.tasksInwork[item].time.counter = 0;
        $scope.tasksInwork[item].time.h = 0;
        $scope.tasksInwork[item].time.m = 0;
        $scope.tasksInwork[item].time.s = 0;
        $scope.tasksInwork[item].total = 0;
    };
}
module.exports = mainCtrl;