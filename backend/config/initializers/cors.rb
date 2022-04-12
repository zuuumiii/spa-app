Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    
    origins  "trag.online", "192.168.3.5", "localhost"

    resource "*",
      headers: :any,
      expose: ["access-token", "expiry", "token-type", "uid", "client"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
