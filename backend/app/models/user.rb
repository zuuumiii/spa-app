# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :fields, dependent: :destroy
  has_many :targets, dependent: :destroy, through: :field

  validates :name, presence: true, length: {maximum: 18}
  validates :prec_no, presence: true
  validates :block_no, presence: true
  validate :field_size_validate

  FIELD_MAX = 20
  def field_size_validate
    errors.add(:fields, "は1ユーザーにつき20個までの登録です") if self.fields.size > FIELD_MAX
  end
end
