window.onerror = function(msg, url, line) {
  //var idx = url.lastIndexOf("/");
  //if(idx > -1) {url = url.substring(idx+1);}
  alert("ERROR in " + url + " (line #" + line + "): " + msg);
  return false; //suppress Error Alert;
};

function req(url, done) {
  var myreq = new XMLHttpRequest;
  myreq.open('GET', url, true);
  myreq.responseType = 'text';
  myreq.send( );
  myreq.onload = function(e) {
    if (this.status == 200) {
      done(this.response);
    } else {
      alert(url + ' status ' + this.status);
      done(this.response);
    }
  }
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    initApp: function() {
      app.initAd();
      window.plugins.AdMob.createBannerView();
    },
    initAd: function() {
      window.plugins.AdMob.setOptions({
        publisherId: 'ca-app-pub-1605512859966157/4346126790',
        bannerAtTop: false,
        overlap: true,
        offsetTopBar: false,
        interstitialAdId: 'ca-app-pub-1605512859966157/9216978399',
        isTesting: false, 
        autoShow: true
      });
    },

    onDeviceReady: function() {
      app.receivedEvent('deviceready');
      try { 
        //app.initApp();
      } catch (e) {
        alert(e.message);
      }
    },

    onGo: function() {
        //var div = document.createElement('div');
        //var proj = document.getElementById('run').value;

        //var url = 'http://htmlpreview.github.io?https://raw.github.com/'+
            //proj+'/master/main.html?zz='+(new Date()).getTime();
        //req(url, function(res) {
          //var frm = document.getElementById('frm');
          //frm.src = url;
          //document.body.appendChild(div); 
          //div.innerHTML = res;
        //});
        
        var proj = document.getElementById('run').value;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://raw.githubusercontent.com/'+proj+'/master/main.js?zz='+(new Date()).getTime();
        document.getElementsByTagName('head')[0].appendChild(script);
        
    },//
    onReset: function() {
        location.reload();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

window.onGo = app.onGo;
window.onReset = app.onReset;

app.initialize();
