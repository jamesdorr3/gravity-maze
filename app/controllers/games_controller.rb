class GamesController < ApplicationController
    def index
        @games = Game.all
        render json: @games
    end

    def show
        @game = Game.find(params["id"])
        render json: @game
    end

    def create
        @game = Game.new(game_params)
        if @game.save
          render json: @game, status: :created, location: @game
        else
          render json: @game.errors, status: :unprocessable_entity
        end
    end

    private

    def game_params
        params.require(:game).permit(:score, :player_id)
    end

end
