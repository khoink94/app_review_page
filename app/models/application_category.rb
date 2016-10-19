class ApplicationCategory < ApplicationRecord
  belongs_to :category
  belongs_to :application
end
