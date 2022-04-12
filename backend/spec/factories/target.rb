FactoryBot.define do
  factory :target do
    target_name              {Faker::Books::Lovecraft.deity}
    target_temp              {Faker::Number.between(from: 0, to: 999)}
    memo                     {Faker::Books::Lovecraft.fhtagn}
    association :field
    association :user
  end
end
