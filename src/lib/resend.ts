import { Resend } from 'resend';

//resend setup wow it's like autoload from godot (i'm going insane) (singleton from CS230 REFERENCE?)

export const resend = new Resend(process.env.RESEND_API_KEY);

const emailFrom = process.env.EMAIL_FROM;

if (!emailFrom) {
  throw new Error('EMAIL_FROM is not set in environment variables.');
}

export const fromEmail = emailFrom;
