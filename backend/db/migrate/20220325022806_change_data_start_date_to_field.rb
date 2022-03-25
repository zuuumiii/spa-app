class ChangeDataStartDateToField < ActiveRecord::Migration[6.1]
  def change
    change_column :fields, :start_date, :integer
  end
end
