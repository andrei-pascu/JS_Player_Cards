"use strict";

// In a real case scenario, this data would 
// be served together with the builded app by some backend service
// or loaded async on the frontend side
var get_data;
var DATA_players;
var DATA_field_positions;
var ROOT;
var DOM_ROOT;
var DOM;

(function initData() {
    get_data = request_data;
    DATA_players = get_data['players'];
    DATA_field_positions = field_positions;
    ROOT = document.querySelector('#root');
    DOM_ROOT = ROOT.querySelector('#card_container');
    DOM = {
        'my_take_101_arrow': ROOT.querySelector('#my_take_101_arrow'),
        'my_take_101': ROOT.querySelector('#my_take_101'),
        'player_image': DOM_ROOT.querySelector('.player_image'),
        'player_team_logo_element': DOM_ROOT.querySelector('.player_team_logo_element'),
        'player_name': DOM_ROOT.querySelector('.player_name'),
        'player_type': DOM_ROOT.querySelector('.player_type'),
        'player_stats_container': DOM_ROOT.querySelector('.player_stats_container'),
        'select_player_list_container': DOM_ROOT.querySelector('#select_player_list_container'),
        'select_player_input': DOM_ROOT.querySelector('#select_player_input'),
        'select_player_selected': DOM_ROOT.querySelector('#select_player_selected')
    };
})();



function MapPlayerNames(selected_player) {
    function CREATE_DATA(data, selected_player) {
        this.player_first_name = data[selected_player]['player']['name']['first'];
        this.player_last_name = data[selected_player]['player']['name']['last'];
        this.player_full_name = this.player_first_name + ' ' + this.player_last_name;
    }
    var DATA = new CREATE_DATA(DATA_players, selected_player);
    return DATA['player_full_name'];
}



function MapData(selected_player) {
    function CREATE_DATA(data, selected_player, field_positions) {
        var _this = this;
        this.player_first_name = data[selected_player]['player']['name']['first'];
        this.player_last_name = data[selected_player]['player']['name']['last'];
        this.player_full_name = MapPlayerNames(selected_player);
        this.player_type = field_positions[data[selected_player]['player']['info']['position']];
        this.playerPortrait = "dist/assets/assets/p".concat(data[selected_player]['player']['id'], ".png");
        this.team_short = data[selected_player]['player']['currentTeam']['name'].replace(' ', '_');
        this.stats_list = {};
            this.stats_builder = data[selected_player]['stats'].forEach(function (value) {
                var stat_name = value['name'];
                var stat_value = value['value'];
                _this.stats_list[stat_name] = stat_value;
            });
        this.stats_display = {
            'appearances': this.stats_list['appearances'],
            'goals': this.stats_list['goals'],
            'goal_assist': this.stats_list['appearances'],
            'goals_per_match': (this.stats_list['goals'] / this.stats_list['appearances']).toFixed(2),
            'passes_per_min': ((this.stats_list['fwd_pass'] + this.stats_list['backward_pass']) / this.stats_list['mins_played']).toFixed(2),
        };
    }

    var DATA = new CREATE_DATA(DATA_players, selected_player, DATA_field_positions);
    return DATA;
}


function buildCardHTML(selected_player, init) {
    var DATA = MapData(selected_player);
    if (init == 'init') {
        for (let i = 0; i < DATA_players.length; i++) {
            DOM['select_player_list_container'].insertAdjacentHTML('beforeend', 
            '<div class="select_element" key='+i+'>' + MapPlayerNames(i) + '</div>'
            )
        }
    } else {
        DOM['select_player_selected'].innerHTML = DATA.player_full_name;
    }
    DOM['player_image'].setAttribute('src', DATA.playerPortrait);
    DOM['player_team_logo_element'].setAttribute('class', 'player_team_logo_element '+ DATA.team_short);
    DOM['player_name'].innerHTML = DATA.player_full_name;
    DOM['player_type'].innerHTML = DATA.player_type;
    DOM['player_stats_container'].innerHTML=
    '<div class="player_stats_row">' +
        '<p class="player_stat_name">Appearances</p>' +
        '<p class="player_stat_value">'+ DATA.stats_display['appearances'] + '</p></div>' +
    '<div class="player_stats_row">' +
        '<p class="player_stat_name">Goals</p>' +
        '<p class="player_stat_value">'+ DATA.stats_display['goals'] + '</p></div>' +
    '<div class="player_stats_row">' +
        '<p class="player_stat_name">Assists</p>' +
        '<p class="player_stat_value">'+ DATA.stats_display['goal_assist'] + '</p></div>' +
    '<div class="player_stats_row">' +
        '<p class="player_stat_name">Goals per match</p>' +
        '<p class="player_stat_value">'+ DATA.stats_display['goals_per_match'] + '</p></div>' +
    '<div class="player_stats_row">' +
        '<p class="player_stat_name">Passes per minute</p>' +
        '<p class="player_stat_value">'+ DATA.stats_display['passes_per_min'] + '</p></div>';
}


document.addEventListener('load', 
    buildCardHTML(0, 'init')
);

DOM['select_player_input'].addEventListener('click', 
    function(e) {
        if (e.target.id === 'select_player_selected') {
            DOM['select_player_input'].classList.remove('hidden_select')
        }
    }
);
DOM['select_player_list_container'].addEventListener('click', 
    function(e) {
        if (e.target.id !== 'select_player_list_container') {
            var target_index = e.target.getAttribute('key');
            buildCardHTML(target_index)
            DOM['select_player_input'].classList.add('hidden_select')
        }
    }
);





var toggle_me_take = false;
DOM['my_take_101'].addEventListener('click', function() {
    if (!toggle_me_take) {
        toggle_me_take = true;
        ROOT.classList.add('my_take_101')
    } else {
        toggle_me_take = false;
        ROOT.classList.remove('my_take_101')
    }
})