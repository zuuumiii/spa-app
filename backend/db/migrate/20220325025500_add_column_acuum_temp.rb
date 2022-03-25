class AddColumnAcuumTemp < ActiveRecord::Migration[6.1]
  def up
    add_column :fields, :accum_temp, :float, null: false, default: 0
  end
end
