// In a real case scenario, this data would 
    // be served together with the builded app by some backend service
    // or loaded async on the frontend side
const data = request_data;
const players = data['players'];
console.log(players[0]['player']['id'])

function buildCardHTML() {

    var DOM_card_container = document.getElementById('card_content_container');
        var DOM_player_image = DOM_card_container.querySelector('.player_image')
        var DOM_player_team_logo = DOM_card_container.querySelector('.player_team_logo')

    DOM_player_image.setAttribute("src", `dist/assets/assets/p${players[0]['player']['id']}.png`);
    // DOM_player_team_logo.setAttribute("src", `assets/assets/p${players[0]['player']['id']}.png`);
    
    // target.innerHTML = `
    // <div>
    //     <div class="player_image_container">
    //         <img 
    //             class="player_image" 
    //             src="assets/assets/p${players[0]['player']['id']}.png"
    //         />
    //     </div>

    //     <div class="player_details_container>
    //         <div class="player_team_logo_container">
    //         </div>
    //         <h2 class="player_name"></h2>
    //         <h3 class="player_type"></h3>
    //         <div class="player_stats_container">
    //             <div class="player_stats_row">
    //                 <p class="player_stat_name"></p>
    //                 <p class="player_stat_value"></p>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // `;

}

buildCardHTML()