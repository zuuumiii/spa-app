class Target < ApplicationRecord
  belongs_to :field

  validates :target_name, presence: true, length: {maximum: 18}
  validates :target_temp, presence: true, numericality: {less_than: 10000}
  validates :memo, length: {maximum: 100}
end
