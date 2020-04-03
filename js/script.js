// In a real case scenario, this data would 
    // be served together with the builded app by some backend service
    // or loaded async on the frontend side
let get_data;
let DATA_players;
let DATA_badges_css;
let DATA_field_positions;
let DOM_ROOT;

(function initData() {
    get_data = request_data;
    DATA_players = get_data['players'];
    DATA_badges_css = team_badges;
    DATA_field_positions = field_positions;
    DOM_ROOT = document.getElementById('card_content_container');
})()


function MapData(selected_player) {
    function CREATE_DATA(data, selected_player, badges_css, field_positions) {
        this.player_first_name =  data[selected_player]['player']['name']['first'];
        this.player_last_name =   data[selected_player]['player']['name']['last'];
        this.player_full_name =   this.player_first_name + this.player_last_name;
        this.player_type =  field_positions[data[selected_player]['player']['info']['position']];
        this.playerPortrait = `dist/assets/assets/p${data[selected_player]['player']['id']}.png`;
        this.team = data[selected_player]['player']['currentTeam']['name'];
        this.badge = badges_css[this.team];
        this.badge_pos = `${this.badge['badge_x']}, ${this.badge['badge_y']}`
    }

    let DATA = new CREATE_DATA(DATA_players, selected_player, DATA_badges_css, DATA_field_positions)
    console.log(DATA)
    return DATA;
}

function buildCardHTML() {
    let selected_player = 2;
    let DATA = MapData(selected_player);
    let DOM = {
        'player_image': DOM_ROOT.querySelector('.player_image'),
        'player_team_logo': DOM_ROOT.querySelector('.player_team_logo'),
        'player_name': DOM_ROOT.querySelector('.player_name'),
        'player_type': DOM_ROOT.querySelector('.player_type')
    }




    DOM['player_image'].setAttribute('src', DATA.playerPortrait);
    DOM['player_team_logo'].setAttribute('style', DATA.badge_pos);
    DOM['player_name'].innerHTML = DATA.player_full_name;
    DOM['player_type'].innerHTML = DATA.player_type;
}





document.addEventListener('load', buildCardHTML());