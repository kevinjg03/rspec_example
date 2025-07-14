# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json, :html

  # GET /resource/sign_in
  def new
    @url = registration_path(resource_name)
    super
  end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in) if is_flashing_format?
    sign_in(resource_name, resource)
    yield resource if block_given?
    
    respond_to do |format|
      format.html { redirect_to after_sign_in_path_for(resource) }
      format.json { 
        render json: { 
          success: true, 
          message: 'Inicio de sesión exitoso',
          user: { id: resource.id, email: resource.email }
        }
      }
    end
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out && is_flashing_format?
    yield if block_given?
    
    respond_to do |format|
      format.html { redirect_to after_sign_out_path_for(resource_name) }
      format.json { 
        render json: { 
          success: true, 
          message: 'Sesión cerrada exitosamente'
        }
      }
    end
  end

  protected

  def auth_options
    { scope: resource_name, recall: "#{controller_path}#failure" }
  end

  def failure
    respond_to do |format|
      format.html { redirect_to new_session_path(resource_name) }
      format.json { 
        render json: { 
          success: false, 
          errors: ['Email o contraseña inválidos']
        }, status: :unauthorized 
      }
    end
  end

  def after_sign_in_path_for(resource)
    super(resource)
  end

  def after_sign_out_path_for(resource_or_scope)
    super(resource_or_scope)
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
