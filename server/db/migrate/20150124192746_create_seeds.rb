class CreateSeeds < ActiveRecord::Migration
  def change
    create_table :seeds do |t|
      t.string :value

      t.timestamps
    end
  end
end
