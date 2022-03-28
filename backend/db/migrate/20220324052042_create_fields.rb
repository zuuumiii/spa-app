class CreateFields < ActiveRecord::Migration[6.1]
  def change
    create_table :fields do |t|
      t.string        :field_name, null: false
      t.string        :product, null: false
      t.float         :area, default: 0
      t.date          :start_date, null: false
      t.text          :info
      t.integer       :correct, null: false
      t.references    :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
