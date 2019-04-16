class Player < ApplicationRecord
    has_many :games
    # serialize :leaderboard, Array

    def self.leaderboard
        players = Player.all.map do |player|
            {name: player.name, score: player.games.max{|game| game.score}.score}
        end
        players.sort {|player| player[:score]}
    end
end
