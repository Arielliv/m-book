/*monitorCard service for restangular functions*/
app.factory('restAngularService', function($filter, Restangular, $q) {
    var api = Restangular.all('api');
    var deferred1 = $q.defer();
    var deferred2 = $q.defer();
    var deferred3 = $q.defer();
    var deferred4 = $q.defer();
    var deferred5 = $q.defer();
    var deferred6 = $q.defer();
    var source1 = new EventSource("/clock/1");
    var source2 = new EventSource("/clock/2");
    var source3 = new EventSource("/clock/3");
    return {
        getCards: function() {
            var getCards = api.one('get');
            var Cards = [];
            if (getCards.get()) {
                getCards.getList().then(function(b) {
                    Cards = b.plain();
                    source1.addEventListener('message', function(e) {
                        var d = JSON.parse(e.data);
                        Cards.push(d);
                        console.log(Cards);
                    });
                    deferred1.resolve(Cards);
                });
            } else {
                deferred1.resolve([{}]);
            }

            return deferred1.promise;
        },
        delCard : function(id){
            var delCard = api.one('delete',id);
            delCard.remove();
        },
        addCard : function(card){
            var addCard = api.one('post');
            addCard.post("card",card);
        },
        updateCard : function(card){
            var addCard = api.one('update');
            addCard.post("card",card);
        },
        updateStatusCard : function(card){
            var incStatus = api.one('incStatus');
            incStatus.post("card",card);
        },
        updateViewCard : function(card){
            var incStatus = api.one('incView');
            incStatus.post("card",card);
        },
        getScripts: function() {
            var getScripts = api.one('getScripts');
            var Scripts = [];
            if (getScripts.get()) {
                getScripts.getList().then(function(b) {
                    Scripts = b.plain();
                    source2.addEventListener('message', function(e) {
                        var d = JSON.parse(e.data);
                        Scripts.push(d);
                        console.log(Scripts);
                    });
                    deferred2.resolve(Scripts);
                });
            } else {
                deferred2.resolve([{}]);
            }
            return deferred2.promise;
        },
        downloadScript : function(id){
            var download = api.one('downloadScript',id);
            download.get();
        },
        delScript : function(id){
            console.log(id);
            var delScript = api.one('deleteScript',id);
            delScript.remove();
        },
        addScript : function(script){
            /*var fd = new FormData();
            fd.append("data", script.data);
            fd.append("scriptName", script.scriptName);
            fd.append("scriptExplain", script.scriptExplain);*/
            var addScript = Restangular.all('uploadScript');
            addScript
                .withHttpConfig({transformRequest: angular.identity})
                .customPOST(script, undefined, undefined,
                { 'Content-Type': undefined });
            //addScript.post("script",script);
        },
        getFiles: function() {
            var getFiles = api.one('getFiles');
            var Files = [];
            if (getFiles.get()) {
                getFiles.getList().then(function(b) {
                    Files = b.plain();
                    source3.addEventListener('message', function(e) {
                        var d = JSON.parse(e.data);
                        Files.push(d);
                        console.log(Files);
                    });
                    deferred3.resolve(Files);
                });
            } else {
                deferred3.resolve([{}]);
            }

            return deferred3.promise;
        },
        downloadFile : function(id){
            var download = api.one('downloadFile');
            download.get();
        },
        delFile : function(id){
            var delFile = api.one('deleteFile',id);
            delFile.remove();
        },
        addFile : function(file){
            var addFile = Restangular.all('uploadFile');
            addFile
                .withHttpConfig({transformRequest: angular.identity})
                .customPOST(file, undefined, undefined,
                { 'Content-Type': undefined });
        },
        getTypes : function(){
            var getTypes = api.one('getTypes');
            var types = [];
            if (getTypes.get()) {
                getTypes.getList().then(function(b) {
                    types = b.plain();
                    console.log(types);
                    deferred4.resolve(types);
                });
            } else {
                deferred4.resolve([{}]);
            }
            return deferred4.promise;
        },
        addType : function(type){
            var addType = api.one('postType');
            console.log(type);
            addType.post("type",type);
        },
        getSystems : function(){
            var getSystems = api.one('getSystems');
            var systems = [];
            if (getSystems.get()) {
                getSystems.getList().then(function(b) {
                    systems = b.plain();
                    console.log(systems);

                    deferred5.resolve(systems);
                });
            } else {
                deferred5.resolve([{}]);
            }

            return deferred5.promise;
        },
        addSystem : function(system){
            var addSystem = api.one('postSystem');
            console.log(system);
            addSystem.post("system",system);
        },
        getProducts : function(){
            var getProducts = api.one('getProducts');
            var products = [];
            if (getProducts.get()) {
                getProducts.getList().then(function(b) {
                    products = b.plain();
                    console.log(products);

                    deferred6.resolve(products);
                });
            } else {
                deferred6.resolve([{}]);
            }

            return deferred6.promise;
        },
        addProduct : function(product){
            var addProduct = api.one('postProduct');
            console.log(product);
            addProduct.post("product",product);
        }
    }
});

/*service for the cards, scripts and files*/
app.factory('ServiceArray',function($filter,restAngularService){

    var Cards = restAngularService.getCards();
    var Downloads = restAngularService.getFiles();
    var Scripts = restAngularService.getScripts();
    var types = ['winlog','log','service/process','schedule task','...'];
    var products = ['oracleDB','mongoDB','windows','linux','netapp','vmware','hp','IBM-MainFrame','not exist here'];
    var systems = ['מערכת1','מערכת2','מערכת3','מערכת4','מערכת5','מערכת6','לא קיים כאן'];
    return{
        getCards: function() {
            return restAngularService.getCards();
        },
        addCard: function(card){
            restAngularService.addCard(card);
            //Cards.push(card);
            return restAngularService.getCards();
        },
        getCard: function(monitorName){
            return $filter('filter')(Cards, { monitorName: monitorName})[0];
        },
        updateViewCard: function(card){
            restAngularService.updateViewCard(card);
            return restAngularService.getCards();
        },
        updateStatusCard: function(card){
            if(card.status < 3){
                restAngularService.updateStatusCard(card);
                /*if(($filter('filter')(Cards, { monitorName: monitorName})[0]).status < 3) {
                 ($filter('filter')(Cards, {monitorName: monitorName})[0]).status++;
                 }*/
            }
            return restAngularService.getCards();
        },
        delCard: function(id){
            restAngularService.delCard(id);
            //Cards.splice(index, 1);
            return restAngularService.getCards();
        },
        upadteCard: function(card){
            var uCard = {id:card.id,monitorName:card.monitorName,monitorType:card.monitorType,monitorLevel:card.monitorLevel,monitorProdact:card.monitorProdact,monitorSystem:card.monitorSystem,monitorExplain:card.monitorExplain}
            restAngularService.updateCard(uCard);
            /*($filter('filter')(Cards, {id: card.id})[0]).monitorName = card.monitorName;
            ($filter('filter')(Cards, {id: card.id})[0]).monitorType = card.monitorType;
            ($filter('filter')(Cards, {id: card.id})[0]).monitorLevel = card.monitorLevel;
            ($filter('filter')(Cards, {id: card.id})[0]).monitorProdact = card.monitorProdact;
            ($filter('filter')(Cards, {id: card.id})[0]).monitorSystem = card.monitorSystem;
            ($filter('filter')(Cards, {id: card.id})[0]).monitorExplain = card.monitorExplain;*/
            return restAngularService.getCards();
        },
        getDownloads: function(){
            return restAngularService.getFiles();
        },
        addDownload: function(Download){
            restAngularService.addFile(Download);
            //Downloads.push(Download);
            return restAngularService.getFiles();
        },
        getDownload: function(downloadName){
            return $filter('filter')(Downloads, { fileName: downloadName})[0];
        },
        delDownload: function(Download){
            restAngularService.delFile(Download.id);
            //Downloads.splice(index, 1);
            return restAngularService.getFiles();
        },
        getScripts: function(){
            return restAngularService.getScripts();
        },
        addScripts: function(Script){
            restAngularService.addScript(Script);
            //Scripts.push(Script);
            return restAngularService.getScripts();
        },
        getScript: function(scriptName){
            return $filter('filter')(Scripts, { scriptName: scriptName})[0];
        },
        delScript: function(Script){
            restAngularService.delScript(Script.id);
            //Scripts.splice(index, 1);
            return restAngularService.getScripts();
        },
        getTypes: function(){
            return restAngularService.getTypes();
            //return types;
        },
        addType: function(type){
            return restAngularService.addType(type);
            //types.push(type);
            //return types;
        },
        getProdacts: function(){
            return restAngularService.getProducts();
            //return products;
        },
        addProdact: function(prodact){
            return restAngularService.addProduct(prodact);
            //products.push(prodact);
            //return products;
        },
        getSystems: function(){
            return restAngularService.getSystems();
            //return systems;
        },
        addSystem : function(system){
            return restAngularService.addSystem(system);
            //systems.push(system);
            //return systems;
        }
    }
});
