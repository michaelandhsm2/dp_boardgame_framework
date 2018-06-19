import firebase from 'firebase/app'
import 'firebase/database'
import config from '../../firebaseKey.json'

var Client = {
  start: function(flow, id){
    firebase.initializeApp(config);
    var ref = firebase.database().ref('games/' + id );

    ref.on('value', function(snapshot) {
      if(snapshot.val()) flow.action(snapshot.val());
    });

    return ref;
  },

}

export default Client
