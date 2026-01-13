import Mailgen from "mailgen"

const emailVerficationMailgenContent = (username, verificationUrl) => { 
    return {
        body: {
            name: username,
            intro: "Welcome to our app",
            actions: {
                instructions: "To verify your account please click the button below",
                button: {
                    color: "#55e700",
                    text: "Verify your account",
                    link: verificationUrl
                }
            }

        },
        outro: "Need help? Actually we dont provide it here. "
    }
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset your password",
            actions: {
                instructions: "To reset your account click the button below",
                button: {
                    color: "#ff0202",
                    text: "Verify your account",
                    link: passwordResetUrl
                }
            }

        },
        outro: "Need help? Actually we dont provide it here. "
    }
}

const sendEmail = (options) => {
    console.log(options.verificationUrl)
}

export { emailVerficationMailgenContent, forgotPasswordMailgenContent, sendEmail }