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

    def update
        @game = Game.find(params["id"])
        @game.update(game_params)
        if @game.save
            render json: @game, status: :created, location: @game
        else
            render json: @game.errors, status: :unprocessable_entity
        end
    end

    private

    def game_params
        params.permit(:score, :player_id)
    end

end
