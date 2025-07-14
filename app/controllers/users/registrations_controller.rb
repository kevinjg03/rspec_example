class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json, :html

  # GET /resource/sign_up
  def new
    @url = registration_path(resource_name)
    super
  end

  # POST /resource
  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        
        respond_to do |format|
          format.html { redirect_to after_sign_up_path_for(resource) }
          format.json { 
            render json: { 
              success: true, 
              message: 'Usuario registrado exitosamente',
              user: { id: resource.id, email: resource.email }
            }, status: :created 
          }
        end
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        
        respond_to do |format|
          format.html { redirect_to after_inactive_sign_up_path_for(resource) }
          format.json { 
            render json: { 
              success: false, 
              message: 'Usuario registrado pero requiere confirmación',
              errors: ['Tu cuenta ha sido creada pero necesita ser confirmada']
            }, status: :unprocessable_entity 
          }
        end
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      
      respond_to do |format|
        format.html { render :new, status: :unprocessable_entity }
        format.json { 
          render json: { 
            success: false, 
            errors: resource.errors.full_messages 
          }, status: :unprocessable_entity 
        }
      end
    end
  end

  # PUT /resource
  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?
    if resource_updated
      set_flash_message_for_update(resource, prev_unconfirmed_email)
      bypass_sign_in resource, scope: resource_name if sign_in_after_change_password?

      respond_to do |format|
        format.html { redirect_to after_update_path_for(resource) }
        format.json { 
          render json: { 
            success: true, 
            message: 'Usuario actualizado exitosamente',
            user: { id: resource.id, email: resource.email }
          }
        }
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      
      respond_to do |format|
        format.html { render :edit, status: :unprocessable_entity }
        format.json { 
          render json: { 
            success: false, 
            errors: resource.errors.full_messages 
          }, status: :unprocessable_entity 
        }
      end
    end
  end

  # DELETE /resource
  def destroy
    resource.destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    set_flash_message! :notice, :destroyed
    yield resource if block_given?
    
    respond_to do |format|
      format.html { redirect_to after_sign_out_path_for(resource_name) }
      format.json { 
        render json: { 
          success: true, 
          message: 'Usuario eliminado exitosamente'
        }
      }
    end
  end

  protected

  def after_sign_up_path_for(resource)
    super(resource)
  end

  def after_inactive_sign_up_path_for(resource)
    super(resource)
  end

  def after_update_path_for(resource)
    super(resource)
  end

  def after_sign_out_path_for(resource_or_scope)
    super(resource_or_scope)
  end
end 