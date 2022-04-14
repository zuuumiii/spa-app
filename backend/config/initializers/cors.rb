Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    
    origins  Rails.application.credentials.CORS[:api_domain], Rails.application.credentials.CORS[:local_domain], "localhost"

    resource "*",
      headers: :any,
      expose: ["access-token", "expiry", "token-type", "uid", "client"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
