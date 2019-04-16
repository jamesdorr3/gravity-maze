class PlayersController < ApplicationController

    def index
        players = Player.all
        render json: players
    end

    def create
      player = Player.create(player_params)
      render json: player
    end

    def leaderboard
      leaderboard = Player.leaderboard
      render json: leaderboard
    end

    private

    def player_params
      params.require(:player).permit(:name)
    end
end
