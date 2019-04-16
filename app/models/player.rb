class Player < ApplicationRecord
    has_many :games
    # serialize :leaderboard, Array

    def self.highscores
        players = Player.all.map do |player|
            best_game = player.games.max_by(&:score)
            {
                player_id: player.id,
                player_name: player.name,
                hi_score: best_game.score,
                hi_score_game_id: best_game.id
        }
        end
        players
    end
end
