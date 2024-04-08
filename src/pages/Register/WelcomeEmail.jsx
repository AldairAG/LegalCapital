import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import img1 from "../../Assets/Images/Logos/Logo_1.png"

class WelcomeEmail {
    constructor(userName, email) {
        this.email = email;
        this.userName = userName
    }

    sendEmail = (e) => {
        const templateParams = {
            user_name: this.userName,
            user_email: this.email,
            message: 'Hola, bienvenido a LegalCapital'
        };

        emailjs.send("service_29h17gr", "template_ci96cck", {
            from_name: this.email,
            to_name: this.userName,
            message: "'Hola, bienvenido a LegalCapital'",
        },{
            publicKey: 'mfhKxadOmeTx0rXBs',
          })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );

    };
};

export default WelcomeEmail;