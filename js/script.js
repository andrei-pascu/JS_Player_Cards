"use strict";

// In a real case scenario, this data would 
// be served together with the builded app by some backend service
// or loaded async on the frontend side
var get_data;
var DATA_players;
var DATA_badges_css;
var DATA_field_positions;
var DOM_ROOT;

(function initData() {
    get_data = request_data;
    DATA_players = get_data['players'];
    DATA_badges_css = team_badges;
    DATA_field_positions = field_positions;
    DOM_ROOT = document.getElementById('card_content_container');
})();

function MapData(selected_player) {
    function CREATE_DATA(data, selected_player, badges_css, field_positions) {
        var _this = this;

        this.player_first_name = data[selected_player]['player']['name']['first'];
        this.player_last_name = data[selected_player]['player']['name']['last'];
        this.player_full_name = this.player_first_name + this.player_last_name;
        this.player_type = field_positions[data[selected_player]['player']['info']['position']];
        this.playerPortrait = "dist/assets/assets/p".concat(data[selected_player]['player']['id'], ".png");
        this.team = data[selected_player]['player']['currentTeam']['name'];
        this.badge = badges_css[this.team];
        this.badge_pos = "".concat(this.badge['badge_x'], ", ").concat(this.badge['badge_y']);
        this.stats_list = {};
        this.stats_builder = data[selected_player]['stats'].forEach(function (value) {
            var stat_name = value['name'];
            var stat_value = value['value'];
            _this.stats_list[stat_name] = stat_value;
        });
        this.stats_display = {};
        this.stats_display['appearances'] = this.stats_list['appearances'];
        this.stats_display['goals'] = this.stats_list['goals'];
        this.stats_display['goal_assist'] = this.stats_list['goal_assist'];
        this.stats_display['goals_per_match'] = (this.stats_list['goals'] / this.stats_list['appearances']).toFixed(2);
        this.stats_display['passes_per_min'] = ((this.stats_list['fwd_pass'] + this.stats_list['backward_pass']) / this.stats_list['mins_played']).toFixed(2);
    }

    var DATA = new CREATE_DATA(DATA_players, selected_player, DATA_badges_css, DATA_field_positions);
    console.log(DATA);
    return DATA;
}

function buildCardHTML() {
    var selected_player = 1;
    var DATA = MapData(selected_player);
    var DOM = {
        'player_image': DOM_ROOT.querySelector('.player_image'),
        'player_team_logo': DOM_ROOT.querySelector('.player_team_logo'),
        'player_name': DOM_ROOT.querySelector('.player_name'),
        'player_type': DOM_ROOT.querySelector('.player_type'),
        'player_stats_container': DOM_ROOT.querySelector('.player_stats_container')
    };
    DOM['player_image'].setAttribute('src', DATA.playerPortrait);
    DOM['player_team_logo'].setAttribute('style', DATA.badge_pos);
    DOM['player_name'].innerHTML = DATA.player_full_name;
    DOM['player_type'].innerHTML = DATA.player_type;
    DOM['player_stats_container'].insertAdjacentHTML('beforeend',
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
        '<p class="player_stat_value">'+ DATA.stats_display['passes_per_min'] + '</p></div>');
}


document.addEventListener('load', buildCardHTML());