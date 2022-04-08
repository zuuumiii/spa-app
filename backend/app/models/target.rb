class Target < ApplicationRecord
  belongs_to :field
  belongs_to :user

  validates :target_name, presence: true, length: {maximum: 18}
  validates :target_temp, presence: true, numericality: {less_than: 10000}
  validates :memo, length: {maximum: 100}
  validate :field_targets_size_validate
  
  def field_targets_size_validate
    if self.field && self.field.targets.size >= Field::TARGET_MAX
      errors.add(:targets, "は圃場につき20個までの登録です")
    end
  end
end
