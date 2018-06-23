import Board from '../framework/board';

var _Board = Board({
  onSetup: function(flow, id){
    let ctx = flow.getState().ctx;

    let para = document.createElement("p");
    document.body.appendChild(para);

    let input = document.createElement("input");
    input.type = "number";
    input.name = "Id - " + id;
    document.body.appendChild(input);

    createButton(document, "Submit Number", (e) => {
      flow.setNumber(parseInt(input.value));
      input.value = 0;
    })

    return ({
      para:{
        value: para,
      },
    });
  },
  onDraw: function(G, ctx){
    let num = G.num;
    if(num === false){
      this.para.innerHTML = "Value not yet set!";
    }else{
      this.para.innerHTML = "Current Number: " + num;
    }
  },
});


function createButton(document, text, callback){
  let _button = document.createElement("BUTTON");
  let _textNode = document.createTextNode(text);
  _button.appendChild(_textNode);
  document.body.appendChild(_button);

  _button.addEventListener('click', callback);
}

export default _Board;
