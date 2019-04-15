class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :score
      t.belongs_to :player, foreign_key: true

      t.timestamps
    end
  end
end
