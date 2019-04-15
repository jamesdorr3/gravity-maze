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
james = Player.create(name: 'James D')

Game.create(score: 1, player: sharon)
Game.create(score: 1, player: james)
Game.create(score: 2, player: sharon)