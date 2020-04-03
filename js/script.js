// In a real case scenario, this data would 
    // be served together with the builded app by some backend service
    // or loaded async on the frontend side
const data = request_data;
const players = data['players'];
console.log(players[0]['player']['id'])

function buildCardHTML() {

    var target = document.getElementById('card_content_container');
    target.innerHTML = `
    <div>
    <div>
        <img src="../p${players[0]['player']['id']}.png"/>
    </div>

    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    
    </div>
    `;

}

buildCardHTML()