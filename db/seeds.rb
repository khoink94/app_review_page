# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

50.times do |n|
	password = "hunghung"
	User.create!(email: "hung#{n}@app.com",
				 password: password,
				 password_confirmation: password)
end

100.times do |n|
	Application.create!(name: "App#{n}",
		                description: "OK!")
end

100.times do |n|
	Category.create!(name: "Cat#{1}")
end
