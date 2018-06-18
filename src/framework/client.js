import firebase from 'firebase/app'
import 'firebase/database'
import config from '../../firebaseKey.json'

var Client = {
  start: function(flow, id){
    firebase.initializeApp(config);
    var db = firebase.database();
    var ref = db.ref('games/' + id );

    flow.setDB(ref);

    ref.on('value', function(snapshot) {
      if(snapshot.val()) flow.action(snapshot.val());
    });

    return db;
  },

}

export default Client
