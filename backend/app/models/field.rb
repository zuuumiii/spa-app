class Field < ApplicationRecord
  belongs_to :user
  has_many :targets, dependent: :destroy
end
