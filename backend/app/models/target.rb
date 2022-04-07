class Target < ApplicationRecord
  belongs_to :field

  validates :target_name, presence: true
  validates :target_temp, presence: true
end
