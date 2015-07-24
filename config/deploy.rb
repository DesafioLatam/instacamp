# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'instacamp'
set :scm, :git
set :repo_url, 'git@github.com:DesafioLatam/instacamp.git'
set :branch, 'master'
set :deploy_via, :copy
set :user, 'deploy'

set :deploy_to, '/home/deploy/instacamp'

