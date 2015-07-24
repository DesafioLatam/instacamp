set :stage, :production

server '104.236.63.176', user: 'deploy', roles: %w{web app db}
