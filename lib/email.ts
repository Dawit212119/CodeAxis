import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export interface EmailData {
  to: string | string[]
  subject: string
  text?: string
  html?: string
  from?: string
}

export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('Email credentials not configured, skipping email send')
      return false
    }

    const info = await transporter.sendMail({
      from: emailData.from || `"CodeAxis Platform" <${process.env.SMTP_USER}>`,
      to: Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html
    })

    console.log('Email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

// Email templates
export const emailTemplates = {
  welcome: (firstName: string) => ({
    subject: 'Welcome to CodeAxis Platform!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to CodeAxis</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to CodeAxis!</h1>
            <p>The future of freelance work starts here</p>
          </div>
          <div class="content">
            <h2>Hi ${firstName},</h2>
            <p>Welcome to CodeAxis Platform! We're excited to have you join our community of talented professionals and innovative clients.</p>
            <p>Here's what you can do next:</p>
            <ul>
              <li>Complete your profile to stand out</li>
              <li>Browse available projects</li>
              <li>Connect with other professionals</li>
              <li>Explore our learning resources</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Go to Dashboard</a>
            <p>If you have any questions, our support team is here to help.</p>
            <p>Best regards,<br>The CodeAxis Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 CodeAxis Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to CodeAxis Platform!
      
      Hi ${firstName},
      
      Welcome to CodeAxis Platform! We're excited to have you join our community of talented professionals and innovative clients.
      
      Here's what you can do next:
      - Complete your profile to stand out
      - Browse available projects  
      - Connect with other professionals
      - Explore our learning resources
      
      Visit your dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard
      
      If you have any questions, our support team is here to help.
      
      Best regards,
      The CodeAxis Team
    `
  }),

  projectNotification: (firstName: string, projectTitle: string, type: 'new_application' | 'project_update' | 'project_completed') => {
    const subjects = {
      new_application: 'New application received for your project',
      project_update: 'Your project has been updated',
      project_completed: 'Your project has been completed'
    }

    const messages = {
      new_application: `You have received a new application for your project "${projectTitle}". Review the proposal and get in touch with the freelancer.`,
      project_update: `There's an update on your project "${projectTitle}". Check your dashboard for the latest details.`,
      project_completed: `Congratulations! Your project "${projectTitle}" has been completed. Please review and provide feedback.`
    }

    return {
      subject: subjects[type],
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${subjects[type]}</title>
        </head>
        <body>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Hi ${firstName},</h2>
            <p>${messages[type]}</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">View Dashboard</a>
            <p>Best regards,<br>The CodeAxis Team</p>
          </div>
        </body>
        </html>
      `,
      text: `
        Hi ${firstName},
        
        ${messages[type]}
        
        Visit your dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard
        
        Best regards,
        The CodeAxis Team
      `
    }
  }
}

export async function sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
  const template = emailTemplates.welcome(firstName)
  return sendEmail({
    to: email,
    ...template
  })
}

export async function sendProjectNotification(
  email: string, 
  firstName: string, 
  projectTitle: string, 
  type: 'new_application' | 'project_update' | 'project_completed'
): Promise<boolean> {
  const template = emailTemplates.projectNotification(firstName, projectTitle, type)
  return sendEmail({
    to: email,
    ...template
  })
}