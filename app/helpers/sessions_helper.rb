module SessionsHelper
	def verify_admin
		unless current_user.try(:admin?)
			redirect_to  user_session_path
		end
	end
end
