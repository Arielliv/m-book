/**
 * Created by Ariel on 25/12/2015.
 */

app.factory('restAngularService',function($filter,Restangular){
    var Accounts = Restangular.all('api');
    var baseAccounts = Accounts.one('get');
    return{
        getC : function(){
            var Cards = [];
            if(baseAccounts.get()){
                baseAccounts.getList().then(function(b) {
                    console.log(b.plain()[0]);
                    Cards = b.plain()[0];
                    return Cards;

                });

            } else {
                return Cards = [{}];
            }
        }
    }

});
/*service for the cards, scripts and files*/
app.factory('ServiceArray',function($filter,restAngularService){

    var Cards = restAngularService.getC();
    console.log(Cards);
    var Downloads = [];
    var Scripts = [{data:"sadsadasdasdas", scriptName: "scscscscscscsc", scriptExplain: "sss", id: 1},{data:"sadsadasdasdas", scriptName: "scscscscscscsc", scriptExplain: "sss", id: 1},{data:"sadsadasdasdas", scriptName: "scscscscscscsc", scriptExplain: "sss", id: 1},{data:"sadsadasdasdas", scriptName: "scscscscscscsc", scriptExplain: "sss", id: 1},{data:"sadsadasdasdas", scriptName: "scscscscscscsc", scriptExplain: "sss", id: 1},{data:"sadsadasdasdas", scriptName: "scscscscscscsc", scriptExplain: "sss", id: 1},{data:"sadsadasdasdas", scriptName: "scscscscscscsc", scriptExplain: "sss", id: 1}];
    var types = ['winlog','log','service/process','schedule task','...'];
    var prodacts = ['oracleDB','mongoDB','windows','linux','netapp','vmware','hp','IBM-MainFrame','not exist here'];
    var systems = ['מערכת1','מערכת2','מערכת3','מערכת4','מערכת5','מערכת6','לא קיים כאן'];
    return{
        getCards : function(){
            return Cards;
        },
        addCard: function(card){
            Cards.push(card);
            return Cards;
        },
        getCard: function(monitorName){
            return $filter('filter')(Cards, { monitorName: monitorName})[0];
        },
        updateStatusCard: function(monitorName){
            if(($filter('filter')(Cards, { monitorName: monitorName})[0]).status < 3) {
                ($filter('filter')(Cards, {monitorName: monitorName})[0]).status++;
            }
            return Cards;
        },
        delCard: function(card){
            var index = Cards.indexOf(card);
            Cards.splice(index, 1);
            return Cards;
        },
        upadteCard: function(card){
            ($filter('filter')(Cards, {id: card.id})[0]).monitorName = card.monitorName;
            ($filter('filter')(Cards, {id: card.id})[0]).monitorType = card.monitorType;
            ($filter('filter')(Cards, {id: card.id})[0]).monitorLevel = card.monitorLevel;
            ($filter('filter')(Cards, {id: card.id})[0]).monitorProdact = card.monitorProdact;
            ($filter('filter')(Cards, {id: card.id})[0]).monitorSystem = card.monitorSystem;
            ($filter('filter')(Cards, {id: card.id})[0]).monitorExplain = card.monitorExplain;
            return Cards;
        },
        getDownloads: function(){
            return Downloads;
        },
        addDownload: function(Download){
            Downloads.push(Download);
            return Downloads;
        },
        getDownload: function(downloadName){
            return $filter('filter')(Downloads, { fileName: downloadName})[0];
        },
        delDownload: function(Download){
            var index = Downloads.indexOf(Download);
            Downloads.splice(index, 1);
            return Downloads;
        },
        getScripts: function(){
            return Scripts;
        },
        addScripts: function(Script){
            Scripts.push(Script);
            return Scripts;
        },
        getScript: function(scriptName){
            return $filter('filter')(Scripts, { scriptName: scriptName})[0];
        },
        delScript: function(Script){
            var index = Scripts.indexOf(Script);
            Scripts.splice(index, 1);
            return Scripts;
        },
        getTypes: function(){
            return types;
        },
        addType: function(type){
            types.push(type);
            return types;
        },
        getProdacts: function(){
            return prodacts;
        },
        addProdact: function(prodact){
            prodacts.push(prodact);
            return prodacts;
        },
        getSystems: function(){
            return systems;
        },
        addSystem : function(system){
            systems.push(system);
            return systems;
        }
    }
});