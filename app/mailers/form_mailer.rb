class FormMailer < ApplicationMailer

    def send_form_email(phone, email, operation_code)
        @phone = phone
        @email = email
        @operation_code = operation_code
        mail(to: ['edicionesvicioperpetuo@gmail.com', email], subject: 'Ticket de Compra | Editorial Vicio Perpetuo Vicio Perfecto')
    end
    
end
