FactoryBot.define do
  factory :user do
    name                  {Faker::Books::Lovecraft.deity}
    email                 {Faker::Internet.free_email}
    password              {Faker::Internet.password(min_length: 6)}
    password_confirmation {password}
    prec_no               {48}
    block_no              {47618}
  end
end
