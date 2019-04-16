# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Game.destroy_all
Player.destroy_all

sharon = Player.create(name: 'Sharon')
james = Player.create(name: 'James')
Game.create(player: sharon, score: 3)
Game.create(player: james, score: 2)
Game.create(player: sharon, score: 1)
Game.create(player: sharon, score: 4)
