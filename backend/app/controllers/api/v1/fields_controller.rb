module Api
  module V1
  
    class FieldsController < ApplicationController
    
      def create 
       field = Field.new(field_params)
       if field.save
        render json: { status: "SUCCESS", data: field }
       else
        render json: { status: "ERROR", data: field.errors }
       end
      end
    
    private
      def field_params
        params.permit(:field_name, :product, :info, :area, :start_date, :correct).merge(user_id: current_api_v1_user.id)
      end
    
    
    end
  end
end
