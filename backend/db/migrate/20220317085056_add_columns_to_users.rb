class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :prec_no, :integer, null: false
    add_column :users, :block_no, :integer, null: false
  end
end
