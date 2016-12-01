class Review < ApplicationRecord
  belongs_to :user
  belongs_to :application
  has_many   :likes
end
