class ContactController < ApplicationController
  def index
    @title = "Contact"
    @description = "This is the Contact page"
    @phone = "+57 317 890 7654"
    @email = "contact@example.com"
    @address = "123 Main St, Anytown, USA"
    @facebook = "https://www.facebook.com/example"
    @instagram = "https://www.instagram.com/example"
    @twitter = "https://www.twitter.com/example"
    @linkedin = "https://www.linkedin.com/example"
  end
end
