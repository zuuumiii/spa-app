FactoryBot.define do
  factory :field do
    field_name              {Faker::Name.initials(number: 4)}
    product                 {Faker::Name.initials(number: 4)}
    area                    {Faker::Number.between(from: 5, to: 100)}
    start_date              {Time.now.to_f}
    correct                 {rand(10)}
    info                    {Faker::Books::Lovecraft.fhtagn}
    association :user
  end
end
