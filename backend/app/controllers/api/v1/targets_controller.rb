module Api
  module V1
    class TargetsController < ApplicationController
    
      def create 
        target = Target.new(target_params)
        if target.save
          render json: { status: "SUCCESS", data: target }
        else
          render json: { status: "ERROR", data: target.errors.full_messages }
        end
      end

      def update 
        target = Target.find(params[:id])
        if target.user_id == current_api_v1_user.id
          if target.update(target_params)
            render json: { status: "SUCCESS", data: target }
          else
            render json: { status: "ERROR", data: target.errors.full_messages }
          end
        else
          render json: { status: "ERROR", data: "不正な操作です" }
        end
      end

      def destroy
        target = Target.find(params[:id])
        if target.user_id == current_api_v1_user.id
          if target.destroy
            render json: { status: "SUCCESS"}
          else
            render json: { status: "ERROR", data: target.errors }
          end
        else
          render json: { status: "ERROR", data: "不正な操作です" }
        end
      end

      private
      def target_params
        params.permit(:target_name, :target_temp, :memo).merge(user_id: current_api_v1_user.id, field_id: params[:field_id])
      end
    end
  end
end
