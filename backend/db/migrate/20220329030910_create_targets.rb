class CreateTargets < ActiveRecord::Migration[6.1]
  def change
    create_table :targets do |t|
      t.string         :target_name, null: false
      t.float          :target_temp, null: false
      t.text           :memo
      t.references     :field,null: false, foreign_key: true
      t.references     :user,null: false, foreign_key: true
      t.timestamps
    end
  end
end
