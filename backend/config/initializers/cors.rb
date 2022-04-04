Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    
    origins "localhost:3000" ,"trag.online"

    resource "*",
      headers: :any,
      expose: ["access-token", "expiry", "token-type", "uid", "client"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
