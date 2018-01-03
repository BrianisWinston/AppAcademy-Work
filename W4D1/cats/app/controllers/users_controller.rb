class UsersController < ApplicationController
  def index
    render plain: "What's up!"
  end

  def create
    render  json: params
  end

  def show
    render json: params
  end
end
