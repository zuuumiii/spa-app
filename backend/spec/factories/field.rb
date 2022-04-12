FactoryBot.define do
  factory :field do
    field_name              {Faker::Books::Lovecraft.location}
    product                 {Faker::Books::Lovecraft.tome}
    area                    {rand(999)}
    start_date              {Time.now.to_f}
    correct                 {rand(10)}
    info                    {Faker::Books::Lovecraft.fhtagn}
    association :user
  end
end
