import firebase from 'firebase/app'
import 'firebase/database'
import config from '../../firebaseKey.json'

var Client = {
  start: function(reducer, id){
    firebase.initializeApp(config);
    var db = firebase.database();;
    reducer.ctx.gameId = id;
    console.log(reducer);

    db.ref('games/' + id ).on('value', function(snapshot) {
      console.log(snapshot.val());
      if(snapshot.val()) reducer.action(snapshot.val());
    });

    return db;
  },

}

export default Client
